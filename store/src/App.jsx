import { useContext, useEffect } from 'react'
import { Toaster } from 'sonner'
import ScrollToTop from '@/components/ScrollToTop'
import { AppContext } from '@/contexts/AppContext'
import Routes from '@/routes/Routes'
import { LocalStorageEventTarget } from '@/utils/auth'
import { ComparisonProvider } from '@/contexts/ComparisonContext'
import ComparisonBar from '@/components/ComparisonBar'

function App() {
  const { reset } = useContext(AppContext)
  useEffect(() => {
    LocalStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      LocalStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <>
      <ComparisonProvider>
        <ScrollToTop />
        <Routes />
        <ComparisonBar />
        <Toaster richColors />
      </ComparisonProvider>
    </>
  )
}

export default App
