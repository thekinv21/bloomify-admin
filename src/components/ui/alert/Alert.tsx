import Swal from 'sweetalert2'

import './Alert.scss'
import { IAlert, IAlertNotification } from './Alert.types'
import i18n from '@/i18n'

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
			title: props.title ?? i18n.t('are_you_sure'),
			text: props.subTitle ?? i18n.t('are_yor_sure_confirm'),
			icon: props.icon ?? 'warning',
			confirmButtonText: props.confirmText ?? i18n.t('yes'),
			cancelButtonText: props.cancelText ?? i18n.t('no'),
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
