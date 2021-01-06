/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
Route.get('/', async ({ auth }) => {
    return { hello: 'world' }
})

Route.group(async () => {
    Route.group(() => {
        Route.post('/signin', 'AuthController.signin')
        Route.post('/register', 'AuthController.register')
        Route.get('/', 'AuthController.index').middleware('auth')
        Route.get('/logout', 'AuthController.logout').middleware('auth')
        Route.post('/forgot-password', 'PasswordResetController.request')
        Route.post('/reset-password', 'PasswordResetController.reset')
    }).prefix('auth')
    Route.group(() => {
        Route.get('/recomendations', 'AddressController.recomendations')
        Route.post('/:model', 'AddressController.store')
        Route.get('/:model/:parent_id', 'AddressController.show')
        Route.get('/:model/:parent_id/recomendations', 'AddressController.showRecomendations')
    }).prefix('address')
    Route.group(() => {
        Route.group(() => {
            Route.get('/', 'Delivery/PricesController.index')
            Route.get('/:unique', 'Delivery/PricesController.show')
            Route.post('/', 'Delivery/PricesController.storeOrUpdate')
            Route.put('/:unique', 'Delivery/PricesController.storeOrUpdate')
            Route.delete('/:unique', 'Delivery/PricesController.destroy')
        }).prefix('prices') //.middleware(['auth'])
        Route.group(() => {
            Route.get('/', 'Delivery/ServicesController.index')
            Route.get('/:unique', 'Delivery/ServicesController.show')
            Route.post('/', 'Delivery/ServicesController.storeOrUpdate')
            Route.put('/:unique', 'Delivery/ServicesController.storeOrUpdate')
            Route.delete('/:unique', 'Delivery/ServicesController.destroy')
        }).prefix('services') //.middleware(['auth'])
        Route.post('/fee', 'Delivery/PricesController.getDeliveryFee')
    }).prefix('delivery')
}).prefix('v1')
