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
	isLast?: boolean
	isFirst?: boolean
	isEmpty?: boolean
}

export interface IOption<T> {
	label: string
	value: T
}

export interface IPaginationParams {
	page: number
	size: number
	searchTerm?: string | null
}
