import { Control } from 'react-hook-form'

import { IOption } from '@/types/custom.types'

export interface ISelectProps {
	control: Control<any>
	name: string
	placeholder?: string
	label?: string
	required?: boolean
	className?: string
	options: IOption<string | number | boolean>[]
	isLoading?: boolean
	isDisabled?: boolean
}

export interface IAsyncSelectProps {
	control: Control<any>
	name: string
	placeholder?: string
	required?: boolean
	className?: string
	isLoading?: boolean
	isDisabled?: boolean
	loadOptions: (
		inputValue: string,
		callback: (options: IOption<string | number | boolean>[]) => void
	) => void
}
