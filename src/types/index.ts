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
	IRegisterRequest,
	IRegisterResponse
} from './auth.types'

export type {
	ICreateRoleRequest,
	ICreateUserRequest,
	ICustomResponse,
	IGetMeResponse,
	ILoginRequest,
	ILoginResponse,
	ILogoutRequest,
	IRegisterRequest,
	IRegisterResponse,
	IRole,
	IRoute,
	IUpdateRoleRequest,
	IUpdateUserRequest,
	IUser
}
