import { FlowerIcon } from 'lucide-react'

import { BreadCrumb } from '@/components/ui'

export function FlowerList() {
	return (
		<>
			<BreadCrumb
				linksArray={[
					{
						link: '#',
						title: 'flowers',
						icon: <FlowerIcon size={16} />
					}
				]}
			/>
		</>
	)
}
