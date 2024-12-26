import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { useRefetch, useTranslate } from '@/hooks'

import { keyConstant } from '@/constant'

import { ICreateUserRequest } from '@/types'
import { AlertCustomEnum, AlertEnum } from '@/types/custom.enum'

import { errorCatch, userService } from '@/services'

import { AlertNotification } from '@/components/ui'

type TypeUseCreateUser = {
	setIsOpen?: (v: boolean) => void
}

export const useCreateUser = (props: TypeUseCreateUser) => {
	const { refetchQuery } = useRefetch()

	const { t } = useTranslate()

	const { mutate: createUser, isPending: createPending } = useMutation({
		mutationKey: [keyConstant.create_user],
		mutationFn: (request: ICreateUserRequest) => userService.create(request),
		onSuccess() {
			if (props?.setIsOpen) {
				props.setIsOpen(false)
			}

			AlertNotification({
				icon: AlertEnum.SUCCESS,
				message: t('successfully_donned'),
				customClass: AlertCustomEnum.SUCCESS
			})
			refetchQuery.invalidateQueries({
				queryKey: [keyConstant.get_users]
			})
		},
		onError(error: AxiosError) {
			AlertNotification({
				icon: AlertEnum.WARNING,
				message: errorCatch(error),
				customClass: AlertCustomEnum.WARNING
			})
		}
	})

	return {
		createPending,
		createUser
	}
}
