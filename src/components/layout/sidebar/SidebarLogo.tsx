import { SidebarStatus } from '@/types/custom.enum'

import styles from './Sidebar.module.scss'

interface ISidebarLogo {
	sidebar: string
}

export function SidebarLogo({ sidebar }: ISidebarLogo) {
	return (
		<a href='/dashboard' className={styles.logo}>
			{sidebar === SidebarStatus.NORMAL ? (
				<div className='flex items-center justify-center gap-2'>
					<img
						draggable={false}
						src='/icon_desk.png'
						className='my-4 max-h-10 object-cover'
					/>
					<span className='text-2xl font-semibold tracking-widest opacity-65'>
						Bloomify
					</span>
				</div>
			) : (
				<>
					{sidebar === SidebarStatus.MOBILE ? null : (
						<img
							draggable={false}
							src='/icon.png'
							className='mx-auto my-4 max-h-10 object-cover'
						/>
					)}
				</>
			)}
		</a>
	)
}
