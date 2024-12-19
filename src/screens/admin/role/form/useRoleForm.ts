import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useTranslate } from '@/hooks'

import { CrudEnum } from '@/types/custom.enum'

import { useCreateRole } from '../hooks/useCreateRole'
import { useEditRole } from '../hooks/useEditRole'
import { useFetchRole } from '../hooks/useFetchRole'

import { roleSchema } from './roleSchema'

type TypeUseRoleForm = {
	setIsOpen: (v: boolean) => void
	type: CrudEnum.CREATE | CrudEnum.EDIT
	roleId?: number | null
}

export const useRoleForm = (props: TypeUseRoleForm) => {
	const { t } = useTranslate()

	const formMethod = useForm<z.infer<typeof roleSchema>>({
		resolver: zodResolver(roleSchema),
		mode: 'onChange',
		defaultValues: {
			isActive: true
		}
	})

	const { createPending, createRole } = useCreateRole({
		setIsOpen: props.setIsOpen
	})

	const { editPending, editRole } = useEditRole({
		setIsOpen: props.setIsOpen
	})

	const { query: roleQuery } = useFetchRole({
		roleId: props.roleId as number
	})

	useEffect(() => {
		if (props.roleId && roleQuery?.data) {
			if (!Array.isArray(roleQuery.data)) {
				formMethod.reset({
					name: roleQuery.data.name,
					isActive: roleQuery.data.isActive
				})
			}
		}
	}, [])

	useEffect(() => {
		if (props.roleId && roleQuery?.data) {
			if (!Array.isArray(roleQuery.data)) {
				formMethod.reset({
					name: roleQuery.data.name,
					isActive: roleQuery.data.isActive
				})
			}
		}
	}, [
		roleQuery.isFetched,
		roleQuery.isLoading,
		roleQuery.isFetching,
		props.roleId
	])

	const onSubmit: SubmitHandler<z.infer<typeof roleSchema>> = data => {
		if (props.type === CrudEnum.CREATE) {
			createRole({
				name: data.name?.toLocaleUpperCase(),
				isActive: data.isActive
			})
		} else {
			editRole({
				name: data.name?.toLocaleUpperCase(),
				isActive: data.isActive,
				id: props.roleId as number
			})
		}
	}

	return {
		t,
		formMethod,
		onSubmit,
		createPending,
		editPending
	}
}
