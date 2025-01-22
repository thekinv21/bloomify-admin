import { PaginationState } from '@tanstack/react-table'
import { AxiosError } from 'axios'
import { FlowerIcon } from 'lucide-react'
import React from 'react'

import { useDebounce, useTranslate } from '@/hooks'

import { AlertCustomEnum, AlertEnum } from '@/types/custom.enum'

import { errorCatch } from '@/services'

import { AlertNotification, BreadCrumb, DataTable } from '@/components/ui'

import { useFetchFlowers } from '../hooks/useFetchFlowers'

import { FlowerDataTableColumns } from './FlowerDataTableColumns'

export function FlowerList() {
	const { t } = useTranslate()

	const { columns } = FlowerDataTableColumns()

	const [searchTerm, setSearchTerm] = React.useState<string>('')

	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10
	})

	const debouncedSearch = useDebounce(searchTerm, 1500)

	const { query } = useFetchFlowers({
		page: pagination.pageIndex,
		size: pagination.pageSize,
		searchTerm: debouncedSearch.trim() !== '' ? debouncedSearch : undefined
	})

	React.useEffect(() => {
		if (query.isError) {
			return AlertNotification({
				icon: AlertEnum.WARNING,
				message: errorCatch(query.error as AxiosError),
				customClass: AlertCustomEnum.WARNING
			})
		}
	}, [query.isError])

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

			<DataTable
				columns={columns}
				tableHeading={t('flowers_list')}
				query={query}
				pagination={pagination}
				setPagination={setPagination}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
			/>
		</>
	)
}
