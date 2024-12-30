import React from 'react'

import NotFoundPage from '@/screens/error/NotFound'

const LoginPage = React.lazy(() => import('@/screens/auth/login'))
const RolesPage = React.lazy(() => import('@/screens/admin/role'))
const UserPage = React.lazy(() => import('@/screens/admin/user'))
const HomePage = React.lazy(() => import('@/screens/home'))

export { HomePage, LoginPage, NotFoundPage, RolesPage, UserPage }
