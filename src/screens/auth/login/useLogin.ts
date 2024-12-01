import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useRoute } from '@/hooks'

import { keyConstant, pathConstant } from '@/constant'

import { ILoginRequest } from '@/types'

import { authService } from '@/services'

import { useUserStore } from '@/store/userStore'

import { loginSchema } from './loginSchema'

export const useLogin = () => {
	const [isSubmit, setIsSubmit] = useState<boolean>(false)
	const [isShow, setIsShow] = useState<boolean>(false)

	const { route } = useRoute()

	const formMethod = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		mode: 'onChange',
		defaultValues: {
			password: '',
			username: ''
		}
	})

	const { saveUserToStore, removeUserFromStore } = useUserStore()

	const { mutate: LOGIN } = useMutation({
		mutationKey: [keyConstant.login],
		mutationFn: (data: ILoginRequest) => authService.login(data),
		onSuccess({ data }) {
			setIsSubmit(false)
			saveUserToStore(data)
			formMethod.reset()
			route(pathConstant.home)
		},
		onError(error) {
			console.log(error)
			setIsSubmit(false)
			removeUserFromStore()
			formMethod.resetField('password')
		}
	})

	const onSubmit = async (data: z.infer<typeof loginSchema>) => {
		await setIsSubmit(!isSubmit)
		LOGIN(data)
	}

	const handleToggle = () => {
		setIsShow(!isShow)
	}

	return {
		formMethod,
		onSubmit,
		isSubmit,
		handleToggle,
		isShow
	}
}
