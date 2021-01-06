import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Province from 'App/Models/Address/Province'
import fs from 'fs'
import Bluebird from 'bluebird'
import _ from 'lodash'
export default class AddressSeeder extends BaseSeeder {
  public async run () {
    const address = JSON.parse(
      fs.readFileSync(__dirname + '/address.json').toString()
    )

    await Bluebird.map(
      await Province.createMany(address),
      async province => {
        let provinced = address.filter(p => p.name == province.name)[0]
        await Bluebird.map(
          await province.related('cities').createMany(provinced.cities),
          async city => {
            let citi = provinced.cities.filter(f => f.name == city.name)[0]
            await city.related('districts').createMany(
              citi.districts.map(e => {
                e.postal_code = JSON.stringify(_.uniq(e.postal_code))
                return e
              })
            )
          }
        )
      },
      { concurrency: 1 }
    )
  }
}