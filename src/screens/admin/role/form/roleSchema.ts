import { z } from 'zod'

export const roleSchema = z.object({
	name: z
		.string({
			invalid_type_error: 'roleName_required',
			required_error: 'roleName_required'
		})
		.toUpperCase()
		.nonempty('roleName_required'),
	isActive: z.boolean()
})
