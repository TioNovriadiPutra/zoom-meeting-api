import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
import { debugLog } from '../helpers/logger_handler.js'

export default class UnauthorizedException extends Exception {
  constructor() {
    super('Session habis!', {
      code: 'E_UNAUTHORIZED',
      status: 401,
    })
  }

  async handle(error: this, ctx: HttpContext) {
    debugLog(ctx.logger, ctx.request, `Client Response | Failed ${error.code}`)

    return ctx.response.ok({
      rsp: '101',
      rspdesc: error.message,
      dataRes: {},
    })
  }
}
