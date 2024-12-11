import { AxiosError } from 'axios'

export const errorCatch = (error: AxiosError): string =>
	error.response && error.response.data
		? typeof error.response.data === 'object'
			? (error.response.data as { message: string }).message
			: (error.response.data as string)
		: error.message
