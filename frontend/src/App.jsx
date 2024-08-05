import { Route, Routes, Navigate } from 'react-router-dom'

import { Header, Success } from './components'
import { AuthPage, CartPage, CheckOutPage, HomePage, Product, ProfilePage } from './pages'
import { useRecoilValue } from 'recoil'
import userAtom from './atom/userAtom'

function App() {
  const user = useRecoilValue(userAtom)

  return (
    <div>
      {user && <Header />}
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to="/auth" />} />
        <Route path="/auth" element={!user ? <AuthPage /> : <Navigate to="/" />} />
        <Route path="/:username" element={user ? <ProfilePage /> : <Navigate to="/auth" />} />
        <Route path="/product/:id" element={user ? <Product /> : <Navigate to="/auth" />} />
        <Route path="/cart" element={user ? <CartPage /> : <Navigate to="/auth" />} />
        <Route path="/cart/checkout" element={user ? <CheckOutPage /> : <Navigate to="/auth" />} />
        <Route path="/success" element={user ? <Success /> : <Navigate to="/auth" />} />
      </Routes>
    </div>
  )
}

export default App
