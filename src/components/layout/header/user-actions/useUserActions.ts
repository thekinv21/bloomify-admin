import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { useCookie, useTranslate } from '@/hooks'

import { keyConstant } from '@/constant'

import { AlertCustomEnum, AlertEnum } from '@/types/custom.enum'

import { authService, errorCatch } from '@/services'

import { Alert, AlertNotification } from '@/components/ui'

import { useUserStore } from '@/store/userStore'

export const useUserActions = () => {
	const { removeUserFromStore } = useUserStore()
	const { user } = useCookie()

	const { t } = useTranslate()

	const { mutate: logout } = useMutation({
		mutationKey: [keyConstant.logout],
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			removeUserFromStore()
		},
		onError: (error: AxiosError) => {
			AlertNotification({
				icon: AlertEnum.WARNING,
				message: errorCatch(error),
				customClass: AlertCustomEnum.WARNING
			})
		}
	})

	function handleLogout() {
		Alert({
			action: async () => {
				return logout()
			}
		})
	}

	return {
		t,
		user,
		handleLogout
	}
}
