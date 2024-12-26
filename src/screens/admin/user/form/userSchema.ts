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

	roles: z.array(z.number()).nonempty('required'),
	isActive: z.boolean()
})
