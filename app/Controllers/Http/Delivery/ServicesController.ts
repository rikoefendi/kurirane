import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema } from '@ioc:Adonis/Core/Validator'
import Service from 'App/Models/Delivery/Service'
export default class ServiceController {
    public async index ({}: HttpContextContract) {
        return (await Service.query().paginate(1, 15)).toJSON()
    }

    public async show ({ params }: HttpContextContract) {
        return Service.findByOrFail('id', params.unique)
    }

    public async storeOrUpdate ({ request, params }: HttpContextContract) {
        let serviceData = await request.validate({
            schema: schema.create({
                name: schema.string(),
                description: schema.string.optional(),
                user_id: schema.number.optional(),
            }),
        })
        if (params.unique && request.method() == 'PUT') {
            return Service.storeOrUpdate(serviceData, { id: params.unique })
        } else {
            serviceData.user_id = 1
            return  Service.storeOrUpdate(serviceData)
        }
    }

    public async destroy ({ params }: HttpContextContract) {
        const service = await Service.findOrFail(params.unique)
        return service.delete()
    }
}
