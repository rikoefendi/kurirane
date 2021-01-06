import Redis from '@ioc:Adonis/Addons/Redis'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
// import Event from '@ioc:Adonis/Core/Event'
import Crypto from 'crypto'
import * as utils from '@poppinss/utils'
import User from 'App/Models/User'
export default class PasswordResetController {
  public async request ({ request, response }: HttpContextContract) {
    const userData = await request.validate({
      schema: schema.create({
        email: schema.string({}, [rules.email()]),
      }),
    })
    let user = await User.findByOrFail('email', userData.email)
    // Event.emit('password:reset:requested')
    return this.getAccessToken(user)
    ///action reset password is send email or page
  }

  public async reset ({ request, response }: HttpContextContract) {
    const { token } = await request.validate({
      schema: schema.create({
        token: schema.string(),
      }),
    })
    // Event.emit('password:reset:new')
    return this.verifyToken(token)
    //action set new password is form or api
  }

  public async verifyToken (token: any) {
    token = unescape(token).split(',')

    //verify length token
    if (token.length != 3) this.tokenNotValid()
    //expiring token
    if (Date.now() > Number(token[1]))
      throw new utils.Exception('reset password token expired', 422, 'E_TOKEN_EXPIRED')
    //get token from redis
    let validToken: any = await Redis.get(`reset_password:${token[0]}`)
    //check token exists
    if (!validToken) this.tokenNotValid()
    /// parse toke to object
    validToken = JSON.parse(validToken)
    //verify token is same stored in redis
    if (validToken.token != token[2]) this.tokenNotValid()
    return validToken
  }

  protected async getAccessToken (user: User) {
    let token = await this.generateTokenAccess()
    await Redis.set(
      `reset_password:${token.hash}`,
      JSON.stringify({
        user_id: user.id,
        token: token.token,
        name: 'Reset Password Token',
      })
    )
    return escape(`${token.hash},${token.expiresAt},${token.token}`)
  }
  protected async generateTokenAccess () {
    let token = utils.randomString(120)
    let expiresIn = 60 * 60 * 1000
    return {
      token,
      hash: Crypto.createHash('sha256')
        .update(token)
        .digest('hex'),
      expiresIn,
      expiresAt: Date.now() + expiresIn,
    }
  }

  protected tokenNotValid () {
    throw new utils.Exception('reset password token not valid', 422, 'E_TOKEN_NOT_VALID')
  }
}
