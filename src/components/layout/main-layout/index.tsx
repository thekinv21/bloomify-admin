import { Sidebar } from '../sidebar/Sidebar'

import styles from './MainLayout.module.scss'

interface IMainLayout {
	children: React.ReactNode
}

export function MainLayout({ children }: IMainLayout) {
	return (
		<section className='relative'>
			<div className={styles.main_layout}>
				<div className={styles.sidebar}>
					<Sidebar />
				</div>

				<div className={styles.container}>
					{/* <Header /> */}

					<main id='screen_content' className={styles.content}>
						{children}
					</main>
				</div>
			</div>
		</section>
	)
}
