import clsx from 'clsx'
import { forwardRef, InputHTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

import { Input } from '../input'
import { Label } from '../label'

export interface IFieldProps {
	label?: string
	placeholder?: string
	error?: FieldError
	className?: string
}

type TypeInputProps = InputHTMLAttributes<HTMLInputElement> & IFieldProps

export interface ICustomInput extends TypeInputProps {}

const CustomInput = forwardRef<HTMLInputElement, ICustomInput>(
	(
		{ placeholder, label, error, type = 'text', id, className, ...props },
		ref
	) => {
		return (
			<div className='space-y-2'>
				{label && <Label htmlFor={id}>{label}</Label>}
				<Input
					id={id}
					className={clsx(
						className,
						error
							? 'border-destructive/80 text-destructive focus-visible:border-destructive/80 focus-visible:ring-destructive/20'
							: ''
					)}
					placeholder={placeholder}
					type={type}
					ref={ref}
					{...props}
				/>

				{error ? (
					<p
						className='mt-2 text-xs text-destructive'
						role='alert'
						aria-live='polite'
					>
						{error.message}
					</p>
				) : null}
			</div>
		)
	}
)

CustomInput.displayName = 'CustomInput'

export default CustomInput
