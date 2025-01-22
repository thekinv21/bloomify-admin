import { Eye } from 'lucide-react'

import { useTranslate } from '@/hooks'

import { IFlower } from '@/types'

import { Button, Card } from '@/components/ui'

import styles from './Flower.module.scss'

interface IFlowerCard {
	flower: IFlower
}

export function FlowerCard({ flower }: IFlowerCard) {
	const { t } = useTranslate()

	return (
		<Card className={`group ${styles.flower_card}`}>
			<div className={styles.flower_image_container}>
				<img alt='Flower' src={flower.imageUrl ?? '/avatar.png'} />
			</div>

			<>
				<div className={styles.flower_category}>
					<p>{flower.title}</p>
				</div>
				<h6 className={styles.flower_title}>{flower.title}</h6>
				<p className={styles.flower_description}>{flower.description}</p>
				<p className={styles.flower_price_container}>
					<span>{flower.price + ' ' + flower.currency}</span>
					<del>{flower.discountedPrice + ' ' + flower.currency}</del>
				</p>
				<Button leftSection={<Eye size={16} />} className='w-full'>
					{t('view')}
				</Button>
			</>
		</Card>
	)
}
