import './App.css'
import { ToastContainer } from 'react-toastify'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Register } from './components/auth/Register'
import { Login } from './components/auth/Login'
import {Home} from './pages/Home'
import PrivateRoutes from './components/private/PrivateRoutes'
import AdminRoutes from './components/private/AdminRoutes'
import { Layout } from './components/layout/Layout'
import { Profile } from './pages/Profile'

import DashboardHome from './pages/Admin/DashboardHome'
import { Users } from './pages/Admin/Users'
import { Products } from './pages/Admin/Products'
import { Categories } from './pages/Admin/Categories'
import {CategoryProducts} from './pages/CategoryProducts'
import {Shop} from './pages/Shop'
import { ProductDetails } from './pages/ProductDetails'
import { Cart } from './pages/Cart'

function App() {
  return (
    <>
    <BrowserRouter>
    <Layout>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path='/admin' element={<AdminRoutes>
          <DashboardHome/>
        </AdminRoutes>}/>
        <Route path='/admin/users' element={<AdminRoutes>
          <Users/>
        </AdminRoutes>}/>
        <Route path='/admin/products' element={<AdminRoutes>
          <Products/>
        </AdminRoutes>}/>
        <Route path='/admin/categories' element={<AdminRoutes>
          <Categories/>
        </AdminRoutes>}/>


        <Route path='/signup' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/category/:id' element={<CategoryProducts/>}/>
        <Route path='/shop' element={<Shop/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>

        <Route path="/" element={<Home/>}/>
        <Route path="/profile" element={<PrivateRoutes><Profile/></PrivateRoutes>}/>
      </Routes>
    </Layout>
    </BrowserRouter>
    </>
  )
}

export default App
