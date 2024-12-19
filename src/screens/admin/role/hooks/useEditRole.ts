import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { useRefetch, useTranslate } from '@/hooks'

import { keyConstant } from '@/constant'

import { IUpdateRoleRequest } from '@/types'
import { AlertCustomEnum, AlertEnum } from '@/types/custom.enum'

import { errorCatch, roleService } from '@/services'

import { AlertNotification } from '@/components/ui'

type TypeUseEditRole = {
	setIsOpen?: (v: boolean) => void
}

export const useEditRole = (props: TypeUseEditRole) => {
	const { refetchQuery } = useRefetch()

	const { t } = useTranslate()

	const { mutate: editRole, isPending: editPending } = useMutation({
		mutationKey: [keyConstant.edit_role],
		mutationFn: (request: IUpdateRoleRequest) => roleService.update(request),
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
		editPending,
		editRole
	}
}
