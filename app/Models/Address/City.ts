import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import District from './District'

export default class City extends BaseModel {
  public static table: string = 'address_cities'
  @column({ isPrimary: true })
  public id: number

  @column()
  public provinceId: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => District)
  public districts: HasMany <typeof District>
}
