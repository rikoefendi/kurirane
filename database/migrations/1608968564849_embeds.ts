import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Embeds extends BaseSchema {
    protected tableName = 'embeds'

    // public async up () {
    //     this.schema.createTable(this.tableName, (table) => {
    //         table.increments('id')
    //         table.string('name').notNullable()
    //         table.json('origins').notNullable()
    //         table.integer('count_origin').notNullable()
    //         table.timestamps()
    //     })
    // }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
