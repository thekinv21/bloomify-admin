import { useId } from 'react'

import { useTranslate } from '@/hooks'

import { Label } from '../label'
import MultipleSelector, { Option } from '../multiselect'

interface ICustomMultiSelectProps {
	label?: string
	placeholder?: string
	options: Option[]
}

export default function CustomMultiSelect(props: ICustomMultiSelectProps) {
	const { t } = useTranslate()

	const Id = useId()

	return (
		<div className='space-y-2'>
			{props.label && (
				<Label className='font-normal' htmlFor={`select_${Id}`}>
					{props.label}
				</Label>
			)}
			<MultipleSelector
				commandProps={{
					label: t('search')
				}}
				defaultOptions={props.options}
				options={props.options}
				placeholder={
					props.placeholder ? t(`${props.placeholder}`) : t(`select_option`)
				}
				hideClearAllButton
				hidePlaceholderWhenSelected
				emptyIndicator={
					<p className='text-center text-sm'>{t('options_is_not_found')}</p>
				}
			/>
		</div>
	)
}
