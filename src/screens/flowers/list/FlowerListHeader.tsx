import { FlowerIcon, ListIcon, PlusIcon, WalletCardsIcon } from 'lucide-react'

import { useTranslate } from '@/hooks'

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui'

import styles from './Flower.module.scss'

export function FlowerListHeader() {
	const { t } = useTranslate()

	return (
		<div className={styles.page_header_container}>
			<h3>{t('flowers_list')}</h3>

			<div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<div aria-label='Change View Type'>
							<Button variant='warning' leftSection={<FlowerIcon size={16} />}>
								{t('view_type')}
							</Button>
						</div>
					</DropdownMenuTrigger>
					<DropdownMenuContent className='min-w-[145px]'>
						<DropdownMenuItem>
							<div className='flex items-start gap-2'>
								<ListIcon size={14} />
								<span>{t('list')}</span>
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<div className='flex items-start gap-2'>
								<WalletCardsIcon size={14} />
								<span>{t('card')}</span>
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<Button leftSection={<PlusIcon size={16} />}>{t('create')}</Button>
			</div>
		</div>
	)
}
