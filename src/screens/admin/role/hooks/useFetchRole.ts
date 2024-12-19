import { useQuery } from '@tanstack/react-query'

import { keyConstant } from '@/constant'

import { roleService } from '@/services'

export const useFetchRole = ({ roleId }: { roleId: number }) => {
	const query = useQuery({
		queryKey: [keyConstant.get_role, roleId],
		queryFn: () => roleService.getById(roleId),
		select: ({ data }) => {
			return data?.content
		},
		retry: 3,
		enabled: !!roleId
	})

	return {
		query
	}
}
