import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Event from '@ioc:Adonis/Core/Event'
import User from 'App/Models/User'
export default class AuthController {
  public async index ({ auth }: HttpContextContract) {
    await auth.authenticate()
    return auth.user
  }
  public async signin ({ auth, request, response }: HttpContextContract) {
    let userData = await request.validate({
      schema: schema.create({
        username: schema.string(),
        password: schema.string(),
      }),
    })
    let token = await auth.attempt(userData.username, userData.password, { expiresIn: '10d' })
    return token.toJSON()
  }

  public async register ({ auth, request, response }: HttpContextContract) {
    const userData = await request.validate({
      schema: schema.create({
        username: schema.string({}, [rules.unique({ table: 'users', column: 'username' })]),
        email: schema.string({}, [
          rules.email(),
          rules.unique({ table: 'users', column: 'email' }),
        ]),
        password: schema.string({}, [
          rules.regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/),
          rules.confirmed(),
          rules.minLength(8),
        ]),
      }),
    })

    const user = await User.create(userData)
    Event.emit('auth:register', user)
    return user.toJSON()
  }

  public async logout ({ auth }: HttpContextContract) {
    await auth.authenticate()
    return auth.logout()
  }
}
