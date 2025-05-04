import { DatabaseIcon } from 'lucide-react'

import { useTranslate } from '@/hooks'

import { IFlower } from '@/types'

import { SmallLoader } from '@/components/ui'

import styles from './Flower.module.scss'
import { FlowerCard } from './FlowerCard'
import { isArrayNotEmpty } from '@/utils'

type TypeFlowerList = {
	flowers: IFlower[]
	isLoading: boolean
}

export function FlowerCardMapper({ flowers, isLoading }: TypeFlowerList) {
	const { t } = useTranslate()

	const sortByOrder = (array: IFlower[]) => {
		return array.sort((a: IFlower, b: IFlower) => a.order - b.order)
	}

	return (
		<>
			{isLoading ? (
				<SmallLoader
					className='my-10 size-20'
					size={100}
					aria-label='Flower_Icon'
					aria-description='Flower_icon_loading'
				/>
			) : (
				<div>
					{isArrayNotEmpty(flowers) ? (
						<div className={styles.flower_card_grid}>
							{sortByOrder(flowers)?.map((flower: IFlower) => (
								<FlowerCard flower={flower} key={flower.id} />
							))}
						</div>
					) : (
						<div className={styles.not_found_container}>
							<DatabaseIcon
								size={40}
								strokeWidth={1}
								aria-label='Flower_Icon'
								aria-description='Flower_icon_not_found'
								className='text-foreground/30'
							/>
							<span className='font-semibold text-foreground/30'>
								{t('data_empty')}
							</span>
						</div>
					)}
				</div>
			)}
		</>
	)
}
