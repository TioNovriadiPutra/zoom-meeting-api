import { Logger } from '@adonisjs/core/logger'
import { LoggerConfig } from '@adonisjs/core/types/logger'
import { HttpContext, Request } from '@adonisjs/core/http'

export function startLog(ctx: HttpContext) {
  ctx.logger.info({
    requestId: ctx.request.id,
    message: `Recieved ${ctx.request.method()} request to ${ctx.request.url(true)}`,
    headers: ctx.request.headers(),
    body: ctx.request.body(),
  })
}

export function endLog(ctx: HttpContext) {
  ctx.logger.info({
    requestId: ctx.request.id,
    message: `Finished ${ctx.request.method()} request to ${ctx.request.url(true)}`,
    body: ctx.request.body(),
    ip: ctx.request.ip(),
    user: ctx.auth.user ? ctx.auth.user.id : 'guest',
    meta: {
      url: ctx.request.url(),
      method: ctx.request.method(),
      status: ctx.response.response.statusCode,
    },
    headers: ctx.request.headers(),
    response: ctx.response.getBody(),
  })
}

export const debugLog = (logger: Logger<LoggerConfig>, request: Request, message: string) => {
  logger.debug({
    requestId: request.id,
    message,
    body: JSON.stringify(request.body()),
  })
}
