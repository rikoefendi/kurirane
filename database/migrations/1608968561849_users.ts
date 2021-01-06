import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
    protected tableName = 'users'

    public async up () {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').index()
            table.string('username').unique().notNullable()
            table.string('email').unique().notNullable()
            table.timestamp('email_verified_at').notNullable()
            table.timestamp('deleted_at').notNullable()
            table.string('passwrod').notNullable()
            table.string('remember_token').notNullable()
            table.timestamps()
        })
    }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
