import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogTitle
} from '@/components/ui/dialog'

interface ICustomModal {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	title?: string
	subTitle?: string
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
	children: React.ReactNode
}

export function CustomModal(props: ICustomModal) {
	return (
		<Dialog open={props.isOpen} onOpenChange={props.setIsOpen}>
			<DialogContent
				aria-description='describedby'
				aria-describedby='content_modal'
				size={props.size}
			>
				<DialogTitle className='text-md uppercase text-gray-600'>
					{props.title}
				</DialogTitle>

				<DialogDescription>{props.subTitle}</DialogDescription>
				<div className='text-sm'>{props.children}</div>
			</DialogContent>
		</Dialog>
	)
}
