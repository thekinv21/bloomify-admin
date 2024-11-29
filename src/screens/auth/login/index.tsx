import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
	Input,
	Label
} from '@/components/ui'

import styles from './LoginPage.module.scss'

export default function LoginPage() {
	return (
		<section className={styles.page}>
			<div className={styles.page_bg}>
				<div className={styles.page_bg_color} />
			</div>
			<Card className={styles.card}>
				<CardHeader className={styles.header}>
					<CardTitle className={styles.title}>Login</CardTitle>
					<CardDescription className={styles.description}>
						Enter your email and password to login to your account
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form className={styles.form}>
						<div className={styles.form_item}>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								placeholder='m@example.com'
								required
							/>
						</div>
						<div className={styles.form_item}>
							<Label htmlFor='password'>Password</Label>
							<Input id='password' type='password' />
						</div>

						<div>
							<Button type='submit' className={styles.button}>
								Login
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</section>
	)
}
