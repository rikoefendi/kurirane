declare module '@ioc:Adonis/Addons/Elastic' {
    import { Client } from '@elastic/elasticsearch'
    import * as RequestParams from '@elastic/elasticsearch/api/requestParams'
    import { ApiResponse } from '@elastic/elasticsearch/lib/Transport'
    export interface Paginate {
        page?: number
        perPage?: number
    }
    interface ElasticContract extends Client {
        paginate(data?: object): object
        searchPaginate(params: RequestParams.Search, paginate?: Paginate): ApiResponse
    }
    const Elastic: ElasticContract
    export default Elastic
}
