// import { ChainableContract, Where } from '@ioc:Adonis/Lucid/DatabaseQueryBuilder'
import { Dictionary } from '@ioc:Adonis/Lucid/DatabaseQueryBuilder'
import { LucidModel, ModelAttributes } from '@ioc:Adonis/Lucid/Model'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'
export default class Base extends BaseModel {
    static async storeOrUpdate<T extends LucidModel> (
        this: T,
        data: Partial<ModelAttributes<InstanceType<T>>>,
        params?: Dictionary<any, string>
    ) {
        if (!params) return this.create(data)
        let updated = await this.query()
            .where(params)
            .firstOrFail()
        updated.merge(data)
        return updated.save()
    }
}
