import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	CustomInput
} from '@/components/ui'

import styles from './LoginPage.module.scss'
import { useLogin } from './useLogin'

export default function LoginPage() {
	const { formMethod, onSubmit, isSubmit } = useLogin()

	return (
		<section className={styles.page}>
			<div className={styles.page_bg}>
				<div className={styles.page_bg_color} />
			</div>
			<Card className={styles.card}>
				<CardHeader className={styles.header}>
					<CardTitle className={styles.title}>Login</CardTitle>
					<CardDescription className={styles.description}>
						Enter your username and password to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						className={styles.form}
						onSubmit={formMethod.handleSubmit(onSubmit)}
					>
						<div className={styles.form_item}>
							<CustomInput
								label='Username'
								id='username'
								placeholder='Enter username'
								{...formMethod.register('username', {
									required: true
								})}
								error={formMethod.formState.errors.username}
							/>
						</div>
						<div className={styles.form_item}>
							<CustomInput
								label='Password'
								id='password'
								type='password'
								placeholder='******'
								{...formMethod.register('password', {})}
								error={formMethod.formState.errors.password}
							/>
						</div>

						<div>
							<Button
								loading={isSubmit}
								type='submit'
								className={styles.button}
							>
								Login
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</section>
	)
}
