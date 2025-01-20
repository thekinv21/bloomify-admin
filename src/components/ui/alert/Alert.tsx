import Swal from 'sweetalert2'

import './Alert.scss'
import { IAlert, IAlertNotification } from './Alert.types'

export function AlertNotification(props: IAlertNotification) {
	const notification = Swal.mixin({
		toast: true,
		position: 'top',
		icon: props.icon,
		showConfirmButton: false,
		timer: 4000,
		showCloseButton: false,
		customClass: {
			popup: props.customClass,
			title: 'swal2-custom-title'
		},
		width: props.width ?? 'auto'
	})
	notification.fire({
		title: props.message?.toString() + '...'
	})
}

export function Alert(props: IAlert) {
	const sweetAlert = Swal.mixin({
		customClass: {
			confirmButton: 'alert-confirm-btn',
			cancelButton: 'alert-cancel-btn',
			popup: 'sweet-alerts'
		},
		buttonsStyling: false
	})
	sweetAlert
		.fire({
			title: props.title ?? `Are you sure?`,
			text: props.subTitle ?? 'You wanna continue this action?',
			icon: props.icon ?? 'warning',
			confirmButtonText: props.confirmText ?? `Confirm`,
			cancelButtonText: props.cancelText ?? `Cancel`,
			reverseButtons: true,
			showConfirmButton: props.isConfirmAlert ?? true,
			showCancelButton: props.isConfirmAlert ?? true,
			padding: '2em'
		})
		.then(result => {
			if (result.isConfirmed && props.action) {
				if (props?.setActionLoader) {
					props.setActionLoader(true)
				}
				props.action()
			}
		})
}
