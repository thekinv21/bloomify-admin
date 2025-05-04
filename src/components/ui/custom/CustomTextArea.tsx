import clsx from 'clsx'
import { forwardRef, InputHTMLAttributes, useId } from 'react'
import { FieldError } from 'react-hook-form'

import { Label } from '../label'

import i18n from '@/i18n'

export interface ITextAreaProps {
	id?: string
	label?: string
	placeholder?: string
	error?: FieldError
	className?: string
	rows?: number
}

type TypeInputProps = InputHTMLAttributes<HTMLTextAreaElement> & ITextAreaProps

const CustomTextArea = forwardRef<HTMLTextAreaElement, TypeInputProps>(
	({ id, placeholder, label, error, className, ...props }, ref) => {
		const uuid = useId()

		return (
			<div className='space-y-2'>
				{label && (
					<Label
						htmlFor={`textarea_${uuid}`}
						className={clsx(
							'text-sm font-normal',
							error ? 'text-destructive' : ''
						)}
					>
						{label}
					</Label>
				)}
				<div className='relative'>
					<textarea
						id={`textarea_${uuid}_${id}`}
						className={clsx(
							'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive field-sizing-content shadow-xs flex min-h-12 w-full rounded-md border bg-transparent px-3 py-2 text-sm outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30',
							className,
							error
								? 'border-destructive text-destructive placeholder:text-destructive focus-visible:border-destructive focus-visible:ring-destructive/20'
								: 'placeholder:text-muted-foreground'
						)}
						placeholder={placeholder}
						ref={ref}
						rows={props.rows ?? 3}
						{...props}
					/>
				</div>

				{error ? (
					<p
						className='mt-2 text-xs text-destructive'
						role='alert'
						aria-live='polite'
					>
						{i18n.t(`${error.message}`)}
					</p>
				) : null}
			</div>
		)
	}
)

CustomTextArea.displayName = 'CustomTextArea'

export default CustomTextArea
