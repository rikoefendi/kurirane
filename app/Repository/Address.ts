import Database from '@ioc:Adonis/Lucid/Database'
import Elastic from '@ioc:Adonis/Addons/Elastic'

import City from 'App/Models/Address/City'
import District from 'App/Models/Address/District'
import Province from 'App/Models/Address/Province'

interface listAllParam {
  page?: number
  perPage?: number
  search?: string | null
}

export default class Address {
  protected elastic = Elastic

  protected _index: string = 'address'

  static async create (modelName, data) {
    let models = [Province, City, District]
    let model = models.filter((e) => e.name.toLowerCase() == modelName)[0]
    data = await model.create(data)
    model.syncElastic()
    return data
  }

  static async listAll (params?: listAllParam) {
    let _this = new this()
    let defaultParam: listAllParam = {
      page: 1,
      perPage: 15,
      search: null,
    }
    params = Object.assign({}, defaultParam, params)
    let data
    try {
      data = await _this.searchElastic(params)
      return data
    } catch (error) {
      if (error.statusCode == 404) {
        await _this.createIndexElastic()
        let data = await _this.searchElastic(params)
        return data
      }
      return error
    }
  }

  protected async searchElastic (params: listAllParam) {
    let body: any = {
      query: {
        multi_match: {
          query: params?.search,
          fields: ['district_name', 'city_name'],
          type: 'phrase_prefix',
          operator: 'OR',
        },
      },
    }
    body = params.search ? body : {}

    let data = this.elastic.searchPaginate(
      {
        index: this._index,
        body,
      },
      params
    )
    return data
  }

  protected async createIndexElastic () {
    let listDb = await this.listAllDb()
    listDb = listDb.flatMap((list) => {
      list.postal_code = JSON.parse(list.postal_code)
      return [{ index: { _index: this._index, _id: list.id } }, list]
    })
    return Elastic.bulk({ refresh: true, body: listDb })
  }

  protected async checkExistElastic () {
    return (await this.elastic.indices.exists({ index: this._index })).statusCode == 404
      ? false
      : true
  }

  protected async listAllDb () {
    return Database.query().select(
      Database.raw(`
        province.name province_name,
        city.province_id,
        city.name city_name,
        city_id,
        district.id district_id,
        district.name district_name,
        postal_code,
        CONCAT(district.name, ', ', city.name, ', ', province.name) as label
        from address_provinces
        province,
        address_cities city,
        address_districts district
        where
        city.province_id = province.id and
        district.city_id = city.id`)
    )
  }
}
