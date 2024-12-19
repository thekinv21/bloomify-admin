import { ChevronRight, LayoutDashboard } from 'lucide-react'
import { NavLink } from 'react-router'

import { useTranslate } from '@/hooks'

import { IBreadCrumbProps } from '@/types/custom.types'

interface IBreadCrumb {
	linksArray: IBreadCrumbProps[]
}

export function BreadCrumb({ linksArray }: IBreadCrumb) {
	const { t } = useTranslate()

	return (
		<nav aria-label='breadcrumb' className='mb-5 select-none'>
			<ul
				id='breadcrumb'
				className='flex items-center gap-x-3 text-sm text-gray-600'
			>
				<li>
					<a
						href='/'
						aria-label='Home'
						className='transition-colors hover:text-primary'
					>
						<LayoutDashboard size={16} />
					</a>
				</li>

				<span aria-hidden='true' className='text-gray-400'>
					<ChevronRight size={16} />
				</span>

				{linksArray.map((link: IBreadCrumbProps, idx: number) => (
					<li key={idx} className='flex items-center gap-x-2'>
						{idx > 0 && (
							<span aria-hidden='true' className='text-gray-400'>
								<ChevronRight size={16} />
							</span>
						)}

						<NavLink
							to={link.link}
							className={({ isActive }) =>
								[
									'flex items-center gap-1 transition-colors hover:underline',
									isActive ? 'text-primary' : ''
								].join(' ')
							}
						>
							{link.icon && <span>{link.icon}</span>}
							<span>{t(`${link.title}`)}</span>
						</NavLink>
					</li>
				))}
			</ul>
		</nav>
	)
}
