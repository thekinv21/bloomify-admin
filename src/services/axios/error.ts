export const errorCatch = (error: any): string => {
	if (error.response) {
		const { data } = error.response
		if (typeof data === 'object') {
			return data.message || data.error || error.message
		}
		return data.message || error.message
	}
	return error.message
}
