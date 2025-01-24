import { Logger } from '@adonisjs/core/logger'
import { LoggerConfig } from '@adonisjs/core/types/logger'
import { Request, Response } from '@adonisjs/core/http'
import { debugLog } from './logger_handler.js'
import ValidationException from '#exceptions/validation_exception'
import DataNotFoundException from '#exceptions/data_not_found_exception'
import InternalServerException from '#exceptions/internal_server_exception'
import UnauthorizedException from '#exceptions/unauthorized_exception'
import BadRequestException from '#exceptions/bad_request_exception'
import ForbiddenException from '#exceptions/forbidden_exception'
import CryptoJS from 'crypto-js'
import env from '#start/env'

const generateIV = (): CryptoJS.lib.WordArray => CryptoJS.lib.WordArray.random(16)

export const encryptData = (data: any) => {
  const fixData = typeof data !== 'string' ? JSON.stringify(data) : data
  const secretKey = env.get('SECRET_KEY')

  const iv = generateIV()

  const encrypted = CryptoJS.AES.encrypt(fixData, secretKey, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  })

  return {
    encrypted: encrypted.toString(),
    iv: iv.toString(CryptoJS.enc.Base64),
  }
}

export const successReponse = (
  logger: Logger<LoggerConfig>,
  request: Request,
  response: Response,
  message: string,
  data?: any,
  meta?: any
) => {
  let dataRes = {
    rsp: '001',
    rspdesc: message,
    dataRes: {},
  }

  if (data) {
    dataRes = {
      rsp: '000',
      rspdesc: message,
      dataRes: {
        meta: meta || {},
        data,
      },
    }
  }

  debugLog(logger, request, 'Client Response | Success')

  return response.ok(dataRes)
}

export const errorResponse = (
  logger: Logger<LoggerConfig>,
  request: Request,
  error: any,
  custom?: {
    notFound?: {
      system: string
      data: string
    }
    badRequest?: {
      system: string
      data: string
    }
  }
) => {
  if (error.status === 422) {
    debugLog(logger, request, 'System Response (Validate Body) | Failed')

    throw new ValidationException(error.messages)
  } else if (error.status === 404) {
    debugLog(logger, request, `System Response (${custom!.notFound!.system}) | Failed`)

    throw new DataNotFoundException(custom!.notFound!.data)
  } else if (error.status === 403) {
    debugLog(logger, request, 'System Response (Access Checking) | Failed')

    throw new ForbiddenException()
  } else if (error.status === 401) {
    debugLog(logger, request, 'System Response (Token Checking) | Failed')

    throw new UnauthorizedException()
  } else if (error.status === 400) {
    debugLog(logger, request, `System Response (${custom!.badRequest!.system}) | Failed`)

    throw new BadRequestException(custom!.badRequest!.data)
  } else {
    debugLog(logger, request, 'System Response (Internal Server) | Failed')

    throw new InternalServerException(JSON.stringify(error))
  }
}
