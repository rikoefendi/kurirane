import Event from '@ioc:Adonis/Core/Event'
import User from 'App/Models/User';
import { AuthContract } from '@ioc:Adonis/Addons/Auth';
declare module '@ioc:Adonis/Core/Event' {
    interface EventsList{
        'auth:register': User,
        'auth:login': AuthContract,
    }
}

Event.on('auth:register', 'Auth.register')
Event.on('auth:login', 'Auth.login')
