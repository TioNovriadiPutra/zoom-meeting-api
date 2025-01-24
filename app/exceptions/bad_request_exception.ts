import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
import { debugLog } from '../helpers/logger_handler.js'

export default class BadRequestException extends Exception {
  constructor(message: string) {
    super(message, {
      code: 'E_BAD_REQUEST',
      status: 400,
    })
  }

  async handle(error: this, ctx: HttpContext) {
    debugLog(ctx.logger, ctx.request, `Client Response | Failed (${error.code})`)

    return ctx.response.ok({
      rsp: '100',
      rspdesc: error.message,
      dataRes: {},
    })
  }
}
