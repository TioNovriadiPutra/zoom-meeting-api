import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { decryptRequest } from '../helpers/request_handler.js'

export default class DecryptRequestMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    if (Object.keys(ctx.request.body()).length > 0) {
      ctx.request.updateBody(decryptRequest(ctx.request.body()))
    }

    await next()

    return
  }
}
