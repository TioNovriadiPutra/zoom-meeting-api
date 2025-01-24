/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router
  .group(() => {
    router
      .group(() => {
        /* Auth Services */
        router
          .group(() => {
            router.post('/register', '#controllers/auth_controller.register')
            router.post('/login', '#controllers/auth_controller.login')
          })
          .prefix('/auth')

        /* Meeting Services */
        router
          .group(() => {
            router.get('/', '#controllers/meetings_controller.getMeetings')
          })
          .prefix('/meeting')
      })
      .prefix('/v1')
  })
  .prefix('/zoom')
