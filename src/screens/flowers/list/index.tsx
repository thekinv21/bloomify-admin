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

export function FlowerList() {
	const { t } = useTranslate()

	const [searchTerm, setSearchTerm] = useState<string>('')
	const [isAdd, setIsAdd] = useState<boolean>(false)

	console.log('FlowerList', isAdd)

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

			<div className={styles.page_content}>
				{isGridView ? (
					<FlowerCardMapper
						flowers={query.data?.content as IFlower[]}
						setIsGridView={setIsGridView}
					/>
				) : (
					<DataTable
						columns={columns}
						tableHeading={t('flowers_list')}
						query={query}
						pagination={pagination}
						setPagination={setPagination}
						searchTerm={searchTerm}
						setSearchTerm={setSearchTerm}
						setIsOpen={setIsAdd}
					/>
				)}
			</div>
		</>
	)
}
