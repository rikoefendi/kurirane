import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserDetails extends BaseSchema {
    protected tableName = 'user_details'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id')
            table.integer('user_id').unique().notNullable()
            table.string('first_name').notNullable()
            table.string('last_name').notNullable()
            table.string('phone').notNullable()
            table.integer('media_id').notNullable()
            table.timestamps()
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
