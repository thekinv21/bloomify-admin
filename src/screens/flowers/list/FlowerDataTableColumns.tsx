import { ColumnDef } from '@tanstack/react-table'
import { FilePenLineIcon, Trash2Icon } from 'lucide-react'
import { useMemo } from 'react'

import { useCookie, useTranslate } from '@/hooks'

import { IFlower } from '@/types'

import { Alert, Switch } from '@/components/ui'

import { useDeleteFlower } from '../hooks/useDeleteFlower'
import { useToggleFlower } from '../hooks/useToggleFlower'

import { DateShowFormat } from '@/utils'

export const FlowerDataTableColumns = () => {
	const { t } = useTranslate()

	const { isAdmins } = useCookie()

	const { toggleFlower } = useToggleFlower()
	const { deleteFlower } = useDeleteFlower()

	const columns = useMemo<ColumnDef<IFlower>[]>(
		() => [
			{
				accessorKey: 'imageUrl',
				header: () => <>{t('image')}</>,
				cell: info => () => (
					<img
						src={info.getValue() as string}
						alt='flower'
						className='h-12 w-12 rounded-full object-cover'
					/>
				)
			},

			{
				accessorKey: 'title',
				header: () => <>{t('title')}</>,
				cell: info => info.getValue()
			},

			{
				accessorKey: 'description',
				header: () => <>{t('description')}</>,
				cell: info => info.getValue()
			},

			{
				accessorKey: 'price',
				header: () => <>{t('price')}</>,
				cell: info => info.getValue()
			},

			{
				accessorKey: 'currency',
				header: () => <>{t('currency')}</>,
				cell: info => info.getValue()
			},

			{
				accessorKey: 'height',
				header: () => <>{t('height')}</>,
				cell: info => info.getValue()
			},

			{
				accessorKey: 'width',
				header: () => <>{t('width')}</>,
				cell: info => info.getValue()
			},

			{
				accessorKey: 'createdAt',
				header: () => <>{t('createdAt')}</>,
				cell: info => <>{DateShowFormat(info.getValue() as string)}</>
			},

			{
				accessorKey: 'updatedAt',
				header: () => <>{t('updatedAt')}</>,
				cell: info => <>{DateShowFormat(info.getValue() as string)}</>
			},

			{
				accessorKey: 'isActive',
				header: () => <>{t('status')}</>,
				cell: info => {
					const id = info.row.original?.id

					return (
						<Switch
							checked={info.getValue() as boolean}
							onClick={() => {
								Alert({
									subTitle: t('toggle_confirm'),
									action: async () => {
										return toggleFlower(id)
									}
								})
							}}
						/>
					)
				}
			},

			{
				accessorKey: 'id',
				header: () => <span>{t('actions')}</span>,
				cell: info => {
					const id = info.getValue() as string
					return (
						<div className='flex items-start gap-x-5'>
							{isAdmins && (
								<button title={t(`edit`)}>
									<FilePenLineIcon color='blue' size={20} />
								</button>
							)}

							{isAdmins && (
								<button
									title={t(`delete`)}
									onClick={() => {
										Alert({
											subTitle: t('delete_confirm'),
											action: async () => {
												return deleteFlower(+id)
											}
										})
									}}
								>
									<Trash2Icon color='red' size={20} />
								</button>
							)}
						</div>
					)
				}
			}
		],
		[]
	)

	return {
		columns
	}
}
