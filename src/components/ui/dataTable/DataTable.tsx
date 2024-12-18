import {
	ColumnDef,
	getCoreRowModel,
	OnChangeFn,
	PaginationState,
	useReactTable
} from '@tanstack/react-table'
import React from 'react'

import styles from './DataTable.module.scss'
import { DataTableContent } from './DataTableContent'
import { DataTableFooter } from './DataTableFooter'
import { DataTableHeading } from './DataTableHeading'

interface IDataTable<TData> {
	columns: ColumnDef<TData>[]
	tableHeading: string
	data: TData[]
	totalPages: number
	totalElements: number
	isFetching: boolean
	isLoading: boolean
	pagination: PaginationState
	setPagination: OnChangeFn<PaginationState>
	searchTerm: string
	setSearchTerm: (v: string) => void
}

export function DataTable<TData>({ columns, ...props }: IDataTable<TData>) {
	const defaultData = React.useMemo(() => [], [])

	const customTable = useReactTable({
		data: props.data || defaultData,
		columns,
		state: {
			pagination: props.pagination
		},
		pageCount: props.totalPages || 0,
		onPaginationChange: props.setPagination,
		getCoreRowModel: getCoreRowModel(),
		manualPagination: true
	})

	return (
		<aside className={styles.panel}>
			<DataTableHeading
				heading={props.tableHeading}
				searchTerm={props.searchTerm}
				setSearchTerm={props.setSearchTerm}
			/>

			<DataTableContent
				customTable={customTable}
				totalPages={props.totalPages}
				totalElements={props.totalElements}
				isFetching={props.isFetching}
				isLoading={props.isLoading}
			/>

			<DataTableFooter
				customTable={customTable}
				totalPages={props.totalPages}
				totalElements={props.totalElements}
				isFetching={props.isFetching}
				isLoading={props.isLoading}
			/>
		</aside>
	)
}
