import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IAppStore {
	sidebar: string
	mode: string
	language: string
	toggleLanguage: (l: string) => void
	toggleSidebar: (s: string) => void
	toggleMode: (m: string) => void
}

export const useAppStore = create<IAppStore>()(
	persist(
		set => ({
			sidebar: 'NORMAL',
			mode: 'LIGHT',
			language: 'ru',

			toggleLanguage: (value: string) => {
				set({
					language: value
				})
			},
			toggleSidebar: (value: string) => {
				set({
					sidebar: value
				})
			},
			toggleMode: (value: string) => {
				set({
					mode: value
				})
			}
		}),
		{
			name: 'applicationSetting'
		}
	)
)
