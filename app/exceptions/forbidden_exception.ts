import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
import { debugLog } from '../helpers/logger_handler.js'

export default class ForbiddenException extends Exception {
  constructor() {
    super('Akun tidak memiliki akses!', {
      code: 'E_FORBIDDEN',
      status: 403,
    })
  }

  async handle(error: this, ctx: HttpContext) {
    debugLog(ctx.logger, ctx.request, `Client Response | Failed (${error.code})`)

    return ctx.response.ok({
      rsp: '103',
      rspdesc: error.message,
      dataRes: {},
    })
  }
}
