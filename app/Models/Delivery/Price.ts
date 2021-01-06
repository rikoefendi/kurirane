import { DateTime } from 'luxon'
import { BelongsTo, column, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import Service from './Service'
import Base from '../Base'
// description
export default class Price extends Base {
    public static table: string = 'delivery_prices'
    @column({ isPrimary: true })
    public id: number

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column()
    public userId: number

    @column()
    public originId: number //reference address_city_id

    @column()
    public destinationId: number //reference address_districtsId

    @column()
    public serviceId: number //reference delivery_service

    @column()
    public price: number //price perkg/volume

    @column()
    public estimation: string //estimation delivery from pick-up

    @belongsTo(() => Service)
    public serivce: BelongsTo<typeof Service>

    @column()
    public description: string

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
