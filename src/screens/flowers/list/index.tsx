import { PaginationState } from '@tanstack/react-table'
import { AxiosError } from 'axios'
import { FlowerIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { useDebounce, useTranslate } from '@/hooks'

import { IFlower } from '@/types'
import { AlertCustomEnum, AlertEnum } from '@/types/custom.enum'

import { errorCatch } from '@/services'

import { AlertNotification, BreadCrumb, DataTable } from '@/components/ui'

import { useFetchFlowers } from '../hooks/useFetchFlowers'

import styles from './Flower.module.scss'
import { FlowerCardMapper } from './FlowerCardMapper'
import { FlowerDataTableColumns } from './FlowerDataTableColumns'
import { FlowerHeader } from './FlowerHeader'
import { cn } from '@/utils/utils'

export function FlowerList() {
	const { t } = useTranslate()

	const [searchTerm, setSearchTerm] = useState<string>('')

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10
	})

	const debouncedSearch = useDebounce(searchTerm, 1500)

	const { query } = useFetchFlowers({
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

	const [isGridView, setIsGridView] = useState<boolean>(true)
	const { columns } = FlowerDataTableColumns()

	return (
		<div>
			<BreadCrumb
				linksArray={[
					{
						link: '#',
						title: 'flowers',
						icon: <FlowerIcon size={16} />
					}
				]}
			/>

			<div className={cn('panel', styles.page_content)}>
				<FlowerHeader
					heading={t('flowers_list')}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					setIsGridView={setIsGridView}
				/>

				{isGridView ? (
					<FlowerCardMapper
						flowers={query.data?.content as IFlower[]}
						isLoading={query.isLoading || query.isFetching}
					/>
				) : (
					<>
						<DataTable
							columns={columns}
							query={query}
							pagination={pagination}
							setPagination={setPagination}
						/>
					</>
				)}
			</div>
		</div>
	)
}
