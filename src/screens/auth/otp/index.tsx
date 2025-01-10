import { ILoginResponse } from '@/types'

import { CustomModal } from '@/components/ui'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useOtp } from './useOtp'

interface IOtp {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	data: ILoginResponse | null
}

export function OTP(props: IOtp) {
	const {
		otp,
		otpFields,
		inputRefs,
		handleChange,
		handleKeyDown,
		handleSubmit,
		isOtpComplete,
		isPending
	} = useOtp(props)

	return (
		<CustomModal
			isOpen={props.isOpen}
			setIsOpen={props.setIsOpen}
			title='Two-Factor Authentication'
			subTitle='Enter the OTP sent to your email'
		>
			<div className='animate-fade-in w-full'>
				<form className='mt-2'>
					<div className='flex justify-center space-x-3 md:space-x-4'>
						{otpFields.map((idx: number) => (
							<Input
								key={`otp-code-${idx}`}
								type='text'
								id={`otp${idx}`}
								name={`otp${idx}`}
								value={otp[idx]}
								onChange={e => handleChange(e, idx)}
								onKeyDown={event => handleKeyDown(idx, event)}
								maxLength={1}
								className='border-default-300 text-default-900 h-10 w-10 rounded text-center text-2xl font-medium sm:h-16 sm:w-[60px]'
								aria-label={`OTP input ${idx + 1}`}
								ref={ref => (inputRefs.current[idx] = ref)}
							/>
						))}
					</div>
					<div className='mt-8 cursor-pointer'>
						<Button
							loading={isPending}
							type='button'
							className='w-full'
							size='lg'
							onClick={handleSubmit}
							disabled={!isOtpComplete}
						>
							Verify Now
						</Button>
					</div>
				</form>
			</div>
		</CustomModal>
	)
}
