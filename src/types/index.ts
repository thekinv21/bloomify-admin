import { AlertCustomEnum, AlertMessageEnum } from '@/types/custom.enum'
import { ICustomResponse } from '@/types/custom.types'
import { IRoute } from '@/types/routes.types'

import {
	ICreateRoleRequest,
	IRole,
	IUpdateRoleRequest
} from './admin/role.types'
import {
	ICreateUserRequest,
	IUpdateUserRequest,
	IUser
} from './admin/user.types'
import {
	IGetMeResponse,
	ILoginRequest,
	ILoginResponse,
	ILogoutRequest,
	IOtpRequest,
	IRegisterRequest,
	IRegisterResponse
} from './auth.types'

export type {
	AlertCustomEnum,
	AlertMessageEnum,
	ICreateRoleRequest,
	ICreateUserRequest,
	ICustomResponse,
	IGetMeResponse,
	ILoginRequest,
	ILoginResponse,
	ILogoutRequest,
	IOtpRequest,
	IRegisterRequest,
	IRegisterResponse,
	IRole,
	IRoute,
	IUpdateRoleRequest,
	IUpdateUserRequest,
	IUser
}
