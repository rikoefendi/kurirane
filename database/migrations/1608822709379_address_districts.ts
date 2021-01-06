import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddressDistricts extends BaseSchema {
  protected tableName = 'address_districts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('city_id').unsigned().notNullable()
      table.string('name')
      table.json('postal_code')
      table.timestamps(true)
      table.foreign('city_id').references('address_cities.id').onDelete('cascade').onUpdate('cascade')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
