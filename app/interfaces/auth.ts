import { loginValidator, registerValidator } from '#validators/auth'
import { Infer } from '@vinejs/vine/types'

export type RegisterInput = Infer<typeof registerValidator>
export type LoginInput = Infer<typeof loginValidator>
