import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { endLog, startLog } from '../helpers/logger_handler.js'

export default class LoggerMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    startLog(ctx)

    await next()

    endLog(ctx)

    return
  }
}
