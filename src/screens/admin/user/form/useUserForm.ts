import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useTranslate } from '@/hooks'

import { CrudEnum } from '@/types/custom.enum'
import { IOption } from '@/types/custom.types'

import { useRoleForSelect } from '../../role/hooks/useRoleForSelect'
import { useCreateUser } from '../hooks/useCreateUser'

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

	const onSubmit: SubmitHandler<z.infer<typeof userSchema>> = data => {
		const roles: string[] = (roleSelectQuery.data as IOption<number>[])
			.filter((role: IOption<number>) =>
				data.roles.some((roleName: string) => roleName === role.label)
			)
			.map((role: IOption<number>) => role.label)

		createUser({
			...data,
			roles: roles
		})
	}

	return {
		t,
		formMethod,
		onSubmit,
		isShow,
		handleToggle,
		roleSelectQuery,
		createPending
	}
}
