import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DeliveryPrices extends BaseSchema {
    protected tableName = 'delivery_prices'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('user_id').unsigned().notNullable().index()
            table.integer('origin_id').unsigned().notNullable().index()
            table.integer('destination_id').unsigned().notNullable().index()
            table.integer('service_id').unsigned().notNullable().index()
            table.integer('price').notNullable()
            table.string('estimation').notNullable()
            table.timestamps()
            table.foreign('origin_id').references('address_cities.id').onDelete('cascade')
            table.foreign('destination_id').references('address_districts.id').onDelete('cascade')
            table.foreign('service_id').references('delivery_services.id').onDelete('cascade')
            table.foreign('user_id').references('users.id').onDelete('cascade')
        })
    }

    public async down() {
        this.schema.dropTable(this.tableName)
    }
}
