import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
import { debugLog } from '../helpers/logger_handler.js'

export default class InternalServerException extends Exception {
  private errorMess: string

  constructor(errorMess: string) {
    super('Kesalahan sistem!', {
      code: 'E_INTERNAL_SERVER',
      status: 500,
    })

    this.errorMess = errorMess
  }

  async handle(error: this, ctx: HttpContext) {
    debugLog(ctx.logger, ctx.request, `Client Response | Failed (${error.code})`)

    return ctx.response.ok({
      rsp: '999',
      rspdesc: error.message,
      dataRes: {
        meta: {},
        data: this.errorMess,
      },
    })
  }
}
