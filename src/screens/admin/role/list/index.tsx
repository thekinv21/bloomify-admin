import { PaginationState } from '@tanstack/react-table'
import { AxiosError } from 'axios'
import React, { useEffect } from 'react'

import { useDebounce, useTranslate } from '@/hooks'

import { AlertCustomEnum, AlertEnum } from '@/types/custom.enum'

import { errorCatch } from '@/services'

import { AlertNotification, DataTable } from '@/components/ui'

import { useFetchRoles } from '../hooks/useFetchRoles'

import { RoleDataTableColumns } from './RoleDataTableColumns'

export function RoleList() {
	const { t } = useTranslate()

	const [searchTerm, setSearchTerm] = React.useState<string>('')

	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10
	})

	const debouncedSearch = useDebounce(searchTerm, 1500)

	const { query } = useFetchRoles({
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

	const columns = RoleDataTableColumns()

	return (
		<DataTable
			columns={columns}
			tableHeading={t('roles_list')}
			query={query}
			pagination={pagination}
			setPagination={setPagination}
			searchTerm={searchTerm}
			setSearchTerm={setSearchTerm}
		/>
	)
}
