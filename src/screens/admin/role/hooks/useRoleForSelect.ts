import { useQuery } from '@tanstack/react-query'

import { keyConstant } from '@/constant'

import { roleService } from '@/services'

export const useRoleForSelect = () => {
	const query = useQuery({
		queryKey: [keyConstant.get_role_for_select],
		queryFn: () => roleService.getForSelect(),
		select(data) {
			return data?.data?.content
		},
		retry: 3
	})

	return {
		query
	}
}
