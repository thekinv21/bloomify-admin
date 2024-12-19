import { Plus, Search } from 'lucide-react'

import { useTranslate } from '@/hooks'

import { Button } from '../button'
import CustomInput from '../custom/CustomInput'

import styles from './DataTable.module.scss'

interface IDataTableHeading {
	searchTerm: string
	setSearchTerm: (v: string) => void
	heading: string
	navigateTo?: string
	setIsOpen?: (v: boolean) => void
}

export function DataTableHeading(props: IDataTableHeading) {
	const { t } = useTranslate()

	return (
		<div className={styles.custom_table_heading}>
			<h1 className={styles.heading}>{props.heading}</h1>
			<div className={styles.block_container}>
				<div className={styles.input_container}>
					<CustomInput
						type='text'
						placeholder={t('search')}
						value={props.searchTerm}
						onChange={e => props.setSearchTerm(e.target.value)}
						iconLeft={<Search size={20} />}
					/>
				</div>

				{props.setIsOpen && (
					<Button
						size='icon'
						leftSection={<Plus size={16} />}
						className='w-full text-xs font-semibold uppercase sm:w-24 sm:pr-3'
						onClick={() => props.setIsOpen?.(true)}
					>
						{t('add')}
					</Button>
				)}
			</div>
		</div>
	)
}
