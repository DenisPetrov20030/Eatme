import { Suspense } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/login/LoginPage'
import RegistrationPage from './pages/login/RegistrationPage'
import ProductDetailPage from './pages/product/ProductDetailPage'
import AuthProvider from './providers/AuthProvider'
import CartPage from './pages/product/CartPage'
import SearchPage from './pages/product/SearchPage'
import Layout from './components/Layout'
import CategoryPage from './pages/product/CategoryPage'
import WishlistPage from './pages/product/WishlistPage'
import ProfilePage from './pages/profile/ProfilePage'
import AdminDashboardPage from './pages/dashboard/AdminDashboardPage'
import CookieConsent from 'react-cookie-consent';


function App() {
  const queryClient = new QueryClient()
  const browserRouter = createBrowserRouter([{
    errorElement: <ErrorPage/>,
    children: [
        {
            path: '/',
            element: <Suspense children={<HomePage />} />,
        },
        {
            path: '/log-in',
            element: <Suspense children={<LoginPage />} />,
        },
        {
            path: '/register',
            element: <Suspense children={<RegistrationPage />} />,
        },
        {
            path: '/product/:id',
            element: <Suspense children={<ProductDetailPage />} />,
        },
        {
            path: '/cart',
            element: <Suspense children={<CartPage />} />,
        },
        {
            path: '/dashboard',
            element: <Suspense children={<AdminDashboardPage />} />,
        },
        {
            path: '/wishlist',
            element: <Suspense children={<WishlistPage />} />,
        },
        {
            path: '/profile/:nav',
            element: <Suspense children={<ProfilePage />} />,
        },
        {
            path: '/search',
            element: (
                <Layout>
                    <Suspense children={<SearchPage />} />
                </Layout>
            ),
        },
        {
          path: '/category',
          element: (
            <Layout>
              <Suspense fallback={<div>Loading...</div>}>
                <CategoryPage />
              </Suspense>
            </Layout>
          ),
        },
    ]
}])
  return (
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
        <CookieConsent
          location="bottom"
          buttonText="Accept"
          cookieName="userConsent"
          expires={365}
          style={{ background: "#000", color: "#fff" }}
          buttonStyle={{
            backgroundColor: "#f1d600",
            color: "#000",
            fontSize: "13px",
            borderRadius: "5px",
            padding: "10px 20px",
          }}
          onAccept={() => {
            // alert("Accept was triggered by clicking the Accept button");
          }}
        >
          This website uses cookies to enhance the user experience.{" "}
        </CookieConsent>
    <RouterProvider router={browserRouter} />
        </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
