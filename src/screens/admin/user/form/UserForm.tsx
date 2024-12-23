import {
	AtSignIcon,
	EyeIcon,
	EyeOffIcon,
	LockIcon,
	MailIcon,
	UserPenIcon
} from 'lucide-react'
import { Controller } from 'react-hook-form'

import { CrudEnum } from '@/types/custom.enum'

import { Button, CustomInput, Switch } from '@/components/ui'

import { useUserForm } from './useUserForm'

type TypeUserForm = {
	setIsOpen: (v: boolean) => void
	type: CrudEnum.CREATE | CrudEnum.EDIT
	userId?: string | null
}

export function UserForm(props: TypeUserForm) {
	const { t, formMethod, onSubmit, isShow, handleToggle } = useUserForm(props)

	return (
		<form
			className='grid grid-cols-1 gap-5 sm:grid-cols-2'
			onSubmit={formMethod.handleSubmit(onSubmit)}
		>
			<CustomInput
				label={t('firstName')}
				placeholder={t('firstName_placeholder')}
				iconLeft={<UserPenIcon size={18} />}
			/>

			<CustomInput
				label={t('lastName')}
				placeholder={t('lastName_placeholder')}
				iconLeft={<UserPenIcon size={18} />}
			/>

			<CustomInput
				label={t('username')}
				placeholder={t('username_placeholder')}
				iconLeft={<AtSignIcon size={18} />}
			/>

			<CustomInput
				label={t('email')}
				placeholder={t('email_placeholder')}
				iconLeft={<MailIcon size={18} />}
			/>

			<CustomInput
				type={isShow ? 'text' : 'password'}
				label={t('password')}
				placeholder={t('password_placeholder')}
				iconRight={
					isShow ? (
						<EyeOffIcon size={18} strokeWidth={2} />
					) : (
						<EyeIcon size={18} strokeWidth={2} />
					)
				}
				iconLeft={<LockIcon size={18} strokeWidth={2} />}
				iconRightOnClick={handleToggle}
			/>

			<div className='space-y-3'>
				<label
					className='block text-sm font-medium text-gray-700'
					id='user_status'
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
				// loading={createPending || editPending}
				// disabled={createPending || editPending}
				className='col-span-2 w-full'
				type='submit'
			>
				{props.type === CrudEnum.CREATE ? t('create') : t('edit')}
			</Button>
		</form>
	)
}
