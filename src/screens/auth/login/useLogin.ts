import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { keyConstant } from '@/constant'

import { ILoginRequest, ILoginResponse } from '@/types'
import { AlertCustomEnum, AlertEnum } from '@/types/custom.enum'

import { authService, errorCatch } from '@/services'

import { AlertNotification } from '@/components/ui'

import { useUserStore } from '@/store/userStore'

import { loginSchema } from './loginSchema'

export const useLogin = () => {
	const [isShow, setIsShow] = useState<boolean>(false)
	const [isOpenOtpModal, setIsOpenOtpModal] = useState<boolean>(false)
	const [data, setData] = useState<ILoginResponse | null>(null)

	const formMethod = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		mode: 'onChange',
		defaultValues: {
			password: '',
			username: ''
		}
	})

	const { saveUserToStore } = useUserStore()

	const { mutate: LOGIN, isPending: loginPending } = useMutation({
		mutationKey: [keyConstant.login],
		mutationFn: async (data: ILoginRequest) => authService.login(data),
		async onSuccess({ data }) {
			if (data.otpIsRequired) {
				await setIsOpenOtpModal(true)
				await setData(data)
			} else {
				await saveUserToStore(data)
			}
		},
		onError(error: AxiosError) {
			formMethod.resetField('password')
			AlertNotification({
				icon: AlertEnum.WARNING,
				message: errorCatch(error),
				customClass: AlertCustomEnum.WARNING
			})
			setIsOpenOtpModal(false)
			setData(null)
		}
	})

	const onSubmit = async (data: z.infer<typeof loginSchema>) => {
		LOGIN(data)
	}

	const handleToggle = () => {
		setIsShow(!isShow)
	}

	return {
		formMethod,
		onSubmit,
		loginPending,
		handleToggle,
		isShow,
		isOpenOtpModal,
		setIsOpenOtpModal,
		data
	}
}
