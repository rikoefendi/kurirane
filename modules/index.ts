import * as Elastic from '@elastic/elasticsearch'
export default class Elsatic extends Elastic.Client {
    constructor (opts: Elastic.ClientOptions) {
        super(opts)
    }

    public async searchPaginate (params, { perPage = 15, page = 1 } = {}) {
        page = Number(page)
        perPage = Number(perPage)
        let from = page > 1 ? perPage * page - 1 : 0
        params.body.size = perPage
        params.body.from = from
        const response = await super.search(params)

        const total = response.body.hits.total.value
        return {
            total: total,
            perPage,
            page,
            lastPage: Math.ceil(total / perPage),
            data: response.body.hits.hits.map((hit) => hit._source),
        }
    }
}
