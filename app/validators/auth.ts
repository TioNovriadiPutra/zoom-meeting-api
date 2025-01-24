import vine from '@vinejs/vine'
import { uniqueRule } from './rules/unique.js'

export const registerValidator = vine.compile(
  vine.object({
    fullName: vine.string().minLength(1).alpha({
      allowSpaces: true,
    }),
    email: vine
      .string()
      .minLength(1)
      .email({
        ignore_max_length: true,
      })
      .use(uniqueRule({ table: 'users', column: 'email' })),
    password: vine.string().minLength(8).confirmed(),
  })
)

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().minLength(1),
    password: vine.string().minLength(1),
  })
)
