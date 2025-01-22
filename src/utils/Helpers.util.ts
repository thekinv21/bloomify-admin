export const isArrayNotEmpty = <T>(arr: T[]): boolean => {
	return Array.isArray(arr) && arr.length > 0
}

export const isObjectNotEmpty = <T>(obj: Record<string, T>): boolean => {
	return Object.keys(obj).length > 0
}

export const isStringNotEmpty = (str: string): boolean => {
	return str.trim() !== ''
}

export const isNumber = (num: number): boolean => {
	return !isNaN(num)
}

export const isValueBoolean = (bool: boolean): boolean => {
	return typeof bool === 'boolean'
}

export const isNotNull = <T>(value: T): boolean => {
	return value !== null
}
