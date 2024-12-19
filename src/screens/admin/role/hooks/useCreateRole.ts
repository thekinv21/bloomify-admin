import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { useRefetch, useTranslate } from '@/hooks'

import { keyConstant } from '@/constant'

import { ICreateRoleRequest } from '@/types'
import { AlertCustomEnum, AlertEnum } from '@/types/custom.enum'

import { errorCatch, roleService } from '@/services'

import { AlertNotification } from '@/components/ui'

type TypeUseCreateRole = {
	setIsOpen?: (v: boolean) => void
}

export const useCreateRole = (props: TypeUseCreateRole) => {
	const { refetchQuery } = useRefetch()

	const { t } = useTranslate()

	const { mutate: createRole, isPending: createPending } = useMutation({
		mutationKey: [keyConstant.create_role],
		mutationFn: (request: ICreateRoleRequest) => roleService.create(request),
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
				queryKey: [keyConstant.get_roles]
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
		createRole
	}
}
