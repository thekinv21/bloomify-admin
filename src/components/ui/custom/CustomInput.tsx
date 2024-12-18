import clsx from 'clsx'
import { forwardRef, InputHTMLAttributes, ReactNode } from 'react'
import { FieldError } from 'react-hook-form'

import { useTranslate } from '@/hooks'

import { Input } from '../input'
import { Label } from '../label'

export interface IFieldProps {
	label?: string
	placeholder?: string
	error?: FieldError
	className?: string
	iconLeft?: ReactNode
	iconRight?: ReactNode
	iconLeftOnClick?: () => void
	iconRightOnClick?: () => void
}

type TypeInputProps = InputHTMLAttributes<HTMLInputElement> & IFieldProps

export interface ICustomInput extends TypeInputProps {}

const CustomInput = forwardRef<HTMLInputElement, ICustomInput>(
	(
		{
			placeholder,
			label,
			error,
			type = 'text',
			id,
			className,
			iconLeft,
			iconRight,
			iconLeftOnClick,
			iconRightOnClick,
			...props
		},
		ref
	) => {
		const { t } = useTranslate()

		return (
			<div className='space-y-2'>
				{label && (
					<Label
						htmlFor={id}
						className={clsx(
							'text-sm font-normal',
							error ? 'text-destructive' : ''
						)}
					>
						{label}
					</Label>
				)}
				<div className='relative'>
					{iconLeft && (
						<button
							type='button'
							onClick={iconLeftOnClick}
							className={clsx(
								'absolute inset-y-0 start-3 flex items-center',
								error ? 'text-destructive' : 'text-muted-foreground/80',
								iconLeftOnClick ? 'cursor-pointer' : 'pointer-events-none'
							)}
						>
							{iconLeft}
						</button>
					)}

					<Input
						id={id}
						aria-hidden='true'
						className={clsx(
							className,
							iconLeft ? 'ps-10' : '',
							iconRight ? 'pe-10' : '',
							error
								? 'border-destructive text-destructive placeholder:text-destructive focus-visible:border-destructive focus-visible:ring-destructive/20'
								: ''
						)}
						placeholder={placeholder}
						type={type}
						ref={ref}
						{...props}
					/>

					{iconRight && (
						<button
							type='button'
							onClick={iconRightOnClick}
							className={clsx(
								'absolute inset-y-0 end-3 flex items-center',
								error ? 'text-destructive' : 'text-muted-foreground/80',
								iconRightOnClick ? 'cursor-pointer' : 'pointer-events-none'
							)}
						>
							{iconRight}
						</button>
					)}
				</div>

				{error ? (
					<p
						className='mt-2 text-xs text-destructive'
						role='alert'
						aria-live='polite'
					>
						{t(`${error.message}`)}
					</p>
				) : null}
			</div>
		)
	}
)

CustomInput.displayName = 'CustomInput'

export default CustomInput
