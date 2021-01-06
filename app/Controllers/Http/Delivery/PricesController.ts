import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Price from 'App/Models/Delivery/Price'
export default class PricesController {
    public async index({ }: HttpContextContract) {
        return (await Price.query().paginate(1, 15)).toJSON()
    }

    public async show ({ params }: HttpContextContract) {
        return Price.findByOrFail('id', params.unique)
    }

    public async storeOrUpdate ({ request, params }: HttpContextContract) {
        let priceData = await request.validate({
            schema: schema.create({
                origin_id: schema.number([rules.exists({ table: 'address_cities', column: 'id' })]),
                destination_id: schema.number([
                    rules.exists({ table: 'address_districts', column: 'id' }),
                ]),
                service_id: schema.number([
                    rules.exists({ table: 'delivery_services', column: 'id' }),
                ]),
                price: schema.number(),
                estimation: schema.string(),
                user_id: schema.number.optional(),
            }),
        })
        
        if (params.unique && request.method() == 'PUT') {
            return Price.storeOrUpdate(priceData, {id: params.unique})
        } else {
            priceData.user_id = 1
            return Price.storeOrUpdate(priceData)
        }
    }

    public async destroy ({ params }: HttpContextContract) {
        const price = await Price.findOrFail(params.unique)
        return price.delete()
    }

    public async getDeliveryFee ({ request }: HttpContextContract) {
        let deliveryData = await request.validate({
            schema: schema.create({
                origin_id: schema.number([rules.exists({ table: 'address_cities', column: 'id' })]),
                destination_id: schema.number([
                    rules.exists({ table: 'address_districts', column: 'id' }),
                ]),
                weight: schema.number(),
                volume: schema.number.optional(),
                user_id: schema.number.optional(),
            }),
        })
        let responseData: any = []
        let prices = await Price.query()
            .where({
                origin_id: deliveryData.origin_id,
                destination_id: deliveryData.destination_id,
            })
            .preload('serivce')
        prices.forEach((price) => {
            let data = {
                service: price.serivce.name,
                unitPrice: price.price,
                tarif: price.price * deliveryData.weight,
                description: null,
                minPrice: price.price * deliveryData.weight,
            }
            responseData.push(data)
        })
        return responseData
    }
}
