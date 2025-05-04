import { z } from 'zod'

export const flowerSchema = z.object({
	title: z
		.string({
			invalid_type_error: 'invalid_type',
			required_error: 'title_required'
		})
		.nonempty('title_required'),

	description: z.string().nonempty({
		message: 'description_required'
	}),

	price: z.preprocess(
		val => {
			if (typeof val === 'string') {
				const parsed = parseFloat(val)
				return isNaN(parsed) ? undefined : parsed
			}
			return val
		},
		z
			.number({
				required_error: 'price_required',
				invalid_type_error: 'price_required'
			})
			.nonnegative({ message: 'min_value' })
			.refine(val => val > 0, { message: 'min_value' })
	),

	currency: z
		.string({
			invalid_type_error: 'invalid_type',
			required_error: 'currency_required'
		})
		.nonempty({
			message: 'currency_required'
		}),

	imageUrl: z.string().optional(),

	height: z
		.number({
			invalid_type_error: 'height_required',
			required_error: 'height_required'
		})
		.nonnegative({
			message: 'min_value'
		})
		.refine(val => val > 0, { message: 'min_value' }),

	width: z
		.number({
			invalid_type_error: 'width_required',
			required_error: 'width_required'
		})
		.nonnegative({
			message: 'min_value'
		})
		.refine(val => val > 0, { message: 'min_value' }),

	isActive: z.boolean(),

	order: z.number().optional(),

	flowerImages: z
		.object({
			imageTitle: z.string({
				invalid_type_error: 'invalid_type',
				required_error: 'image_title_required'
			}),
			imageCost: z.string().optional(),

			imageUrl: z
				.string({
					invalid_type_error: 'invalid_type',
					required_error: 'image_required'
				})
				.nonempty({
					message: 'image_required'
				}),
			isMainImage: z.boolean().optional(),
			isActive: z.boolean().optional(),
			order: z.number().optional()
		})
		.array()
		.nonempty({
			message: 'flower_images_required'
		})
})
