import { EventsList } from '@ioc:Adonis/Core/Event'

export default class AuthListener {
  public async register(user: EventsList['auth:register']) {
      //send email/notify user
      console.log(user)
    }
  public async login(user: EventsList['auth:login']) {
      ///save history login
        console.log(user)
      }
  }