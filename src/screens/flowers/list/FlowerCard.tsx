import { useTranslate } from '@/hooks'

import { IFlower } from '@/types'

import { Button, Card } from '@/components/ui'

import styles from './Flower.module.scss'
import { detectCurrency } from '@/utils'

interface IFlowerCard {
	flower: IFlower
}

export function FlowerCard({ flower }: IFlowerCard) {
	const { t } = useTranslate()

	return (
		<Card className={`group ${styles.flower_card}`}>
			<div className={styles.flower_image_container}>
				<img
					alt='Flower'
					src={flower.imageUrl ?? '/avatar.png'}
					className='group-hover:scale-105'
					draggable={false}
				/>
			</div>

			<div className={styles.flower_category}>
				<p>
					{t('width')} : {flower.width}cm
				</p>

				<p>
					{t('height')} : {flower.height}cm
				</p>
			</div>

			<div className='flex w-full justify-between'>
				<h6 className={styles.flower_title}>{flower.title}</h6>
				<p className={styles.flower_price_container}>
					<span>{`${detectCurrency(flower.currency) + ' ' + flower.price}`}</span>
				</p>
			</div>

			<p className={styles.flower_description}>{flower.description}</p>

			<div className='flex w-full justify-end'>
				<Button variant='link'>{t('view_details')}</Button>
			</div>
		</Card>
	)
}
