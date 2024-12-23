import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useTranslate } from '@/hooks'

import { CrudEnum } from '@/types/custom.enum'

import { useRoleForSelect } from '../../role/hooks/useRoleForSelect'

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
		resolver: zodResolver(userSchema),
		mode: 'onChange',
		defaultValues: {
			isActive: true
		}
	})

	const { query: roleSelectQuery } = useRoleForSelect()

	console.log('item', roleSelectQuery?.data)

	const onSubmit: SubmitHandler<z.infer<typeof userSchema>> = data => {
		console.log(data)
		console.log(props)
	}

	return {
		t,
		formMethod,
		onSubmit,
		isShow,
		handleToggle,
		roleSelectQuery
	}
}
