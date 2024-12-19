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
import { DataTableHeading } from './DataTableHeading'

interface IDataTable<TData> {
	columns: ColumnDef<TData>[]
	tableHeading: string
	query: UseQueryResult<ICustomResponse<TData[]>, Error>
	pagination: PaginationState
	setPagination: OnChangeFn<PaginationState>
	searchTerm: string
	setSearchTerm: (v: string) => void
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
			<DataTableHeading
				heading={props.tableHeading}
				searchTerm={props.searchTerm}
				setSearchTerm={props.setSearchTerm}
			/>
			<DataTableContent
				customTable={customTable}
				isFetching={props.query.isFetching}
			/>
			<DataTableFooter customTable={customTable} query={props.query} />
		</aside>
	)
}
