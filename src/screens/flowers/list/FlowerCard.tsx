import { FilePenLineIcon, Trash2Icon } from 'lucide-react'

import { useCookie, useTranslate } from '@/hooks'

import { IFlower } from '@/types'

import { Alert, Switch } from '@/components/ui'

import { useDeleteFlower } from '../hooks/useDeleteFlower'
import { useToggleFlower } from '../hooks/useToggleFlower'

import styles from './Flower.module.scss'
import { detectCurrency } from '@/utils'

interface IFlowerCard {
	flower: IFlower
}

export function FlowerCard({ flower }: IFlowerCard) {
	const { t } = useTranslate()

	const { isAdmins } = useCookie()
	const { toggleFlower } = useToggleFlower()
	const { deleteFlower } = useDeleteFlower()

	return (
		<div className={`group ${styles.flower_card}`}>
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

			{isAdmins && (
				<div className='flex w-full items-center justify-between gap-2'>
					<Switch
						checked={flower.isActive as boolean}
						size='sm'
						onClick={() => {
							Alert({
								subTitle: t('toggle_confirm'),
								action: async () => {
									toggleFlower(flower.id)
								}
							})
						}}
					/>

					<div className='flex items-center gap-2'>
						<button title={t(`edit`)}>
							<FilePenLineIcon color='blue' size={20} />
						</button>

						<button
							title={t(`delete`)}
							onClick={() => {
								Alert({
									subTitle: t('delete_confirm'),
									action: async () => {
										deleteFlower(flower.id)
									}
								})
							}}
						>
							<Trash2Icon color='red' size={20} />
						</button>
					</div>
				</div>
			)}
		</div>
	)
}
