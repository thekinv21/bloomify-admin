import { SidebarStatus } from '@/types/custom.enum'

import styles from './Sidebar.module.scss'

interface ISidebarLogo {
	sidebar: string
}

export function SidebarLogo({ sidebar }: ISidebarLogo) {
	return (
		<a href='/dashboard' className={styles.logo}>
			{sidebar === SidebarStatus.NORMAL ? (
				<img
					draggable={false}
					src='/logo.png'
					className='my-4 max-h-10 object-cover'
				/>
			) : (
				<>
					{sidebar === SidebarStatus.MOBILE ? null : (
						<h5 className='w-full p-5 text-center'>B</h5>
					)}
				</>
			)}
		</a>
	)
}
