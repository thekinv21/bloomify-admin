import { PaginationState } from '@tanstack/react-table'
import { AxiosError } from 'axios'
import { ShieldCheckIcon, UserIcon } from 'lucide-react'
import React, { useEffect } from 'react'

import { useDebounce, useTranslate } from '@/hooks'

import { AlertCustomEnum, AlertEnum, CrudEnum } from '@/types/custom.enum'

import { errorCatch } from '@/services'

import {
	AlertNotification,
	BreadCrumb,
	CustomModal,
	DataTable
} from '@/components/ui'
import { DataTableHeading } from '@/components/ui/dataTable/DataTableHeading'

import { UserForm } from '../form/UserForm'
import { useFetchUsers } from '../hooks/useFetchUsers'

import { UserDataTableColumns } from './UserDataTableColumns'

export function UserList() {
	const { t } = useTranslate()

	const [searchTerm, setSearchTerm] = React.useState<string>('')

	const [isAdd, setIsAdd] = React.useState<boolean>(false)

	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10
	})

	const debouncedSearch = useDebounce(searchTerm, 1500)

	const { query } = useFetchUsers({
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

	const { columns, isEdit, setIsEdit, userId } = UserDataTableColumns()

	return (
		<>
			<BreadCrumb
				linksArray={[
					{
						link: '#',
						title: 'admin',
						icon: <ShieldCheckIcon size={16} />
					},
					{
						link: '/admin/user',
						title: 'user',
						icon: <UserIcon size={16} />
					}
				]}
			/>

			<div className='panel'>
				<DataTableHeading
					heading={t('users_list')}
					searchTerm={searchTerm}
					setSearchTerm={setSearchTerm}
					setIsOpen={setIsAdd}
				/>

				<DataTable
					columns={columns}
					query={query}
					pagination={pagination}
					setPagination={setPagination}
				/>
			</div>

			{isAdd && (
				<CustomModal
					title={t('create_user')}
					size='lg'
					isOpen={isAdd}
					setIsOpen={setIsAdd}
				>
					<UserForm setIsOpen={setIsAdd} type={CrudEnum.CREATE} />
				</CustomModal>
			)}

			{isEdit && (
				<CustomModal
					title={t('edit_user')}
					size='lg'
					isOpen={isEdit}
					setIsOpen={setIsEdit}
				>
					<UserForm
						setIsOpen={setIsEdit}
						type={CrudEnum.EDIT}
						userId={userId}
					/>
				</CustomModal>
			)}
		</>
	)
}
