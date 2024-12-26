import clsx from 'clsx'
import { t } from 'i18next'
import { Controller } from 'react-hook-form'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'

import '../../Select.scss'
import { ISelectProps } from '../../Select.types'

import { cn } from '@/utils/utils'

export function MultiSelect(props: ISelectProps) {
	const animatedComponent = makeAnimated()

	return (
		<div className='space-y-2'>
			{props.label && (
				<label className='text-sm font-normal'>{props.label}</label>
			)}
			<Controller
				control={props.control}
				name={props.name}
				rules={{ required: props.required ? true : false }}
				render={({
					field: { onChange, onBlur, value, ref },
					fieldState: { error }
				}) => {
					return (
						<>
							<Select
								closeMenuOnSelect={false}
								ref={ref}
								name={props.name}
								placeholder={props.placeholder ?? t(`select_option`)}
								value={props.options?.filter(opt =>
									Array.isArray(value) ? value.includes(opt.value) : null
								)}
								onChange={(newValue: any) => {
									onChange(newValue?.map((item: any) => item?.value))
								}}
								onBlur={onBlur}
								components={animatedComponent}
								classNamePrefix={'custom_select'}
								className={clsx(
									'custom_select',
									props.className,
									error
										? 'rounded-md border-0 border-destructive text-destructive hover:border-primary focus:border-primary'
										: ''
								)}
								options={props.options}
								isMulti
								isDisabled={props.isDisabled}
								isLoading={props.isLoading}
								isClearable
								styles={{
									placeholder: base => ({
										...base,
										color: error ? 'red' : '#0d0d0d90'
									})
								}}
							/>

							<p
								className={cn(
									'mt-3 text-xs',
									error ? 'text-red-500' : 'text-transparent'
								)}
							>
								{error?.message
									? t(`${error.message}`)
									: t('This field is required')}
							</p>
						</>
					)
				}}
			/>
		</div>
	)
}
