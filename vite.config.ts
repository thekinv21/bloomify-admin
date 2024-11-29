import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
		},
	},

	css: {
		preprocessorOptions: {
			scss: {
				silenceDeprecations: ['legacy-js-api'],
			},
		},
	},
})
