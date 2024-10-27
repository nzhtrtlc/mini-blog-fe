import { createBrowserRouter, RouteObject } from 'react-router-dom'
import { lazy } from 'react'

// Layouts
import RootLayout from './layouts/RootLayout'
import AdminLayout from './layouts/AdminLayout'

// Pages
const HomePage = lazy(() => import('./pages/Home'))
const PostPage = lazy(() => import('@/pages/Post'))
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'))
// const PostEditor = lazy(() => import('@/pages/admin/PostEditor'));
const NotFound = lazy(() => import('./pages/NotFound'))

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout/>,
    children: [
      {
        index: true,
        element: <HomePage/>
      },
      {
        path: 'post/:slug',
        element: <PostPage/>
      },
      {
        path: 'admin',
        element: <AdminLayout/>,
        children: [
          {
            index: true,
            element: <AdminDashboard/>
          },
          // {
          //   path: 'posts/new',
          //   element: <PostEditor />
          // },
          // {
          //   path: 'posts/edit/:slug',
          //   element: <PostEditor />
          // }
        ]
      },
      {
        path: '*',
        element: <NotFound/>
      }
    ]
  }
]

export const router = createBrowserRouter(routes)
