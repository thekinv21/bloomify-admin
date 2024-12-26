import { z } from 'zod'

export const userSchema = z.object({
	firstName: z
		.string({
			invalid_type_error: 'firstName_required',
			required_error: 'firstName_required'
		})
		.nonempty('firstName_required'),

	lastName: z
		.string({
			invalid_type_error: 'lastName_required',
			required_error: 'lastName_required'
		})
		.nonempty('lastName_required'),

	username: z
		.string({
			invalid_type_error: 'username_required',
			required_error: 'username_required'
		})
		.nonempty('username_required'),

	email: z
		.string({
			invalid_type_error: 'email_required',
			required_error: 'email_required'
		})
		.nonempty('email_required'),

	password: z
		.string({
			invalid_type_error: 'password_required',
			required_error: 'password_required'
		})
		.nonempty('password_required'),

	roles: z.array(z.string().min(1, 'role_required')).nonempty('role_required'),
	isActive: z.boolean()
})
