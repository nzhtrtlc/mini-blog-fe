import { Suspense } from 'react'
import { Navigate, NavLink, Outlet } from 'react-router-dom'

// Bu kısmı daha sonra gerçek auth logic ile değiştireceğiz
const isAuthenticated = true // Temporarily hardcoded

const AdminLayout = () => {
  // Basic auth check
  if (!isAuthenticated) {
    return <Navigate to="/" replace/>
  }

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Sidebar */}
      <aside className="col-span-2 bg-gray-50 min-h-[calc(100vh-4rem)] p-4">
        <nav className="space-y-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/posts/new"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg ${isActive ? 'bg-gray-200' : 'hover:bg-gray-100'}`
            }
          >
            New Post
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="col-span-10 p-4">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"/>
          </div>
        }>
          <Outlet/>
        </Suspense>
      </main>
    </div>
  )
}

export default AdminLayout
