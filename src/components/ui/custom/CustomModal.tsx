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
				className='pointer-events-none'
			>
				<DialogTitle className='text-md uppercase text-gray-600'>
					{props.title}
				</DialogTitle>

				<DialogDescription>{props.subTitle}</DialogDescription>
				<div className='border-none text-sm outline-none focus-within:border-none focus:border-none focus:outline-none'>
					{props.children}
				</div>
			</DialogContent>
		</Dialog>
	)
}
