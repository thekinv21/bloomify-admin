import { z } from 'zod'

export const userSchema = z.object({
	firstName: z
		.string({
			invalid_type_error: 'roleName_required',
			required_error: 'roleName_required'
		})
		.nonempty('roleName_required'),

	lastName: z
		.string({
			invalid_type_error: 'roleName_required',
			required_error: 'roleName_required'
		})
		.nonempty('roleName_required'),

	username: z
		.string({
			invalid_type_error: 'roleName_required',
			required_error: 'roleName_required'
		})
		.nonempty('roleName_required'),

	email: z
		.string({
			invalid_type_error: 'roleName_required',
			required_error: 'roleName_required'
		})
		.nonempty('roleName_required'),

	password: z
		.string({
			invalid_type_error: 'roleName_required',
			required_error: 'roleName_required'
		})
		.nonempty('roleName_required'),

	roles: z
		.string({
			invalid_type_error: 'roleName_required',
			required_error: 'roleName_required'
		})
		.nonempty('roleName_required'),

	isActive: z.boolean({
		invalid_type_error: 'password_required',
		required_error: 'password_required'
	})
})
