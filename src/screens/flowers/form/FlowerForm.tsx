import { Controller } from 'react-hook-form'

import { CrudEnum } from '@/types/custom.enum'

import { Button, CustomInput, Label, Switch } from '@/components/ui'

import { useFlowerForm } from './useFlowerForm'

interface IFlowerForm {
	type: CrudEnum.CREATE | CrudEnum.EDIT
}

export function FlowerForm({ type }: IFlowerForm) {
	const { t, formMethod, onSubmit } = useFlowerForm({
		type: type
	})

	return (
		<form
			name='role_form'
			className='space-y-5'
			onSubmit={formMethod.handleSubmit(onSubmit)}
		>
			<CustomInput
				label={t('roleName')}
				placeholder={t('roleName_placeholder')}
				{...formMethod.register('title', {
					required: t('roleName_required')
				})}
				error={formMethod.formState.errors.title}
			/>

			<div className='space-y-3'>
				<Label
					className='block text-sm font-medium text-gray-700'
					htmlFor='isActive'
				>
					{t('status')}
				</Label>
				<Controller
					name='isActive'
					control={formMethod.control}
					render={({ field }) => (
						<Switch
							id='isActive'
							checked={field.value}
							onCheckedChange={checked => field.onChange(checked)}
							name={field.name}
							ref={field.ref}
						/>
					)}
				/>
			</div>

			<Button
				// loading={createPending || editPending}
				// disabled={createPending || editPending}
				className='w-full'
				type='submit'
			>
				{type === CrudEnum.CREATE ? t('create') : t('edit')}
			</Button>
		</form>
	)
}
