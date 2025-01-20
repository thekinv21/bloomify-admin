export const errorCatch = (error: any): string =>
	error.response && error.response.data
		? typeof error.response.data === 'object'
			? (error.response.data as { error: string }).error
			: error?.response?.data?.message
		: error.message
