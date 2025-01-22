import { useQuery } from '@tanstack/react-query'

import { keyConstant } from '@/constant'

import { flowerService } from '@/services'

export const useFetchFlower = ({ flowerId }: { flowerId: number }) => {
	const query = useQuery({
		queryKey: [keyConstant.get_flower, flowerId],
		queryFn: () => flowerService.getById(flowerId),
		select: ({ data }) => {
			return data?.content
		},
		retry: 3,
		enabled: !!flowerId
	})

	return {
		query
	}
}
