import styles from './Loader.module.scss'

export function Loader() {
	return (
		<div className={styles.page}>
			<div className={styles.card}>
				<span className={styles.flower_loader} />
			</div>
		</div>
	)
}
