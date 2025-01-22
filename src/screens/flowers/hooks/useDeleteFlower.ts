import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { t } from 'i18next'

import { useRefetch } from '@/hooks'

import { keyConstant } from '@/constant'

import { AlertCustomEnum, AlertEnum } from '@/types/custom.enum'

import { errorCatch, flowerService } from '@/services'

import { AlertNotification } from '@/components/ui'

export const useDeleteFlower = () => {
	const { refetchQuery } = useRefetch()

	const { mutate: deleteFlower } = useMutation({
		mutationKey: [keyConstant.delete_flower],
		mutationFn: (id: number) => flowerService.delete(id),
		onSuccess: () => {
			AlertNotification({
				icon: AlertEnum.SUCCESS,
				message: t('successfully_donned'),
				customClass: AlertCustomEnum.SUCCESS
			})
			refetchQuery.invalidateQueries({
				queryKey: [keyConstant.get_flowers]
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
		deleteFlower
	}
}
