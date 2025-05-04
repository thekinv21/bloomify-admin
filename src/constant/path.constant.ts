export const pathConstant = {
	initial: '/',
	login: '/auth/login',
	register: '/auth/register',
	home: '/dashboard',
	flowers: '/flowers',
	createFlower: '/flowers/create',
	editFlower: '/flowers/edit/:id',
	user: '/admin/user',
	role: '/admin/role'
} as const
