import { UploadIcon } from 'lucide-react'
import { ChangeEventHandler, FC } from 'react'
import { useDropzone } from 'react-dropzone'
import { Control, Controller, FieldError, FieldErrors } from 'react-hook-form'

import { Label } from '../label'

import i18n from '@/i18n'
import { cn } from '@/utils/utils'

interface IDropzoneFieldProps {
	name: string
	control: Control<any>
	multiple?: boolean
	label?: string
	acceptOnlyImage?: boolean
	error?: FieldError
}

export function CustomDropzone({
	name,
	multiple,
	...props
}: IDropzoneFieldProps) {
	return (
		<div className='space-y-2'>
			{props.label && (
				<Label className='text-sm font-normal'>{props.label}</Label>
			)}

			<Controller
				render={({ field: { onChange } }) => (
					<Dropzone
						multiple={multiple}
						onChange={e =>
							onChange(
								multiple ? e.target.files : (e.target.files?.[0] ?? null)
							)
						}
						error={props.error}
						{...props}
					/>
				)}
				name={name}
				control={props.control}
				defaultValue=''
			/>
		</div>
	)
}

interface IDropzoneProps {
	multiple?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement>
	acceptOnlyImage?: boolean
	error?: FieldError | FieldErrors
}

const Dropzone: FC<IDropzoneProps> = ({ multiple, onChange, ...rest }) => {
	const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
		multiple,
		accept: rest.acceptOnlyImage
			? {
					'image/jpeg': ['.jpg', '.jpeg'],
					'image/png': ['.png'],
					'image/gif': ['.gif']
				}
			: {
					'application/pdf': ['.pdf'],
					'application/msword': ['.doc'],
					'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
						['.docx'],
					'application/vnd.ms-excel': ['.xls'],
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
						'.xlsx'
					],
					'application/vnd.ms-powerpoint': ['.ppt'],
					'application/vnd.openxmlformats-officedocument.presentationml.presentation':
						['.pptx']
				},
		...rest
	})

	return (
		<aside className='relative'>
			<div
				{...getRootProps()}
				className={cn(
					`flex h-40 cursor-pointer items-center justify-center rounded-sm border border-dashed transition-colors duration-300 ease-in-out hover:border-gray-400/50`,
					rest.error ? 'border-red-500/60' : 'border-gray-200'
				)}
			>
				<input
					{...getInputProps({ onChange })}
					className='hidden'
					accept='image/*'
				/>
				<aside className='flex flex-col items-center justify-center gap-3'>
					<UploadIcon
						className={`size-12 ${rest.error ? 'text-red-400/90 opacity-70' : 'text-gray-400'}`}
					/>
					<div
						className={cn(
							'text-sm',
							rest.error ? 'text-red-500' : 'text-gray-400'
						)}
					>
						{Array.isArray(acceptedFiles) && acceptedFiles.length > 0 ? (
							<>
								{acceptedFiles.map((file, index) => (
									<span key={index}>
										{`${file.name} - ${(file.size / 1024).toFixed(2)} KB`}
									</span>
								))}
							</>
						) : (
							<div className='text-center'>
								{rest.acceptOnlyImage ? (
									<p
										className={`flex flex-col gap-2 text-sm ${rest.error ? 'text-red-500' : 'text-gray-400'}`}
									>
										<span>{i18n.t('max_image_size')}: 5MB</span>
										<span>
											{i18n.t('accepted_image_formats')}: .jpg, .jpeg, .png,
											.gif
										</span>
									</p>
								) : (
									<p
										className={`flex flex-col gap-2 text-sm ${rest.error ? 'text-red-500' : 'text-gray-400'}`}
									>
										<span>{i18n.t('max_file_size')}: 5MB</span>
										<span>
											{i18n.t('accepted_file_formats')}: .pdf, .doc, .docx,
											.xls, .xlsx, .ppt, .pptx
										</span>
									</p>
								)}
							</div>
						)}
					</div>
				</aside>
			</div>
		</aside>
	)
}
