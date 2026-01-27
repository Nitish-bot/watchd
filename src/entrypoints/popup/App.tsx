import '@/styles/tailwind.css'
import Home from '@/components/Home'
import SignIn from '@/components/SignIn'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route index element={<Home />}></Route>
      <Route path="signup" element={<SignIn />}></Route>
    </Routes>
  )
}

export default App
