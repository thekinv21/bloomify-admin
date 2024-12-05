import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IAppStore {
	sidebar: string
	mode: string
	language: string
	animation: string
	toggleLanguage: (l: string) => void
	toggleSidebar: (s: string) => void
	toggleAnimation: (a: string) => void
	toggleMode: (m: string) => void
}

export const useAppStore = create<IAppStore>()(
	persist(
		set => ({
			sidebar: 'NORMAL',
			mode: 'LIGHT',
			animation: '',
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
			},
			toggleAnimation: (value: string) => {
				set({
					animation: value
				})
			}
		}),
		{
			name: 'applicationSetting'
		}
	)
)
