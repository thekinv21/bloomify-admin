import { ColumnDef } from '@tanstack/react-table'
import { FilePenLineIcon, Trash2Icon } from 'lucide-react'
import { useMemo } from 'react'

import { useCookie, useTranslate } from '@/hooks'

import { IRole } from '@/types'

import { Alert, Switch } from '@/components/ui'

import { useDeleteRole } from '../hooks/useDeleteRole'
import { useToggleRole } from '../hooks/useToggleRole'

import { DateShowFormat } from '@/utils'

export const RoleDataTableColumns = () => {
	const { t } = useTranslate()

	const { isAdmins } = useCookie()

	const { toggleRole } = useToggleRole()
	const { deleteRole } = useDeleteRole()

	const columns = useMemo<ColumnDef<IRole>[]>(
		() => [
			{
				accessorKey: 'name',
				header: () => <>{t('roleName')}</>,
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
										return toggleRole(id)
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
								<button
									title={t(`edit`)}
									onClick={() => alert(`Edit Id = ${id}`)}
								>
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
												return deleteRole(+id)
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

	return columns
}
