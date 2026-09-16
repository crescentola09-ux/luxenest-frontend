import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import Home from './Pages/Home'
import Properties from './Pages/Properties'
import Login from './Pages/Login'
import Signup from './Pages/SignUp'
import PropertyDetails from './Pages/PropertyDetails'
import Users from './Pages/Admin/Users'
import Settings from './Pages/Admin/Settings'
import About from './Pages/About'
import Contact from './Pages/Contact'

import Dashboard from './Pages/Admin/Dashboard'
import AddProperty from './Pages/Admin/AddProperty'
import AdminProperties from './Pages/Admin/AdminProperties'
import EditProperty from './Pages/Admin/EditProperty'
import AdminPropertyDetails from './Pages/Admin/AdminPropertyDetails'
import Inquiries from './Pages/Admin/Inquiries'
import UserDetails from './Pages/Admin/UserDetails'

import AdminRoute from './AdminRoute'
import ProtectRoute from './Components/ProtectRoute'

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar/> */}
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<ProtectRoute><Properties /></ProtectRoute>} />
        <Route path="/properties/:id" element={ <ProtectRoute><PropertyDetails /></ProtectRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={ <AdminRoute> <Dashboard /> </AdminRoute>}/>       
         <Route path="/add-property" element={ <AdminRoute>  <AddProperty /> </AdminRoute> }/>
        <Route path="/admin/properties"  element={<AdminRoute><AdminProperties /> </AdminRoute> }/>
        <Route path="/admin/properties/edit/:id" element={<AdminRoute><EditProperty /></AdminRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="/admin/properties/:id" element={<AdminRoute><AdminPropertyDetails /></AdminRoute>}/>
        <Route path="/inquiries" element={<AdminRoute><Inquiries /></AdminRoute>}/>
        <Route path="/users" element={<AdminRoute><Users /></AdminRoute>}/>
        <Route path="/users/:id" element={<AdminRoute><UserDetails /></AdminRoute>}/>
      <Route path="/settings" element={<AdminRoute><Settings /></AdminRoute>}/>
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<ProtectRoute><Contact /></ProtectRoute>} />
      {/* <Route path="/faq" element={<FAQ />} /> */}
      {/* <Route path="/terms" element={<Terms />} /> */}
      {/* <Route path="/privacy" element={<Privacy />} /> */}
       </Routes>

    </BrowserRouter>
  
  
  )
}

export default App
