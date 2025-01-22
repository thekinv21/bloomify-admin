import {
	DatabaseIcon,
	FilterIcon,
	FlowerIcon,
	Grid2X2Icon,
	PlusIcon
} from 'lucide-react'

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

			<Card className={styles.page_content}>
				<div className={styles.page_header_container}>
					<h3>{t('flowers_list')}</h3>

					<div>
						<Button leftSection={<Grid2X2Icon size={16} />} variant='outline'>
							{t('view_type')}
						</Button>

						<Button leftSection={<FilterIcon size={16} />} variant='warning'>
							{t('filter')}
						</Button>

						<Button leftSection={<PlusIcon size={16} />}>{t('create')}</Button>
					</div>
				</div>

				{Array.isArray(flowers) && flowers.length ? (
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
			</Card>
		</>
	)
}
