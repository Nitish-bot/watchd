import '@/styles/tailwind.css'
import Home from '@/components/pages/Home'
import Onboard from '@/components/pages/Onboard/index'
import Unlock from '@/components/pages/Unlock'
import { Route, Routes } from 'react-router-dom'
import CreateWallet from '@/components/pages/Onboard/CreateWallet'
import { useTheme } from '@/providers/theme-provider'
import Verify from '@/components/pages/Onboard/Verify'
import SetupPassword from '@/components/pages/Onboard/SetupPassword'

function App() {
  const { theme, setTheme } = useTheme()
  if (theme == 'system') {
    setTheme('dark')
  }

  return (
    <div className="bg-primary h-full">
      <Routes>
        <Route index element={<Unlock />}></Route>
        <Route path="onboard" element={<Onboard />}></Route>
        <Route path="onboard/create" element={<CreateWallet />}></Route>
        <Route path="onboard/verify" element={<Verify />}></Route>
        <Route path="onboard/setupPassword" element={<SetupPassword />}></Route>
        <Route path="home" element={<Home />}></Route>
      </Routes>
    </div>
  )
}

export default App
