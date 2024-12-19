import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useTranslate } from '@/hooks'

import { CrudEnum } from '@/types/custom.enum'

import { userSchema } from './userSchema'

type TypeUseUserForm = {
	setIsOpen: (v: boolean) => void
	type: CrudEnum.CREATE | CrudEnum.EDIT
	userId?: string | null
}

export const useUserForm = (props: TypeUseUserForm) => {
	const { t } = useTranslate()

	const formMethod = useForm<z.infer<typeof userSchema>>({
		resolver: zodResolver(userSchema),
		mode: 'onChange',
		defaultValues: {
			isActive: true
		}
	})

	const onSubmit: SubmitHandler<z.infer<typeof userSchema>> = data => {
		console.log(data)
		console.log(props)
	}

	return {
		t,
		formMethod,
		onSubmit
	}
}
