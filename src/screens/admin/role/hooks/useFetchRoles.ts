import { useQuery } from '@tanstack/react-query'

import { keyConstant } from '@/constant'

import { IPaginationParams } from '@/types/custom.types'

import { roleService } from '@/services'

export const useFetchRoles = (props: IPaginationParams) => {
	const query = useQuery({
		queryKey: [keyConstant.get_roles, props],
		queryFn: () => roleService.getAll(props),
		select(data) {
			return data?.data
		},
		retry: 3
	})

	return {
		query
	}
}
