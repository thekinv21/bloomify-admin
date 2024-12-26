import {
	AtSignIcon,
	EyeIcon,
	EyeOffIcon,
	LockIcon,
	MailIcon,
	UserPenIcon
} from 'lucide-react'
import { Control, Controller, FieldValues } from 'react-hook-form'

import { CrudEnum } from '@/types/custom.enum'
import '@/types/custom.types'
import { IOption } from '@/types/custom.types'

import { Button, CustomInput, Switch } from '@/components/ui'
import { CustomMultiSelect } from '@/components/ui/custom/CustomMultiSelect'

import { useUserForm } from './useUserForm'

type TypeUserForm = {
	setIsOpen: (v: boolean) => void
	type: CrudEnum.CREATE | CrudEnum.EDIT
	userId?: string | null
}

export function UserForm(props: TypeUserForm) {
	const {
		t,
		formMethod,
		onSubmit,
		isShow,
		handleToggle,
		createPending,
		roleSelectQuery
	} = useUserForm(props)

	const {
		formState: { errors },
		handleSubmit,
		register,
		control
	} = formMethod

	return (
		<form className='flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}>
			<div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
				<CustomInput
					label={t('firstName')}
					placeholder={t('firstName_placeholder')}
					iconLeft={<UserPenIcon size={18} />}
					{...register('firstName')}
					error={errors.firstName}
				/>

				<CustomInput
					label={t('lastName')}
					placeholder={t('lastName_placeholder')}
					iconLeft={<UserPenIcon size={18} />}
					{...register('lastName')}
					error={errors.lastName}
				/>
			</div>

			<div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
				<CustomInput
					label={t('username')}
					placeholder={t('username_placeholder')}
					iconLeft={<AtSignIcon size={18} />}
					{...register('username')}
					error={errors.username}
				/>

				<CustomInput
					label={t('email')}
					placeholder={t('email_placeholder')}
					iconLeft={<MailIcon size={18} />}
					{...register('email')}
					error={errors.email}
				/>
			</div>

			<div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
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
					{...register('password')}
					error={errors.password}
				/>

				<CustomMultiSelect
					control={control as unknown as Control<FieldValues>}
					name='roles'
					label={t('role')}
					placeholder={t('role_placeholder')}
					error={errors.roles}
					isLoading={roleSelectQuery.isLoading || roleSelectQuery.isFetching}
					isDisabled={roleSelectQuery.isLoading || roleSelectQuery.isFetching}
					options={roleSelectQuery?.data as IOption<number>[]}
				/>
			</div>

			<div className='space-y-3'>
				<label
					className='block text-sm font-medium text-gray-700'
					id='user_status'
				>
					{t('status')}
				</label>
				<Controller
					name='isActive'
					control={control}
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
				loading={createPending}
				disabled={createPending}
				className='col-span-2 mt-5 w-full'
				type='submit'
			>
				{props.type === CrudEnum.CREATE ? t('create') : t('edit')}
			</Button>
		</form>
	)
}
