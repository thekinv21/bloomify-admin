import { IUser } from './admin/user.types'

export interface ILoginResponse {
	accessToken: string
	user: IUser
}

export interface IGetMeResponse {
	user: IUser
}

export interface IRegisterResponse {
	user: IUser
}

export interface ILoginRequest {
	username: string
	password: string
}

export interface IRegisterRequest {
	username: string
	email: string
	firstName?: string
	lastName?: string
	password: string
	avatarPath?: string
	isActive?: boolean
}

export interface ILogoutRequest {
	token: string
}
