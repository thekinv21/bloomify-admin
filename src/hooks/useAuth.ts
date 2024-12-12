import { useUserStore } from '@/store/userStore'

export const useAuth = () => {
	const { user, accessToken } = useUserStore()

	return {
		user,
		accessToken
	}
}
