import { PaginationState } from '@tanstack/react-table'
import { AxiosError } from 'axios'
import { ShieldCheckIcon, UserIcon } from 'lucide-react'
import React, { useEffect } from 'react'

import { useDebounce, useTranslate } from '@/hooks'

import { AlertCustomEnum, AlertEnum } from '@/types/custom.enum'

import { errorCatch } from '@/services'

import { AlertNotification, BreadCrumb, DataTable } from '@/components/ui'

import { useFetchUsers } from '../hooks/useFetchUsers'

import { UserDataTableColumns } from './UserDataTableColumns'

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

	const columns = UserDataTableColumns()

	return (
		<>
			<BreadCrumb
				linksArray={[
					{
						link: '/admin',
						title: 'admin',
						icon: <ShieldCheckIcon size={16} />
					},
					{
						link: '/admin/user',
						title: 'user',
						icon: <UserIcon size={16} />
					}
				]}
			/>

			<DataTable
				columns={columns}
				tableHeading={t('users_list')}
				query={query}
				pagination={pagination}
				setPagination={setPagination}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
			/>
		</>
	)
}
