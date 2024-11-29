import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.scss'
import { BaseProvider } from '@/provider/BaseProvider'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<BaseProvider />
	</StrictMode>
)
