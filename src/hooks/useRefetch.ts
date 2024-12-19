import { useQueryClient } from '@tanstack/react-query'

export const useRefetch = () => {
	const refetchQuery = useQueryClient()

	return {
		refetchQuery
	}
}
