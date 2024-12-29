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

	build: {
		chunkSizeWarningLimit: 600,
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes('node_modules')) {
						const modulePath = id.split('node_modules/')[1]
						const parts = modulePath.split('/')

						if (parts[0] !== '.pnpm') {
							return parts[0]
						}

						const scopedPackageName = parts[1]
						const chunkName =
							scopedPackageName.split('@')[
								scopedPackageName.startsWith('@') ? 1 : 0
							]

						if (
							chunkName &&
							chunkName !== 'detect-node-es' &&
							chunkName !== 'dom-helpers' &&
							chunkName !== 'html-parse-stringify' &&
							chunkName !== 'set-cookie-parser' &&
							chunkName !== 'turbo-stream' &&
							chunkName !== 'void-elements'
						) {
							return chunkName
						}

						return null
					}

					return null
				}
			}
		}
	}
})
