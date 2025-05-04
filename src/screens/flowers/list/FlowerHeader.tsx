import {
	FlowerIcon,
	ListIcon,
	Plus,
	Search,
	WalletCardsIcon
} from 'lucide-react'

import { useRoute, useTranslate } from '@/hooks'

import { pathConstant } from '@/constant'

import {
	Button,
	CustomInput,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui'

import styles from './Flower.module.scss'

interface IFlowerHeader {
	searchTerm: string
	setSearchTerm: (v: string) => void
	heading: string
	setIsGridView: (v: boolean) => void
}

export function FlowerHeader(props: IFlowerHeader) {
	const { t } = useTranslate()

	const { route } = useRoute()

	return (
		<div className={styles.custom_table_heading}>
			<h1 className={styles.heading}>{props.heading}</h1>
			<div className={styles.block_container}>
				<div className={styles.input_container}>
					<CustomInput
						type='text'
						placeholder={t('search')}
						value={props.searchTerm}
						onChange={e => props.setSearchTerm(e.target.value)}
						iconLeft={<Search size={20} />}
					/>
				</div>

				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div aria-label='Change View Type' className='w-full sm:w-auto'>
							<Button
								variant='warning'
								leftSection={<FlowerIcon size={16} />}
								className='w-full text-xs font-semibold uppercase sm:w-auto sm:px-5'
							>
								{t('view_type')}
							</Button>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='min-w-[145px]'>
						<DropdownMenuItem onClick={() => props.setIsGridView(false)}>
							<div className='flex items-start gap-2'>
								<ListIcon size={14} />
								<span>{t('list')}</span>
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => props.setIsGridView(true)}>
							<div className='flex items-start gap-2'>
								<WalletCardsIcon size={14} />
								<span>{t('card')}</span>
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>

				<Button
					leftSection={<Plus size={16} />}
					className='w-full text-xs font-semibold uppercase sm:w-auto sm:px-5'
					onClick={() => route(pathConstant.createFlower)}
				>
					{t('create')}
				</Button>
			</div>
		</div>
	)
}
