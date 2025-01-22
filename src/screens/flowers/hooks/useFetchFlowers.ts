import { useQuery } from '@tanstack/react-query'

import { keyConstant } from '@/constant'

import { IPaginationParams } from '@/types/custom.types'

import { flowerService } from '@/services'

export const useFetchFlowers = (props: IPaginationParams) => {
	const query = useQuery({
		queryKey: [keyConstant.get_flowers, props],
		queryFn: () => flowerService.getAll(props),
		select(data) {
			return data?.data
		},
		retry: 3
	})

	return {
		query
	}
}
