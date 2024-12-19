import { UserRoundCogIcon } from 'lucide-react'
import { Controller } from 'react-hook-form'

import { CrudEnum } from '@/types/custom.enum'

import { Button, CustomInput, Switch } from '@/components/ui'

import { useRoleForm } from './useRoleForm'

type TypeRoleForm = {
	setIsOpen: (v: boolean) => void
	type: CrudEnum.CREATE | CrudEnum.EDIT
	roleId?: number | null
}

export function RoleForm(props: TypeRoleForm) {
	const { t, formMethod, onSubmit, createPending, editPending } =
		useRoleForm(props)

	return (
		<form className='space-y-5' onSubmit={formMethod.handleSubmit(onSubmit)}>
			<CustomInput
				label={t('roleName')}
				placeholder={t('roleName_placeholder')}
				iconLeft={<UserRoundCogIcon size={20} />}
				{...formMethod.register('name', {
					required: t('roleName_required')
				})}
				error={formMethod.formState.errors.name}
			/>

			<div className='space-y-3'>
				<label
					className='block text-sm font-medium text-gray-700'
					id='role_status'
				>
					{t('status')}
				</label>
				<Controller
					name='isActive'
					control={formMethod.control}
					render={({ field }) => (
						<Switch
							checked={field.value}
							onCheckedChange={checked => field.onChange(checked)}
							name={field.name}
							ref={field.ref}
						/>
					)}
				/>
			</div>

			<Button
				loading={createPending || editPending}
				disabled={createPending || editPending}
				className='w-full'
				type='submit'
			>
				{props.type === CrudEnum.CREATE ? t('create') : t('edit')}
			</Button>
		</form>
	)
}
