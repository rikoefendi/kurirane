import {HttpContextContract} from '@ioc:Adonis/Core/HttpContext'
declare module '@ioc:Adonis/Core/Response' {
    interface ResponseContract {
      toJsonStruct(data: any, ctx: HttpContextContract)
    }
  }