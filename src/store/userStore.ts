import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { ILoginResponse, IUser } from '@/types'

interface IUserStore {
	user: IUser | null
	accessToken: string | null
	saveUserToStore: (data: ILoginResponse) => void
	removeUserFromStore: () => void
}

export const useUserStore = create<IUserStore>()(
	persist(
		set => ({
			user: null,
			accessToken: null,
			saveUserToStore: (data: ILoginResponse) =>
				set({
					user: data.user,
					accessToken: data.accessToken
				}),

			removeUserFromStore: () => {
				set({
					user: null,
					accessToken: null
				})
			}
		}),
		{
			name: 'systemUser'
		}
	)
)

useUserStore.persist.setOptions({
	storage: createJSONStorage(() => sessionStorage)
})
