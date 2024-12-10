import { domAnimation, LazyMotion } from 'motion/react'

import { Header } from '../header/Header'
import { Sidebar } from '../sidebar/Sidebar'

import styles from './MainLayout.module.scss'

interface IMainLayout {
	children: React.ReactNode
}

export function MainLayout({ children }: IMainLayout) {
	return (
		<LazyMotion features={domAnimation}>
			<section className='relative'>
				<div className={styles.main_layout}>
					<>
						<Sidebar />
					</>

					<div className={styles.container}>
						<Header />

						<main id='screen_content' className={styles.content}>
							{children}
						</main>
					</div>
				</div>
			</section>
		</LazyMotion>
	)
}
