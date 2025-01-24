import type { HttpContext } from '@adonisjs/core/http'
import { validateRequest } from '../helpers/request_handler.js'
import { loginValidator, registerValidator } from '#validators/auth'
import { LoginInput, RegisterInput } from '../interfaces/auth.js'
import User from '#models/user'
import { debugLog } from '../helpers/logger_handler.js'
import { errorResponse, successReponse } from '../helpers/response_handler.js'

export default class AuthController {
  async register({ logger, request, response }: HttpContext) {
    try {
      const data = await validateRequest<RegisterInput>(logger, request, registerValidator)

      debugLog(logger, request, 'System Request (Creating Account) | Process')

      const newUser = new User()
      newUser.fullName = data.fullName
      newUser.email = data.email
      newUser.password = data.password

      await newUser.save()

      debugLog(logger, request, 'System Response (Creating Account) | Success')

      return successReponse(logger, request, response, 'Registrasi berhasil!')
    } catch (error) {
      return errorResponse(logger, request, error)
    }
  }

  async login({ logger, request, response }: HttpContext) {
    try {
      const data = await validateRequest<LoginInput>(logger, request, loginValidator)

      debugLog(logger, request, 'System Request (Account Checking) | Process')

      const userData = await User.verifyCredentials(data.email, data.password)

      debugLog(logger, request, 'System Response (Account Checking) | Success')

      debugLog(logger, request, 'System Request (Creating Token) | Process')

      const token = await User.accessTokens.create(userData)

      debugLog(logger, request, 'System Request (Creating Token) | Success')

      return successReponse(logger, request, response, 'Login berhasil!', {
        token: token.value!.release(),
      })
    } catch (error) {
      return errorResponse(logger, request, error, {
        badRequest: {
          system: 'Creating Token',
          data: 'Email atau Password salah!',
        },
      })
    }
  }
}
