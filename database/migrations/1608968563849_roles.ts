import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Roles extends BaseSchema {
    protected tableName = 'roles'

    // public async up () {
    //     this.schema.createTable(this.tableName, (table) => {
    //         table.increments('id')
    //         table.string('name').unique().notNullable()
    //         table.json('ability').unique().notNullable()
    //         table.string('description').notNullable()
    //         table.timestamps()
    //     })
    // }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
