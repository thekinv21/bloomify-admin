import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import { z } from 'zod'

import { useTranslate } from '@/hooks'

import { CrudEnum } from '@/types/custom.enum'

import { flowerSchema } from './flowerSchema'

type TypeUseFlowerForm = {
	type: CrudEnum.CREATE | CrudEnum.EDIT
}

export const useFlowerForm = (props: TypeUseFlowerForm) => {
	const { t } = useTranslate()

	const { id } = useParams<{ id: string }>()

	const formMethod = useForm<z.infer<typeof flowerSchema>>({
		resolver: zodResolver(flowerSchema),
		mode: 'onChange',
		defaultValues: {
			isActive: true
		}
	})

	// const { createPending, createFlower } = useCreateFlower()

	// const { editPending, editFlower } = useEditFlower()

	// const { query: flowerQuery } = useFetchFlower({
	// 	flowerId: Number(id)
	// })

	const onSubmit: SubmitHandler<z.infer<typeof flowerSchema>> = data => {
		console.log('data', data)
		console.log('id', id)
		console.log('props', props)
	}

	return {
		t,
		formMethod,
		onSubmit
	}
}
