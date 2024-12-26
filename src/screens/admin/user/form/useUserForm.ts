import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useTranslate } from '@/hooks'

import { CrudEnum } from '@/types/custom.enum'
import { IOption } from '@/types/custom.types'

import { useRoleForSelect } from '../../role/hooks/useRoleForSelect'
import { useCreateUser } from '../hooks/useCreateUser'
import { useEditUser } from '../hooks/useEditUser'
import { useFetchUser } from '../hooks/useFetchUser'

import { userSchema } from './userSchema'

type TypeUseUserForm = {
	setIsOpen: (v: boolean) => void
	type: CrudEnum.CREATE | CrudEnum.EDIT
	userId?: string | null
}

export const useUserForm = (props: TypeUseUserForm) => {
	const { t } = useTranslate()

	const [isShow, setIsShow] = useState<boolean>(false)

	const handleToggle = () => {
		setIsShow(!isShow)
	}

	const formMethod = useForm<z.infer<typeof userSchema>>({
		mode: 'onChange',
		defaultValues: {
			isActive: true
		},
		resolver: zodResolver(userSchema)
	})

	const { createPending, createUser } = useCreateUser(props)
	const { query: roleSelectQuery } = useRoleForSelect()

	const { editPending, editUser } = useEditUser({
		setIsOpen: props.setIsOpen
	})

	const { query: userQuery } = useFetchUser({
		userId: props.userId as string
	})

	useEffect(() => {
		if (props.userId && userQuery?.data && !Array.isArray(userQuery.data)) {
			const { firstName, lastName, username, email, isActive, roles } =
				userQuery.data

			const mappedRoles = roles.flatMap((roleName: string) =>
				(roleSelectQuery.data as IOption<number>[])
					.filter((role: IOption<number>) => role.label === roleName)
					.map((matchedRole: IOption<number>) => String(matchedRole.value))
			)

			formMethod.reset({
				firstName,
				lastName,
				username,
				email,
				isActive,
				roles: mappedRoles
			})
		}
	}, [
		props.userId,
		userQuery?.data,
		userQuery.isFetched,
		userQuery.isLoading,
		userQuery.isFetching,
		formMethod,
		roleSelectQuery.data
	])

	const onSubmit: SubmitHandler<z.infer<typeof userSchema>> = data => {
		const selectedRoleLabels: string[] = data?.roles.flatMap(
			(selectedRoleValue: string) =>
				(roleSelectQuery.data as IOption<number>[])
					.filter(
						(availableRole: IOption<number>) =>
							String(availableRole.value) === selectedRoleValue
					)
					.map((matchedRole: IOption<number>) => matchedRole.label)
		)

		if (props.type === CrudEnum.CREATE) {
			createUser({
				...data,
				password: data.password as string,
				roles: selectedRoleLabels
			})
		} else {
			editUser({
				...data,
				roles: selectedRoleLabels,
				id: props.userId as string
			})
		}
	}

	return {
		t,
		formMethod,
		onSubmit,
		isShow,
		handleToggle,
		roleSelectQuery,
		createPending,
		editPending
	}
}
