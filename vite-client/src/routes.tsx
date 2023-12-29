import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import ChangePassword from './pages/ChangePassword';
const HomePage = lazy(() => import('./pages/Home'));
const NotFoundPage = lazy(() => import('./pages/NotFound'));
const AuthenticationLayout = lazy(
  () => import('./layouts/AuthenticationLayout'),
);
const AppLayout = lazy(() => import('./layouts/AppLayout'));
const LoginPage = lazy(() => import('./pages/authentication/Login'));
const RegisterPage = lazy(() => import('./pages/authentication/Register'));
const ResetPasswordPage = lazy(
  () => import('./pages/authentication/ResetPassword'),
);
const AppIndexPage = lazy(() => import('./pages/app/Index'));
const routes = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
  {
    path: '/authentication',
    element: <AuthenticationLayout />,
    children: [
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'reset_password', element: <ResetPasswordPage /> },
    ],
  },
  {
    path: '/app',
    element: <AppLayout />,
    children: [{ element: <AppIndexPage />, index: true }],
  },
  {
    path: "/change_password/:reset_token",
    element: <ChangePassword />
  }
]);

export default routes;
