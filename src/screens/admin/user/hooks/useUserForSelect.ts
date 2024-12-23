import { useQuery } from '@tanstack/react-query'

import { keyConstant } from '@/constant'

import { userService } from '@/services'

export const useUserForSelect = () => {
	const query = useQuery({
		queryKey: [keyConstant.get_user_for_select],
		queryFn: () => userService.getForSelect(),
		select(data) {
			return data?.data
		},
		retry: 3
	})

	return {
		query
	}
}
