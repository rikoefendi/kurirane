import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class AddressProvinces extends BaseSchema {
  protected tableName = 'address_provinces'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
