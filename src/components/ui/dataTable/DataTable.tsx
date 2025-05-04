import { UseQueryResult } from '@tanstack/react-query'
import {
	ColumnDef,
	getCoreRowModel,
	OnChangeFn,
	PaginationState,
	useReactTable
} from '@tanstack/react-table'
import React from 'react'

import { ICustomResponse } from '@/types'

import styles from './DataTable.module.scss'
import { DataTableContent } from './DataTableContent'
import { DataTableFooter } from './DataTableFooter'

interface IDataTable<TData> {
	columns: ColumnDef<TData>[]
	query: UseQueryResult<ICustomResponse<TData[]>, Error>
	pagination: PaginationState
	setPagination: OnChangeFn<PaginationState>
	searchTerm: string
	setSearchTerm: (v: string) => void
	tableHeading: string
	setIsOpen?: (v: boolean) => void
	navigateTo?: string
}

export function DataTable<TData>({ columns, ...props }: IDataTable<TData>) {
	const defaultData = React.useMemo(() => [], [])

	const response = props.query?.data

	const customTable = useReactTable({
		data: (response?.content as TData[]) || defaultData,
		columns,
		state: {
			pagination: props.pagination
		},
		pageCount: response?.totalPages || 0,
		onPaginationChange: props.setPagination,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true
	})

	return (
		<aside className={styles.panel}>
			{/* <DataTableHeading
				heading={props.tableHeading}
				searchTerm={props.searchTerm}
				setSearchTerm={props.setSearchTerm}
				setIsOpen={props.setIsOpen as (v: boolean) => void}
				navigateTo={props.navigateTo}
			/> */}
			<DataTableContent
				customTable={customTable}
				isFetching={props.query.isFetching}
			/>
			<DataTableFooter customTable={customTable} query={props.query} />
		</aside>
	)
}
