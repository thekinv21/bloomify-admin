import styles from './Sidebar.module.scss'

export function SidebarLogo() {
	return (
		<div className={styles.logo}>
			<img src='/logo.svg' className='h-10 w-10' />
			<h5>Bloomify</h5>
		</div>
	)
}
