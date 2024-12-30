import { useTranslate } from '@/hooks'

export default function NotFoundPage() {
	const { t } = useTranslate()

	return (
		<section className='flex h-screen select-none items-center justify-center bg-white'>
			<div className='mx-auto max-w-screen-xl space-y-8 text-center'>
				<h1 className='text-[150px] uppercase text-gray-500'>404</h1>
				<p className='text-3xl uppercase tracking-tight text-gray-500 md:text-4xl'>
					{t('not_found')} !
				</p>
				<p className='max-w-sm text-base font-light text-gray-500 md:text-lg'>
					{t('not_found_description')}
				</p>
				<a
					href='/'
					className='focus:ring-primary-300 mt-8 inline-flex rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white transition-all duration-300 ease-in-out hover:bg-primary/80 focus:outline-none focus:ring-2'
				>
					{t('back_to_home')}
				</a>
			</div>
		</section>
	)
}
