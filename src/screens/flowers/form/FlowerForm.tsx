import { BrushIcon, Edit, Plus } from 'lucide-react'
import { Control, Controller, FieldErrors } from 'react-hook-form'

import { CrudEnum } from '@/types/custom.enum'

import {
	Button,
	CustomDropzone,
	CustomInput,
	CustomSingleSelect,
	CustomTextArea,
	Label,
	Switch
} from '@/components/ui'

import { useFlowerForm } from './useFlowerForm'

interface IFlowerForm {
	type: CrudEnum.CREATE | CrudEnum.EDIT
}

export function FlowerForm({ type }: IFlowerForm) {
	const { t, formMethod, onSubmit } = useFlowerForm({
		type: type
	})

	const { flowerImages } = formMethod.watch()

	console.log('flowerImages', flowerImages)

	return (
		<form
			name='role_form'
			className='panel flex flex-col gap-4'
			onSubmit={formMethod.handleSubmit(onSubmit)}
		>
			<h1 className='text-xl uppercase text-gray-600'>
				{type === CrudEnum.CREATE ? t('create_flower') : t('edit_flower')}
			</h1>

			<div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3'>
				<CustomInput
					label={t('title')}
					placeholder={t('title_placeholder')}
					{...formMethod.register('title')}
					error={formMethod.formState.errors.title}
				/>

				<CustomInput
					type='number'
					label={t('price')}
					placeholder={t('price_placeholder')}
					{...formMethod.register('price', {
						valueAsNumber: true
					})}
					error={formMethod.formState.errors.price}
				/>

				<CustomSingleSelect
					label={t('currency')}
					name='currency'
					control={formMethod.control as Control<any>}
					options={[
						{ label: 'USD', value: 'USD' },
						{ label: 'EUR', value: 'EUR' },
						{ label: 'GBP', value: 'GBP' }
					]}
					error={formMethod.formState.errors.currency}
				/>

				<div className='col-span-full'>
					<CustomTextArea
						label={t('description')}
						placeholder={t('description_placeholder')}
						{...formMethod.register('description')}
						error={formMethod.formState.errors.description}
					/>
				</div>

				<CustomInput
					type='number'
					label={t('height')}
					placeholder={t('height_placeholder')}
					{...formMethod.register('height', {
						valueAsNumber: true
					})}
					error={formMethod.formState.errors.height}
				/>

				<CustomInput
					type='number'
					label={t('width')}
					placeholder={t('width_placeholder')}
					{...formMethod.register('width', {
						valueAsNumber: true
					})}
					error={formMethod.formState.errors.width}
				/>

				<CustomInput
					label={t('main_image')}
					placeholder={t('main_image_placeholder')}
					{...formMethod.register('imageUrl')}
					error={formMethod.formState.errors.imageUrl}
				/>

				<div className='mt-3 flex flex-col gap-2'>
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

				<div className='col-span-full'>
					<CustomDropzone
						name='flowerImages'
						control={formMethod.control}
						label={t('flower_images')}
						acceptOnlyImage
						multiple
						error={
							formMethod.formState.errors.flowerImages as unknown as FieldErrors
						}
					/>
				</div>
			</div>

			<div className='ml-auto flex max-w-xs items-center gap-4'>
				{type === CrudEnum.CREATE && (
					<Button
						type='button'
						className='min-w-28 font-semibold'
						variant='warning'
						leftSection={<BrushIcon className='h-4 w-4' />}
						onClick={() => formMethod.reset()}
					>
						{t('reset')}
					</Button>
				)}

				<Button
					type='submit'
					className='min-w-28 font-semibold'
					leftSection={
						type === CrudEnum.CREATE ? (
							<Plus className='h-4 w-4' />
						) : (
							<Edit className='h-4 w-4' />
						)
					}
				>
					{type === CrudEnum.CREATE ? t('create') : t('edit')}
				</Button>
			</div>
		</form>
	)
}
