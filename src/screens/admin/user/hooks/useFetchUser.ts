import { useQuery } from '@tanstack/react-query'

import { keyConstant } from '@/constant'

import { userService } from '@/services'

export const useFetchUser = ({ userId }: { userId: string }) => {
	const query = useQuery({
		queryKey: [keyConstant.get_user, userId],
		queryFn: () => userService.getById(userId),
		select: ({ data }) => {
			return data?.content
		},
		retry: 3,
		enabled: !!userId
	})

	return {
		query
	}
}
