import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { BaseProvider } from '@/provider/BaseProvider'

import './index.scss'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BaseProvider />
	</StrictMode>
)
