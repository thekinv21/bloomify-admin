export interface IRole {
	createdAt: Date
	updateAt: Date
	id: number
	name: string
	isActive: boolean
}

export interface ICreateRoleRequest {
	name: string
	isActive: boolean
}

export interface IUpdateRoleRequest extends ICreateRoleRequest {
	id: number
}
