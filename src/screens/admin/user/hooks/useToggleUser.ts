import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { t } from 'i18next'

import { useRefetch } from '@/hooks'

import { keyConstant } from '@/constant'

import { AlertCustomEnum, AlertEnum } from '@/types/custom.enum'

import { errorCatch, userService } from '@/services'

import { AlertNotification } from '@/components/ui'

export const useToggleUser = () => {
	const { refetchQuery } = useRefetch()

	const { mutate: toggleUser } = useMutation({
		mutationKey: [keyConstant.toggle_user],
		mutationFn: (id: string) => userService.toggle(id),
		onSuccess: () => {
			AlertNotification({
				icon: AlertEnum.SUCCESS,
				message: t('successfully_donned'),
				customClass: AlertCustomEnum.SUCCESS
			})
			refetchQuery.invalidateQueries({
				queryKey: [keyConstant.get_users]
			})
		},
		onError: (error: AxiosError) => {
			AlertNotification({
				icon: AlertEnum.WARNING,
				message: errorCatch(error),
				customClass: AlertCustomEnum.WARNING
			})
		}
	})

	return {
		toggleUser
	}
}
