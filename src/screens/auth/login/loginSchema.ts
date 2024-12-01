import { z } from 'zod'

export const loginSchema = z.object({
	username: z
		.string({
			invalid_type_error: 'username_required',
			required_error: 'username_required'
		})
		.min(3, {
			message: 'username_must_be'
		}),
	password: z
		.string({
			invalid_type_error: 'password_required',
			required_error: 'password_required'
		})
		.min(3, {
			message: 'password_must_be'
		})
})
