export interface IUser {
	createdAt: Date
	updateAt: Date
	id: string
	firstName: string
	lastName: string
	username: string
	email: string
	avatarPath: string
	isActive: boolean
	roles: string[]
}

export interface ICreateUserRequest {
	firstName: string
	lastName: string
	username: string
	email: string
	password: string
	avatarPath?: string
	isActive?: boolean
	roles?: string[]
}

export interface IUpdateUserRequest extends ICreateUserRequest {
	id: string
}
