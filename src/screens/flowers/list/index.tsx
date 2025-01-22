import { FlowerIcon } from 'lucide-react'

import { useTranslate } from '@/hooks'

import { IFlower } from '@/types'

import { BreadCrumb } from '@/components/ui'

import { FlowerCard } from './FlowerCard'

export function FlowerList() {
	const { t } = useTranslate()

	const flowers: IFlower[] = [
		{
			id: 1,
			title: 'Elegant Rose Bouquet',
			description: 'A bouquet of premium roses for all occasions.',
			price: 50,
			discountedPrice: 75,
			currency: 'USD',
			imageUrl: '/avatar.png',
			width: 12,
			height: 12,
			flowerImages: [],
			isActive: true,
			order: 1,
			createdAt: '2025-01-08T16:06:58.24192',
			updatedAt: '2025-01-19T19:42:16.164925'
		},
		{
			id: 2,
			title: 'White Rose Bouquet',
			description: 'A bouquet of premium roses for all occasions.',
			price: 65,
			discountedPrice: 55,
			currency: 'TRY',
			imageUrl: '/avatar.png',
			width: 8,
			height: 29,
			flowerImages: [],
			isActive: true,
			order: 2,
			createdAt: '2025-01-08T16:06:58.24192',
			updatedAt: '2025-01-19T19:42:16.164925'
		},
		{
			id: 3,
			title: 'Red Rose Bouquet',
			description: 'A bouquet of premium roses for all occasions.',
			price: 89,
			discountedPrice: 65,
			currency: 'KG',
			imageUrl: '/avatar.png',
			width: 4,
			height: 21,
			flowerImages: [],
			isActive: true,
			order: 1,
			createdAt: '2025-01-08T16:06:58.24192',
			updatedAt: '2025-01-19T19:42:16.164925'
		},
		{
			id: 8,
			title: 'Red Rose Bouquet',
			description: 'A bouquet of premium roses for all occasions.',
			price: 89,
			discountedPrice: 65,
			currency: 'KG',
			imageUrl: '/avatar.png',
			width: 4,
			height: 21,
			flowerImages: [],
			isActive: true,
			order: 1,
			createdAt: '2025-01-08T16:06:58.24192',
			updatedAt: '2025-01-19T19:42:16.164925'
		},
		{
			id: 4,
			title: 'Red Rose Bouquet',
			description: 'A bouquet of premium roses for all occasions.',
			price: 89,
			discountedPrice: 65,
			currency: 'KG',
			imageUrl: '/avatar.png',
			width: 4,
			height: 21,
			flowerImages: [],
			isActive: true,
			order: 1,
			createdAt: '2025-01-08T16:06:58.24192',
			updatedAt: '2025-01-19T19:42:16.164925'
		},
		{
			id: 5,
			title: 'Red Rose Bouquet',
			description: 'A bouquet of premium roses for all occasions.',
			price: 89,
			discountedPrice: 65,
			currency: 'KG',
			imageUrl: '/avatar.png',
			width: 4,
			height: 21,
			flowerImages: [],
			isActive: true,
			order: 1,
			createdAt: '2025-01-08T16:06:58.24192',
			updatedAt: '2025-01-19T19:42:16.164925'
		},
		{
			id: 6,
			title: 'Red Rose Bouquet',
			description: 'A bouquet of premium roses for all occasions.',
			price: 89,
			discountedPrice: 65,
			currency: 'KG',
			imageUrl: '/avatar.png',
			width: 4,
			height: 21,
			flowerImages: [],
			isActive: true,
			order: 1,
			createdAt: '2025-01-08T16:06:58.24192',
			updatedAt: '2025-01-19T19:42:16.164925'
		},
		{
			id: 7,
			title: 'Red Rose Bouquet',
			description: 'A bouquet of premium roses for all occasions.',
			price: 89,
			discountedPrice: 65,
			currency: 'KG',
			imageUrl: '/avatar.png',
			width: 4,
			height: 21,
			flowerImages: [],
			isActive: true,
			order: 1,
			createdAt: '2025-01-08T16:06:58.24192',
			updatedAt: '2025-01-19T19:42:16.164925'
		}
	]

	return (
		<>
			<BreadCrumb
				linksArray={[
					{
						link: '#',
						title: 'flowers',
						icon: <FlowerIcon size={16} />
					}
				]}
			/>

			{Array.isArray(flowers) && flowers.length ? (
				<div className='flex flex-wrap gap-4'>
					{flowers.map((flower: IFlower) => (
						<FlowerCard flower={flower} key={flower.id} />
					))}
				</div>
			) : (
				<span className='text-center'>{t('not_found')}</span>
			)}
		</>
	)
}
