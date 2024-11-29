export interface ICustomResponse<T> {
	status: string
	code: number
	message: string
	isPageable: boolean
	content: T | T[]
	page?: number
	pageSize?: number
	totalElements?: number
	totalPages?: number
	last?: boolean
	first?: boolean
	empty?: boolean
}
