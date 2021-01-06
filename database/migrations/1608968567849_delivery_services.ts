import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class DeliveryServices extends BaseSchema {
    protected tableName = 'delivery_services'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('user_id').index().unsigned().notNullable()
            table.string('name').notNullable()
            table.string('description').notNullable()
            table.timestamps()
            table.foreign('user_id').references('users.id').onDelete('cascade')
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
