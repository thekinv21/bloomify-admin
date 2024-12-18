import { flexRender, Table } from '@tanstack/react-table'
import { t } from 'i18next'

import styles from './DataTable.module.scss'

interface IDataTableContent<TData> {
	customTable: Table<TData>
	totalPages: number
	totalElements: number
	isLoading: boolean
	isFetching: boolean
}

export function DataTableContent<TData>(props: IDataTableContent<TData>) {
	return (
		<div className={styles.custom_table_content}>
			<table className={styles.custom_table}>
				<thead>
					{props.customTable.getHeaderGroups().map(item => (
						<tr key={item.id}>
							{item.headers.map(header => (
								<th key={header.id} colSpan={header.colSpan}>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
								</th>
							))}
						</tr>
					))}
				</thead>

				{props.isFetching ? (
					<tbody className='background-blur-sm'>
						<tr>
							<td colSpan={props.customTable.getAllColumns().length}>
								<div className={styles.loader_container}>
									<div className={styles.loader} />
									<p>{t('loading_data')}</p>
								</div>
							</td>
						</tr>
					</tbody>
				) : (
					<tbody>
						{props.customTable.getRowModel().rows.map(row => (
							<tr key={row.id} className=''>
								{row.getVisibleCells().map(cell => (
									<td key={cell.id}>
										{flexRender(cell.column.columnDef.cell, cell.getContext())}
									</td>
								))}
							</tr>
						))}
					</tbody>
				)}
			</table>
		</div>
	)
}
