import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddressCities extends BaseSchema {
  protected tableName = 'address_cities'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('province_id').unsigned().notNullable()
      table.string('name')
      table.timestamps(true)
      table.foreign('province_id').references('address_provinces.id').onDelete('cascade').onUpdate('cascade')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
