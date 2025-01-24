import { Logger } from '@adonisjs/core/logger'
import { LoggerConfig } from '@adonisjs/core/types/logger'
import { Request } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import CryptoJS from 'crypto-js'
import env from '#start/env'
import { debugLog } from './logger_handler.js'

export const decryptRequest = (data: Record<string, any>) => {
  const secretKey = env.get('SECRET_KEY')

  const iv = CryptoJS.enc.Base64.parse(data.iv)
  const bytes = CryptoJS.AES.decrypt(data.encrypted, secretKey, {
    iv,
  })

  const decrypted = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))

  for (const key in decrypted) {
    if (decrypted[key] === '\\') {
      decrypted[key] = undefined
    }
  }

  return decrypted
}

export const validateRequest = async <T>(
  logger: Logger<LoggerConfig>,
  request: Request,
  validator: any
): Promise<T> => {
  try {
    debugLog(logger, request, 'System Request (Validate Body) | Process')

    const data = await request.validateUsing(validator)

    debugLog(logger, request, 'System Response (Validate Body) | Success')

    return data as T
  } catch (error) {
    throw error
  }
}

export const fetchHandler = async (
  logger: Logger<LoggerConfig>,
  request: Request,
  dataName: string,
  query: string,
  binding: (string | number)[],
  type: 'single' | 'bulk' = 'bulk'
) => {
  try {
    debugLog(logger, request, `System Request (Fetching ${dataName}) | Process`)

    const data = await db.rawQuery(query, binding)

    if (type === 'single') {
      if (data[0].length === 0) {
        throw { status: 404 }
      }

      debugLog(logger, request, `System Response (Fetching ${dataName}) | Success`)

      return data[0][0]
    }

    debugLog(logger, request, `System Response (Fetching ${dataName}) | Success`)

    return data[0]
  } catch (error) {
    throw error
  }
}
