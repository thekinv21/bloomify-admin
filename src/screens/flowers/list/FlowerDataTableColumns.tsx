import { ColumnDef } from '@tanstack/react-table'
import { FilePenLineIcon, Trash2Icon } from 'lucide-react'
import { useMemo } from 'react'

import { useCookie, useTranslate } from '@/hooks'

import { IFlower } from '@/types'

import { Alert, CustomTooltip, Switch } from '@/components/ui'

import { useDeleteFlower } from '../hooks/useDeleteFlower'
import { useToggleFlower } from '../hooks/useToggleFlower'

import { DateShowFormat, detectCurrency } from '@/utils'

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
				cell: info => (
					<img
						alt='Flower'
						src={info.getValue() as string}
						className='h-10 w-10 rounded-full'
						draggable={false}
					/>
				)
			},

			{
				accessorKey: 'title',
				header: () => <>{t('title')}</>,
				cell: info => (
					<>
						{
							<CustomTooltip message={info.getValue() as string}>
								<span className='inline-block max-w-[200px] cursor-pointer truncate hover:underline'>
									{info.getValue() as string}
								</span>
							</CustomTooltip>
						}
					</>
				)
			},

			{
				accessorKey: 'price',
				header: () => <>{t('price')}</>,
				cell: info => (
					<>
						{info.getValue() as number}{' '}
						{detectCurrency(info.row.original?.currency)}
					</>
				)
			},

			{
				accessorKey: 'currency',
				header: () => <>{t('currency')}</>
			},

			{
				accessorKey: 'height',
				header: () => <>{t('height')}</>,
				cell: info => <>{`${info.getValue() as number} cm`}</>
			},

			{
				accessorKey: 'width',
				header: () => <>{t('width')}</>,
				cell: info => <>{`${info.getValue() as number} cm`}</>
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
										toggleFlower(id as number)
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
					const id = info.getValue() as number
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
												deleteFlower(id as number)
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
