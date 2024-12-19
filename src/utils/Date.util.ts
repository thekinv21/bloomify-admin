export function DateFormat(date: string[] | string | null): string {
	if (!date) return ''
	const parseDate = (d: string) => {
		const parsedDate = new Date(d)
		if (isNaN(parsedDate.getTime())) throw new Error('Invalid date format')
		return parsedDate
	}

	const formatDate = (d: Date) => {
		return (
			d.getFullYear() +
			'/' +
			String(d.getMonth() + 1).padStart(2, '0') +
			'/' +
			String(d.getDate()).padStart(2, '0') +
			'T' +
			String(d.getHours()).padStart(2, '0') +
			':' +
			String(d.getMinutes()).padStart(2, '0') +
			':' +
			String(d.getSeconds()).padStart(2, '0') +
			'.' +
			String(d.getMilliseconds()).padStart(3, '0') +
			'000'
		)
	}

	if (Array.isArray(date)) {
		return formatDate(parseDate(date[0]))
	}

	return formatDate(parseDate(date))
}

export function DateShowFormat(date: string | string[]): string {
	if (!date) return ''
	const parseDate = (d: string) => {
		const parsedDate = new Date(d)
		if (isNaN(parsedDate.getTime())) throw new Error('Invalid date format')
		return parsedDate
	}

	const formatDate = (d: Date) => {
		return (
			String(d.getDate()).padStart(2, '0') +
			'/' +
			String(d.getMonth() + 1).padStart(2, '0') +
			'/' +
			d.getFullYear() +
			' ' +
			String(d.getHours()).padStart(2, '0') +
			':' +
			String(d.getMinutes()).padStart(2, '0') +
			':' +
			String(d.getSeconds()).padStart(2, '0')
		)
	}

	if (Array.isArray(date)) {
		return formatDate(parseDate(date[0]))
	}

	return formatDate(parseDate(date))
}
