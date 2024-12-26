import { ColumnDef } from '@tanstack/react-table'
import { FilePenLineIcon, Trash2Icon, UserRoundCogIcon } from 'lucide-react'
import { useMemo } from 'react'

import { useCookie, useTranslate } from '@/hooks'

import { IUser } from '@/types'

import {
	Alert,
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	Switch
} from '@/components/ui'

import { useDeleteUser } from '../hooks/useDeleteUser'
import { useToggleUser } from '../hooks/useToggleUser'

import { DateShowFormat } from '@/utils'

export const UserDataTableColumns = () => {
	const { t } = useTranslate()

	const { toggleUser } = useToggleUser()
	const { deleteUser } = useDeleteUser()

	const { isAdmins } = useCookie()

	const columns = useMemo<ColumnDef<IUser>[]>(
		() => [
			{
				accessorKey: 'firstName',
				header: () => <>{t('firstName')}</>,
				cell: info => info.getValue()
			},
			{
				accessorKey: 'lastName',
				header: () => <>{t('lastName')}</>
			},
			{
				accessorKey: 'username',
				header: () => <>{t('username')}</>
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
				accessorKey: 'roles',
				header: () => <>{t('role')}</>,
				cell: info => {
					const row = info.row.original
					const roles = row.roles

					return (
						<DropdownMenu>
							<DropdownMenuTrigger className='select-none text-sm font-normal outline-none'>
								<Button variant='outline' size='xs'>
									{t('show_roles')}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className='min-w-28 text-sm'>
								{roles.map((role: string, idx: number) => (
									<DropdownMenuItem key={idx}>
										<UserRoundCogIcon size={16} strokeWidth={2} />
										{role}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					)
				}
			},

			{
				accessorKey: 'isActive',
				header: () => <>{t('status')}</>,
				cell: info => {
					const row = info.row.original
					const ID = row.id

					return (
						<Switch
							checked={info.getValue() as boolean}
							onClick={() => {
								Alert({
									subTitle: t('toggle_confirm'),
									action: async () => {
										return toggleUser(ID)
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
												return deleteUser(id)
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
