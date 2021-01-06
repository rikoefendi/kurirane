// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
// import Env from '@ioc:Adonis/Core/Env'
// import { Exception } from '@poppinss/utils'
// import { ValidationException } from '@adonisjs/validator/build/src/ValidationException'
// export default class Http {
//   public async handle (ctx: HttpContextContract, next: () => Promise<void>) {
//     // code for middleware goes here. ABOVE THE NEXT CALL
//     ctx.response.toJsonStruct = toJsonStruct
//     ctx.request.startTime = process.hrtime()
//     await next()
//     return toJsonStruct(ctx.response.lazyBody[0], ctx)
//   }
// }

// interface JsonStruct {
//   params?: any
//   data?: any
//   server_process_time?: number | string
//   error: boolean
//   status: number
//   code: string | undefined
//   message?: any
//   stack?: any
//   errors?: any
//   messages?: any
// }
// let messageErrorAuth = {
//   E_INVALID_AUTH_UID: 'Invalid user credentials',
//   E_UNAUTHORIZED_ACCESS: '',
//   E_INVALID_AUTH_PASSWORD: ''
// }
// export function toJsonStruct (data: any, ctx: HttpContextContract) {
//   const { request, response } = ctx
//   let jsonstruct: JsonStruct = {
//     params: getParams(ctx),
//     error: false,
//     status: data.status || 200,
//     code: data.code || 'Success',
//     server_process_time: request.startTime ? getRequestExecutionTime(ctx) : null,
//   }

//   if (data instanceof Exception) {
//     jsonstruct = getErrorResponse(data, jsonstruct)
//   } else {
//     jsonstruct = { ...jsonstruct, data }
//   }
//   response.status(jsonstruct.status)
//   response.send(jsonstruct)
//   response.finish()
// }

// function getRequestExecutionTime ({ request }: HttpContextContract): any {
//   const end = process.hrtime(request.startTime)
//   return ((end[0] * 1e9 + end[1]) / 1e6).toFixed(6)
// }

// function getParams ({ request }: HttpContextContract): any {
//   let params: any = { ...request.params(), ...request.get() }
//   return Object.keys(params).length > 0 ? params : null
// }

// function getErrorResponse (data: any, jsonstruct: JsonStruct) {
//   if (Env.get('NODE_ENV') !== 'production') {
//     jsonstruct.stack = data.stack
//   }
//   if (data instanceof ValidationException) {
//     jsonstruct = { ...jsonstruct, ...data.messages }
//   } else if (ErrorCodeAuth.includes(data.code)) {
//     jsonstruct = { ...jsonstruct, errors: [{ message: data.message }] }
//   }
//   return jsonstruct
// }
