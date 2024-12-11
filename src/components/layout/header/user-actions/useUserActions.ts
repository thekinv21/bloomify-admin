import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { useTranslate } from '@/hooks'

import { keyConstant } from '@/constant'

import { AlertCustomEnum, AlertEnum } from '@/types/custom.enum'

import { authService, errorCatch } from '@/services'

import { Alert, AlertNotification } from '@/components/ui'

import { useUserStore } from '@/store/userStore'

export const useUserActions = () => {
	const { accessToken, removeUserFromStore, user } = useUserStore()

	const { t } = useTranslate()

	const { mutate: logout } = useMutation({
		mutationKey: [keyConstant.logout],
		mutationFn: (token: string) =>
			authService.logout({
				token
			}),
		onSuccess: () => {
			removeUserFromStore()
		},
		onError: (error: AxiosError) => {
			AlertNotification({
				icon: AlertEnum.ERROR,
				message: errorCatch(error),
				customClass: AlertCustomEnum.ERROR
			})
		}
	})

	function handleLogout() {
		Alert({
			action: async () => {
				return logout(accessToken as string)
			}
		})
	}

	return {
		t,
		user,
		handleLogout
	}
}
