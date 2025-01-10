import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { ChangeEvent, KeyboardEvent, useRef, useState } from 'react'

import { keyConstant } from '@/constant'

import { IOtpRequest } from '@/types'
import { AlertCustomEnum, AlertEnum } from '@/types/custom.enum'

import { authService, errorCatch } from '@/services'

import { AlertNotification } from '@/components/ui'

import { useUserStore } from '@/store/userStore'

type TypeUseOtp = {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	tokenSign: string | null
}

export const useOtp = (props: TypeUseOtp) => {
	const totalOtpField = 6
	const otpArray: string[] = Array.from({ length: totalOtpField }, () => '')
	const [otp, setOtp] = useState<string[]>(otpArray)
	const otpFields = Array.from({ length: totalOtpField }, (_, idx) => idx)

	const inputRefs = useRef<(HTMLInputElement | null)[]>([])

	const { saveUserToStore, removeUserFromStore } = useUserStore()

	const handleKeyDown = (
		idx: number,
		event: KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key === 'Backspace' && otp[idx] === '' && idx > 0) {
			setOtp(prevOtp => {
				const newOtp = [...prevOtp]
				newOtp[idx - 1] = ''
				return newOtp
			})
			inputRefs.current[idx - 1]?.focus()
		} else if (event.key === 'ArrowLeft' && idx > 0) {
			inputRefs.current[idx - 1]?.focus()
		} else if (event.key === 'ArrowRight' && idx < totalOtpField - 1) {
			inputRefs.current[idx + 1]?.focus()
		}
	}

	const handleChange = (e: ChangeEvent<HTMLInputElement>, idx: number) => {
		const { value } = e.target
		if (!isNaN(Number(value)) && value.length <= 1) {
			const newOtp = [...otp]
			newOtp[idx] = value
			setOtp(newOtp)
			if (value.length === 1 && idx < totalOtpField - 1) {
				inputRefs.current[idx + 1]?.focus()
			}
		}
	}

	const isOtpComplete = otp.every((digit: string) => digit !== '')

	const { mutate, isPending } = useMutation({
		mutationKey: [keyConstant.verify_otp],
		mutationFn: async (data: IOtpRequest) => authService.verifyOtp(data),
		async onSuccess({ data }) {
			await saveUserToStore(data)
			await props.setIsOpen(!props.isOpen)
		},
		onError(error: AxiosError) {
			removeUserFromStore()
			AlertNotification({
				icon: AlertEnum.WARNING,
				message: errorCatch(error),
				customClass: AlertCustomEnum.WARNING
			})
		}
	})

	const handleSubmit = () => {
		const enteredOtp = otp.join('')

		setOtp(otpArray)
		inputRefs.current[0]?.focus()

		mutate({
			otpCode: enteredOtp,
			tokenSign: props.tokenSign as string
		})
	}

	return {
		otp,
		otpFields,
		inputRefs,
		handleChange,
		handleKeyDown,
		handleSubmit,
		isOtpComplete,
		isPending
	}
}
