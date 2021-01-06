import { DateTime } from 'luxon'
import { column } from '@ioc:Adonis/Lucid/Orm'
import Base from '../Base'

export default class Service extends Base {
    public static table: string = 'delivery_services'

    @column({ isPrimary: true })
    public id: number

    @column()
    public user_id: number

    @column()
    public name: string

    @column()
    public description: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime
}
