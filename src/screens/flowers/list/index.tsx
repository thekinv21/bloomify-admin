import { FlowerIcon } from 'lucide-react'

import { IFlower } from '@/types'

import { BreadCrumb, Card } from '@/components/ui'

import styles from './Flower.module.scss'
import { FlowerCardMapper } from './FlowerCardMapper'
import { FlowerListHeader } from './FlowerListHeader'

export function FlowerList() {
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
				<FlowerListHeader />
				<FlowerCardMapper flowers={flowers} />
			</Card>
		</>
	)
}
