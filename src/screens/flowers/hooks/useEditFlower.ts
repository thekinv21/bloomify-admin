import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { useRefetch, useTranslate } from '@/hooks'

import { keyConstant } from '@/constant'

import { IUpdateFlower } from '@/types'
import { AlertCustomEnum, AlertEnum } from '@/types/custom.enum'

import { errorCatch, flowerService } from '@/services'

import { AlertNotification } from '@/components/ui'

export const useEditFlower = () => {
	const { refetchQuery } = useRefetch()

	const { t } = useTranslate()

	const { mutate: editFlower, isPending: editPending } = useMutation({
		mutationKey: [keyConstant.edit_flower],
		mutationFn: (request: IUpdateFlower) => flowerService.update(request),
		onSuccess() {
			AlertNotification({
				icon: AlertEnum.SUCCESS,
				message: t('successfully_donned'),
				customClass: AlertCustomEnum.SUCCESS
			})
			refetchQuery.invalidateQueries({
				queryKey: [keyConstant.get_flowers]
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
		editFlower
	}
}
