import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
import { debugLog } from '../helpers/logger_handler.js'

export default class DataNotFoundException extends Exception {
  constructor(data: string) {
    super(`Data ${data} tidak ditemukan!`, {
      code: 'E_DATA_NOT_FOUND',
      status: 404,
    })
  }

  async handle(error: this, ctx: HttpContext) {
    debugLog(ctx.logger, ctx.request, `Client Response | Failed (${error.code})`)

    return ctx.response.ok({
      rsp: '104',
      rspdesc: error.message,
      dataRes: {},
    })
  }
}
