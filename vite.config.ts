import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src')
		}
	},

	css: {
		preprocessorOptions: {
			scss: {
				silenceDeprecations: ['legacy-js-api']
			}
		}
	},

	build: {
		chunkSizeWarningLimit: 600,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						const parts = id.split('node_modules/')[1]
						const packageName = parts.split('/')[0]

						if (packageName !== '.pnpm') {
							return packageName
						}

						const nestedParts = parts.split('/')
						const name =
							nestedParts[1]?.split('@')[nestedParts[1]?.[0] === '@' ? 1 : 0]
						return name || 'vendor'
					}
				}
			}
		}
	}
})
