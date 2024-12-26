import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { useRefetch, useTranslate } from '@/hooks'

import { keyConstant } from '@/constant'

import { IUpdateUserRequest } from '@/types'
import { AlertCustomEnum, AlertEnum } from '@/types/custom.enum'

import { errorCatch, userService } from '@/services'

import { AlertNotification } from '@/components/ui'

type TypeUseEditUser = {
	setIsOpen?: (v: boolean) => void
}

export const useEditUser = (props: TypeUseEditUser) => {
	const { refetchQuery } = useRefetch()

	const { t } = useTranslate()

	const { mutate: editUser, isPending: editPending } = useMutation({
		mutationKey: [keyConstant.edit_user],
		mutationFn: (request: IUpdateUserRequest) => userService.update(request),
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
		editPending,
		editUser
	}
}
