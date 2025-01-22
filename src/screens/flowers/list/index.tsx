import { FilterIcon, FlowerIcon, PlusIcon } from 'lucide-react'

import { useTranslate } from '@/hooks'

import { IFlower } from '@/types'

import { BreadCrumb, Button, Card } from '@/components/ui'

import styles from './Flower.module.scss'
import { FlowerCard } from './FlowerCard'

export function FlowerList() {
	const { t } = useTranslate()

	const flowers: IFlower[] = []

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

			<Card className='mx-auto flex w-full flex-col p-5'>
				<div className='flex items-center justify-between'>
					<h3 className='inline-block text-center text-lg font-normal text-gray-600 sm:text-xl'>
						{t('flowers_list')}
					</h3>

					<div className='flex items-center gap-5'>
						<Button
							leftSection={<FilterIcon size={16} />}
							className='min-w-[120px]'
							variant='outline'
						>
							{t('filter')}
						</Button>

						<Button
							leftSection={<PlusIcon size={16} />}
							className='min-w-[120px]'
						>
							{t('create')}
						</Button>
					</div>
				</div>

				{Array.isArray(flowers) && flowers.length ? (
					<div className={styles.flower_card_grid}>
						{flowers.map((flower: IFlower) => (
							<FlowerCard flower={flower} key={flower.id} />
						))}
					</div>
				) : (
					<div className='flex flex-col items-center justify-center gap-2'>
						<FlowerIcon
							size={60}
							strokeWidth={1}
							aria-label='Flower_Icon'
							aria-description='Flower_icon_not_found'
						/>
						<span className='text-lg md:text-xl'>{t('data_empty')}</span>
					</div>
				)}
			</Card>
		</>
	)
}
