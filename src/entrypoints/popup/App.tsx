import '@/tailwind.css'
import Home from '@/components/Home'
import SignUp from '@/components/SignUp'
import { HashRouter, Route, Routes } from 'react-router'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route index element={<Home />}></Route>
        <Route path="signup" element={<SignUp />}></Route>
      </Routes>
    </HashRouter>
  )
}

export default App
