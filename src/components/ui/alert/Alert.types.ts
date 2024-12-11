import { SweetAlertIcon } from 'sweetalert2'

export interface IAlert {
	title?: string
	subTitle?: string
	confirmText?: string
	cancelText?: string
	isConfirmAlert?: boolean
	icon?: 'warning' | 'error' | 'success' | 'info'
	action?: () => Promise<void>
	actionLoader?: boolean
	setActionLoader?: (v: boolean) => void
}

export interface IAlertNotification {
	icon: SweetAlertIcon
	message: string
	customClass: string
	width?: number
}
