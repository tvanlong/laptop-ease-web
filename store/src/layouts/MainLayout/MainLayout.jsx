import Footer from '@/components/Footer'
import Header from '@/components/Header'
import SidebarMenu from '@/components/SidebarMenu'

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <SidebarMenu />
      <main className="container mx-auto px-4">
        {children}
      </main>
      <Footer />
    </>
  )
}

export default MainLayout
