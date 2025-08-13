import { Suspense, lazy, useContext, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import Loading from '@/components/Loading'
import { path } from '@/constants/path'
import { AppContext } from '@/contexts/AppContext'
import MainLayout from '@/layouts/MainLayout'
import SubLayout from '@/layouts/SubLayout'
import CheckoutSuccess from '@/pages/CheckoutSuccess'
import ErrorPage from '@/pages/ErrorPage'
import LoginSuccess from '@/pages/LoginSuccess'
import RegisterSuccess from '@/pages/RegisterSuccess'

const lazyComponents = {
  Cart: lazy(() => import('@/pages/Cart')),
  Category: lazy(() => import('@/pages/Category')),
  ChangePassword: lazy(() => import('@/pages/ChangePassword')),
  ChangeEmail: lazy(() => import('@/pages/ChangeEmail')),
  Checkout: lazy(() => import('@/pages/Checkout')),
  Home: lazy(() => import('@/pages/Home')),
  Login: lazy(() => import('@/pages/Login')),
  Order: lazy(() => import('@/pages/Order')),
  ProductList: lazy(() => import('@/pages/ProductList')),
  Product: lazy(() => import('@/pages/Product')),
  Profile: lazy(() => import('@/pages/Profile')),
  Register: lazy(() => import('@/pages/Register')),
  ForgotPassword: lazy(() => import('@/pages/ForgotPassword')),
  Search: lazy(() => import('@/pages/Search')),
  Subcategory: lazy(() => import('@/pages/Subcategory')),
  ProductComparison: lazy(() => import('@/pages/ProductComparison'))
}

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
}

function createRouteElement(ComponentName, Layout = MainLayout, setProgress) {
  const Component = lazyComponents[ComponentName]
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Component setProgress={setProgress} />
      </Suspense>
    </Layout>
  )
}

function createRoutes(routeConfigs, Layout = MainLayout, setProgress) {
  return routeConfigs.map(({ path: routePath, component }) => ({
    path: routePath,
    element: createRouteElement(component, Layout, setProgress)
  }))
}

function Routes() {
  const [progress, setProgress] = useState(0)

  // Public routes configuration
  const publicRoutes = [
    { path: path.home, component: 'Home' },
    { path: path.productList, component: 'ProductList' },
    { path: path.product, component: 'Product' },
    { path: path.category, component: 'Category' },
    { path: path.subcategory, component: 'Subcategory' },
    { path: path.search, component: 'Search' },
    { path: path.comparison, component: 'ProductComparison' }
  ]

  // Protected routes configuration
  const protectedRoutes = [
    { path: path.cart, component: 'Cart' },
    { path: path.checkout, component: 'Checkout' },
    { path: path.order, component: 'Order' },
    { path: path.profile, component: 'Profile' },
    { path: path.changePassword, component: 'ChangePassword' },
    { path: path.changeEmail, component: 'ChangeEmail' }
  ]

  // Auth routes configuration (login, register, etc.)
  const authRoutes = [
    { path: path.login, component: 'Login' },
    { path: path.register, component: 'Register' },
    { path: path.forgotPassword, component: 'ForgotPassword' }
  ]

  // Success pages (no layout needed)
  const successPages = [
    { path: path.loginSuccess, element: <LoginSuccess /> },
    { path: path.registerSuccess, element: <RegisterSuccess /> },
    { path: path.checkoutSuccess, element: <CheckoutSuccess /> }
  ]

  const routeConfig = [
    {
      path: path.home,
      index: true,
      element: createRouteElement('Home', MainLayout, setProgress)
    },
    ...createRoutes(publicRoutes.slice(1), MainLayout, setProgress),
    {
      path: '',
      element: <ProtectedRoute />,
      children: createRoutes(protectedRoutes, MainLayout, setProgress)
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: createRoutes(authRoutes, SubLayout, setProgress)
    },
    ...successPages
  ]

  const element = useRoutes(routeConfig)

  return (
    <div>
      <LoadingBar
        color='#337AB7'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <ErrorBoundary fallback={<ErrorPage />}>
        {element}
      </ErrorBoundary>
    </div>
  )
}

export default Routes