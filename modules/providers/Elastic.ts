import { ApplicationContract } from '@ioc:Adonis/Core/Application'
import Env from '@ioc:Adonis/Core/Env'
import Elastic from '../index'
/**
 * elastic provider to register the elastic binding
 */
export default class ElasticProvider {
    constructor (protected application: ApplicationContract) {}
    public static needsApplication = true
    public paginated
    /**
     * Register elastic binding
     */
    public register () {
        this.application.container.singleton('Adonis/Addons/Elastic', () => {
            let ELASTIC_URL = Env.get('ELASTIC_URL')
            let elastic: any = new Elastic({ node: ELASTIC_URL })
            return elastic
        })
    }
}
