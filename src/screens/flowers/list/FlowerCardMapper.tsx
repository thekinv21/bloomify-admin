import { DatabaseIcon } from 'lucide-react'

import { useTranslate } from '@/hooks'

import { IFlower } from '@/types'

import styles from './Flower.module.scss'
import { FlowerCard } from './FlowerCard'
import { FlowerListHeader } from './FlowerListHeader'
import { isArrayNotEmpty } from '@/utils'

type TypeFlowerList = {
	flowers: IFlower[]
	setIsGridView: (isGridView: boolean) => void
}

export function FlowerCardMapper({ flowers, setIsGridView }: TypeFlowerList) {
	const { t } = useTranslate()

	return (
		<>
			<FlowerListHeader setIsGridView={setIsGridView} />

			{isArrayNotEmpty(flowers) ? (
				<div className={styles.flower_card_grid}>
					{flowers.map((flower: IFlower) => (
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
					/>
					<span>{t('data_empty')}</span>
				</div>
			)}
		</>
	)
}
