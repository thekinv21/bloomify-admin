import { z } from 'zod'

export const flowerSchema = z.object({
	title: z
		.string({
			invalid_type_error: 'invalid_type',
			required_error: 'title_required'
		})
		.nonempty('title_required'),

	description: z
		.string({
			invalid_type_error: 'invalid_type',
			required_error: 'description_required'
		})
		.nonempty('description_required'),

	price: z
		.number({
			invalid_type_error: 'invalid_type',
			required_error: 'price_required'
		})
		.nonnegative({
			message: 'min_value'
		}),

	currency: z
		.string({
			invalid_type_error: 'invalid_type',
			required_error: 'currency_required'
		})
		.nonempty({
			message: 'currency_required'
		}),

	imageUrl: z
		.string({
			invalid_type_error: 'invalid_type',
			required_error: 'image_required'
		})
		.nonempty({
			message: 'image_required'
		}),

	height: z
		.number({
			invalid_type_error: 'invalid_type',
			required_error: 'height_required'
		})
		.nonnegative({
			message: 'min_value'
		}),

	width: z
		.number({
			invalid_type_error: 'invalid_type',
			required_error: 'width_required'
		})
		.nonnegative({
			message: 'min_value'
		}),

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
