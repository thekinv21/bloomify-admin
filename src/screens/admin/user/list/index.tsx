import { ColumnDef, PaginationState } from '@tanstack/react-table'
import { AxiosError } from 'axios'
import { FilePenLineIcon, PlayCircleIcon, Trash2Icon } from 'lucide-react'
import React, { useEffect, useMemo } from 'react'

import { useDebounce, useTranslate } from '@/hooks'

import { IUser } from '@/types'
import { AlertCustomEnum, AlertEnum } from '@/types/custom.enum'

import { errorCatch } from '@/services'

import { AlertNotification, DataTable } from '@/components/ui'

import { useFetchUsers } from '../hooks/useFetchUsers'

export function UserList() {
	const { t } = useTranslate()

	const [searchTerm, setSearchTerm] = React.useState<string>('')

	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10
	})

	const debouncedSearch = useDebounce(searchTerm, 1500)

	const { query } = useFetchUsers({
		page: pagination.pageIndex,
		size: pagination.pageSize,
		searchTerm: debouncedSearch.trim() !== '' ? debouncedSearch : undefined
	})

	useEffect(() => {
		if (query.isError) {
			return AlertNotification({
				icon: AlertEnum.WARNING,
				message: errorCatch(query.error as AxiosError),
				customClass: AlertCustomEnum.WARNING
			})
		}
	}, [query.isError])

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

	return (
		<DataTable
			columns={columns}
			tableHeading='Users List'
			data={query.data?.content as IUser[]}
			totalPages={query.data?.totalPages || 0}
			totalElements={query.data?.totalElements || 0}
			isFetching={query.isFetching}
			isLoading={query.isLoading}
			pagination={pagination}
			setPagination={setPagination}
			searchTerm={searchTerm}
			setSearchTerm={setSearchTerm}
		/>
	)
}
