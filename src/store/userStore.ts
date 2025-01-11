import Cookies from 'js-cookie'
import { create } from 'zustand'
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware'

import { ILoginResponse, IUser } from '@/types'
import { TokenEnum } from '@/types/custom.enum'

interface IUserStore {
	user: IUser | null
	accessToken: string | null
	refreshToken: string | null
	tokenSign: string | null
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
		const expireMinute = 60 * 24 * 30
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
			refreshToken: null,
			tokenSign: null,
			saveUserToStore: (data: ILoginResponse) => {
				const cookie = Cookies?.get(TokenEnum.USER)
				const cookieObject = cookie ? JSON.parse(cookie) : null

				const accessToken = cookieObject
					? JSON.parse(cookieObject?.value)?.state?.accessToken
					: null

				const user = cookieObject
					? JSON.parse(cookieObject?.value)?.state?.user
					: null

				const refreshToken = cookieObject
					? JSON.parse(cookieObject?.value)?.state?.refreshToken
					: null

				const tokenSign = cookieObject
					? JSON.parse(cookieObject?.value)?.state?.tokenSign
					: null

				set({
					user: data.user || user,
					accessToken: data.accessToken || accessToken,
					refreshToken: data.refreshToken || refreshToken,
					tokenSign: data.tokenSign || tokenSign
				})
			},
			removeUserFromStore: () =>
				set({
					user: null,
					accessToken: null,
					refreshToken: null,
					tokenSign: null
				})
		}),
		{
			name: 'user',
			storage: createJSONStorage(() => cookiesStorage)
		}
	)
)
