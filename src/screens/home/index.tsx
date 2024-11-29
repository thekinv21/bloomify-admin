import { useUserStore } from '@/store/userStore'

export default function HomePage() {
	const { user } = useUserStore()

	return (
		<div className='flex h-screen w-full items-center justify-center'>
			Hoş geldin: {user && user?.firstName + user?.lastName}
		</div>
	)
}
