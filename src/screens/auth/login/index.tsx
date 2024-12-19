import { AtSign, Eye, EyeOff, Lock } from 'lucide-react'

import { useTranslate } from '@/hooks'

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
	const { formMethod, onSubmit, isSubmit, isShow, handleToggle } = useLogin()
	const { t } = useTranslate()

	return (
		<section className={styles.page}>
			<div className={styles.page_bg}>
				<div className={styles.page_bg_color} />
			</div>
			<Card className={styles.card}>
				<CardHeader className={styles.header}>
					<CardTitle className={styles.title}>{t(`login`)}</CardTitle>
					<CardDescription className={styles.description}>
						{t(`login_placeholder`)}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						className={styles.form}
						onSubmit={formMethod.handleSubmit(onSubmit)}
					>
						<div className={styles.form_item}>
							<CustomInput
								label={t(`username`)}
								id='username'
								placeholder={t(`username_placeholder`)}
								iconLeft={<AtSign size={18} strokeWidth={2} />}
								{...formMethod.register('username')}
								error={formMethod.formState.errors.username}
							/>
						</div>
						<div className={styles.form_item}>
							<CustomInput
								label={t(`password`)}
								id='password'
								type={isShow ? 'text' : 'password'}
								placeholder='******'
								iconRight={
									isShow ? (
										<EyeOff size={18} strokeWidth={2} />
									) : (
										<Eye size={18} strokeWidth={2} />
									)
								}
								iconLeft={<Lock size={18} strokeWidth={2} />}
								iconRightOnClick={handleToggle}
								{...formMethod.register('password')}
								error={formMethod.formState.errors.password}
							/>
						</div>

						<div>
							<Button
								loading={isSubmit}
								type='submit'
								className={styles.button}
							>
								{t(`login`)}
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</section>
	)
}
