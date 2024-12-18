import { ColumnDef } from '@tanstack/react-table'
import { FilePenLineIcon, PlayCircleIcon, Trash2Icon } from 'lucide-react'
import { useMemo } from 'react'

import { useTranslate } from '@/hooks'

import { IUser } from '@/types'

export const UserDataTableColumns = () => {
	const { t } = useTranslate()

	const columns = useMemo<ColumnDef<IUser>[]>(
		() => [
			{
				accessorKey: 'firstName',
				header: () => <span>{t('firstName')}</span>,
				cell: info => info.getValue()
			},
			{
				accessorKey: 'lastName',
				header: () => <span>{t('lastName')}</span>
			},
			{
				accessorKey: 'username',
				header: () => <span>{t('username')}</span>
			},
			{
				accessorKey: 'isActive',
				header: () => <span>{t('status')}</span>,
				cell: info => (info.getValue() ? t('active') : t('passive'))
			},

			{
				accessorKey: 'createdAt',
				header: () => <span>{t('createdAt')}</span>
			},

			{
				accessorKey: 'updatedAt',
				header: () => <span>{t('updatedAt')}</span>
			},

			{
				accessorKey: 'id',
				header: () => <span>{t('actions')}</span>,
				cell: info => {
					const id = info.getValue() as string
					return (
						<div className='flex items-start gap-2'>
							<button
								title={t(`toggle`)}
								onClick={() => alert(`Toggle Id = ${id}`)}
							>
								<PlayCircleIcon color='green' size={20} />
							</button>
							<button
								title={t(`edit`)}
								onClick={() => alert(`Edit Id = ${id}`)}
							>
								<FilePenLineIcon color='blue' size={20} />
							</button>
							<button
								title={t(`delete`)}
								onClick={() => alert(`Delete Id = ${id}`)}
							>
								<Trash2Icon color='red' size={20} />
							</button>
						</div>
					)
				}
			}
		],
		[]
	)

	return columns
}
