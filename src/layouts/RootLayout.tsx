import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import { Footer, Navbar } from '../components'

const RootLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0F1620] text-white/80">
      <Navbar/>
      <main className="flex-grow container mx-auto px-4 py-8 pt-16">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"/>
          </div>
        }>
          <Outlet/>
        </Suspense>
      </main>
      <Footer/>
    </div>
  )
}

export default RootLayout
