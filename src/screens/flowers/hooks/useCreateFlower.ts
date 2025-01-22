import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { useRefetch, useTranslate } from '@/hooks'

import { keyConstant } from '@/constant'

import { ICreateFlower } from '@/types'
import { AlertCustomEnum, AlertEnum } from '@/types/custom.enum'

import { errorCatch, flowerService } from '@/services'

import { AlertNotification } from '@/components/ui'

export const useCreateFlower = () => {
	const { refetchQuery } = useRefetch()

	const { t } = useTranslate()

	const { mutate: createFlower, isPending: createPending } = useMutation({
		mutationKey: [keyConstant.create_flower],
		mutationFn: (request: ICreateFlower) => flowerService.create(request),
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
		createPending,
		createFlower
	}
}
