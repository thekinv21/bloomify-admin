import { t } from 'i18next'
import Swal from 'sweetalert2'

import './Alert.scss'
import { IAlert, IAlertNotification } from './Alert.types'

/* 

	1) AlertNotification: it's notification for show after crud
	2) Alert: alert modal for confirming crud's
	3) import "./Alert.scss" custom styles for sweet alerts2

*/

export function AlertNotification(props: IAlertNotification) {
	const notification = Swal.mixin({
		toast: true,
		position: 'top',
		icon: props.icon,
		showConfirmButton: false,
		timer: 4000,
		showCloseButton: false,
		customClass: {
			popup: props.customClass
		},
		width: props.width ? props.width : 500
	})
	notification.fire({
		title: props.message?.slice(0, 50) + '...'
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
			title: props.title ?? `${t(`are_you_sure`)}`,
			text: props.subTitle ?? `${t(`are_yor_sure_confirm`)}`,
			icon: props.icon ?? 'warning',
			confirmButtonText: props.confirmText ?? `${t(`yes`)}`,
			cancelButtonText: props.cancelText ?? `${t(`no`)}`,
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
