import { flexRender, Table } from '@tanstack/react-table'
import { t } from 'i18next'
import { Database } from 'lucide-react'

import styles from './DataTable.module.scss'
import { cn } from '@/utils/utils'

interface IDataTableContent<TData> {
	customTable: Table<TData>
	isFetching: boolean
}

export function DataTableContent<TData>(props: IDataTableContent<TData>) {
	return (
		<div
			className={cn(
				styles.custom_table_content,
				`lg:${props.customTable.getRowModel().rows.length > 10 ? 'h-[calc(79dvh-8rem)]' : 'h-auto'} h-auto md:h-auto`
			)}
		>
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
						{Array.isArray(props.customTable.getRowModel().rows) &&
						props.customTable.getRowModel().rows.length ? (
							props.customTable.getRowModel().rows.map(row => (
								<tr key={row.id}>
									{row.getVisibleCells().map(cell => (
										<td key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</td>
									))}
								</tr>
							))
						) : (
							<tr>
								<td
									className={styles.empty_data_container}
									colSpan={props.customTable.getAllColumns().length}
								>
									<div className={styles.empty_data}>
										<Database size={24} />
										{t('data_empty')}
									</div>
								</td>
							</tr>
						)}
					</tbody>
				)}
			</table>
		</div>
	)
}
