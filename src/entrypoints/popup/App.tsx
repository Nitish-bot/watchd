import '@/styles/tailwind.css'
import Home from '@/components/pages/Home'
import Onboard from '@/components/pages/Onboard/index'
import Unlock from '@/components/pages/Unlock'
import { Route, Routes } from 'react-router-dom'
import CreateWallet from '@/components/pages/Onboard/CreateWallet'

function App() {
  return (
    <Routes>
      <Route index element={<Unlock />}></Route>
      <Route path="onboard" element={<Onboard />}>
        <Route path="create" element={<CreateWallet />}></Route>
      </Route>
      <Route path="home" element={<Home />}></Route>
    </Routes>
  )
}

export default App
