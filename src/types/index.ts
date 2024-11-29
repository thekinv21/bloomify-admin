import { ICustomResponse } from '@/types/custom.types'
import { IRoute } from '@/types/routes.types'

import {
	IGetMeResponse,
	ILoginRequest,
	ILoginResponse,
	ILogoutRequest,
	IRegisterRequest,
	IRegisterResponse
} from './auth.types'
import { ICreateUserRequest, IUpdateUserRequest, IUser } from './user.types'

export type {
	ICreateUserRequest,
	ICustomResponse,
	IGetMeResponse,
	ILoginRequest,
	ILoginResponse,
	ILogoutRequest,
	IRegisterRequest,
	IRegisterResponse,
	IRoute,
	IUpdateUserRequest,
	IUser
}
