import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserServiceRoleEmbed extends BaseSchema {
    protected tableName = 'user_service_role_embed'

    // public async up () {
    //     this.schema.createTable(this.tableName, (table) => {
    //         table.increments('id')
    //         table.integer('user_id').notNullable()
    //         table.integer('embed_id').notNullable()
    //         table.integer('role_id').notNullable()
    //         table.integer('service_id').notNullable()
    //     })
    // }

    public async down () {
        this.schema.dropTable(this.tableName)
    }
}
