import { Exception } from '@adonisjs/core/exceptions'
import { HttpContext } from '@adonisjs/core/http'
import { debugLog } from '../helpers/logger_handler.js'

export default class ValidationException extends Exception {
  private messages: any

  constructor(messages: any) {
    super('Validasi gagal!', {
      code: 'E_VALIDATION',
      status: 422,
    })

    this.messages = messages
  }

  async handle(error: this, ctx: HttpContext) {
    debugLog(ctx.logger, ctx.request, `Client Response | Failed (${this.code})`)

    return ctx.response.ok({
      rsp: '122',
      rspdesc: error.message,
      dataRes: {
        meta: {},
        data: this.messages,
      },
    })
  }
}
