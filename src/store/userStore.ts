import Cookies from 'js-cookie'
import { create } from 'zustand'
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware'

import { ILoginResponse, IUser } from '@/types'
import { TokenEnum } from '@/types/custom.enum'

interface IUserStore {
	user: IUser | null
	accessToken: string | null
	saveUserToStore: (data: ILoginResponse) => void
	removeUserFromStore: () => void
}

const cookiesStorage: StateStorage = {
	getItem: (name: string) => {
		const value = Cookies.get(name)
		if (!value) return null

		try {
			const parsedValue = JSON.parse(value)
			if (parsedValue.expires && new Date(parsedValue.expires) < new Date()) {
				Cookies.remove(name)
				return null
			}

			return parsedValue.data
		} catch (error) {
			console.error('Error parsing cookie:', error)
			return null
		}
	},

	setItem: (name: string, value: string) => {
		const expireMinute = 60
		const expireDate = new Date(new Date().getTime() + expireMinute * 60 * 1000)

		Cookies.set(
			name,
			JSON.stringify({
				value,
				expires: expireDate
			}),
			{ expires: expireDate }
		)
	},

	removeItem: (name: string) => {
		Cookies.remove(name)
	}
}

export const useUserStore = create<IUserStore>()(
	persist(
		set => ({
			user: null,
			accessToken: null,
			saveUserToStore: (data: ILoginResponse) => {
				const cookie = Cookies?.get(TokenEnum.USER)
				const cookieObject = cookie ? JSON.parse(cookie) : null

				const accessToken = cookieObject
					? JSON.parse(cookieObject?.value)?.state?.accessToken
					: null

				const user = cookieObject
					? JSON.parse(cookieObject?.value)?.state?.user
					: null

				set({
					user: data.user || user,
					accessToken: data.accessToken || accessToken
				})
			},
			removeUserFromStore: () =>
				set({
					user: null,
					accessToken: null
				})
		}),
		{
			name: 'user',
			storage: createJSONStorage(() => cookiesStorage)
		}
	)
)
