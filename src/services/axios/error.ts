export const errorCatch = (error: any): string =>
	error.response && error.response.data
		? typeof error.response.data === 'object'
			? (error.response.data as { message: string }).message
			: error.response.data
		: error.message
