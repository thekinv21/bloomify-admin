import { PaginationState } from '@tanstack/react-table'
import { AxiosError } from 'axios'
import { ShieldCheckIcon, UserRoundCogIcon } from 'lucide-react'
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

import { RoleForm } from '../form/RoleForm'
import { useFetchRoles } from '../hooks/useFetchRoles'

import { RoleDataTableColumns } from './RoleDataTableColumns'

export function RoleList() {
	const { t } = useTranslate()

	const [searchTerm, setSearchTerm] = React.useState<string>('')
	const [isAdd, setIsAdd] = React.useState<boolean>(false)

	const [pagination, setPagination] = React.useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10
	})

	const debouncedSearch = useDebounce(searchTerm, 1500)

	const { query } = useFetchRoles({
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

	const { columns, Id, isEdit, setIsEdit } = RoleDataTableColumns()

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
						link: '/admin/role',
						title: 'role',
						icon: <UserRoundCogIcon size={16} />
					}
				]}
			/>
			<DataTable
				columns={columns}
				tableHeading={t('roles_list')}
				query={query}
				pagination={pagination}
				setPagination={setPagination}
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
				setIsOpen={setIsAdd}
			/>

			{isAdd && (
				<CustomModal
					title={t('create_role')}
					isOpen={isAdd}
					setIsOpen={setIsAdd}
				>
					<RoleForm setIsOpen={setIsAdd} type={CrudEnum.CREATE} />
				</CustomModal>
			)}

			{isEdit && Id !== null && (
				<CustomModal
					title={t('edit_role')}
					isOpen={isEdit}
					setIsOpen={setIsEdit}
				>
					<RoleForm setIsOpen={setIsEdit} type={CrudEnum.EDIT} roleId={Id} />
				</CustomModal>
			)}
		</>
	)
}
