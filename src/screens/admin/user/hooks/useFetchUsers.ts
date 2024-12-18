import { useQuery } from '@tanstack/react-query'

import { keyConstant } from '@/constant'

import { IPaginationParams } from '@/types/custom.types'

import { userService } from '@/services'

export const useFetchUsers = (props: IPaginationParams) => {
	const query = useQuery({
		queryKey: [keyConstant.get_users, props],
		queryFn: () => userService.getAll(props),
		select(data) {
			return data?.data
		},
		retry: 3
	})

	return {
		query
	}
}
