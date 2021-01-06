import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import AddressRepository from 'App/Repository/Address'

export default class AddressesController {
    public async recomendations ({ request, response }: HttpContextContract) {
        return AddressRepository.listAll(request.get())
    }

    public async store ({ request, params }: HttpContextContract) {
        let addressSchema = schema.create({
            name: schema.string({
                trim: true,
            }),
            city_id: schema.number.optional([
                rules.exists({ table: 'address_cities', column: 'id' }),
            ]),
            province_id: schema.number.optional([
                rules.exists({ table: 'address_provinces', column: 'id' }),
            ]),
            model: schema.enum(['city', 'province', 'district']),
            postal_code: schema.array
                .optional([rules.requiredWhen('model', '=', 'district'), rules.minLength(1)])
                .members(schema.number()),
        })
        let addressData: any = await request.validate({
            schema: addressSchema,
            data: Object.assign({}, request.all(), params),
        })
        addressData.postal_code = JSON.stringify(addressData.postal_code)
        delete addressData.model

        return AddressRepository.create(params.model, addressData)
    }
}
