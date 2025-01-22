import { ColumnDef } from '@tanstack/react-table'
import { useMemo } from 'react'

import { IFlower } from '@/types'

export const FlowerDataTableColumns = () => {
	const columns = useMemo<ColumnDef<IFlower>[]>(() => [], [])

	return {
		columns
	}
}
