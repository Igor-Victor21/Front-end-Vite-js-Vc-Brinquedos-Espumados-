import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import Login from './Login.jsx'
import UserAdmin from './UserAdmin.jsx'
import User from './User.jsx'
import CreateUsers from './CreateUsers.jsx'
import CreateProducts from './CreateProducts.jsx'
import UsersList from './UsersList.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/UserAdmin' element={<UserAdmin/>}/>
        <Route path='/User' element={<User/>}/>
        <Route path='/CreateUsers' element={<CreateUsers/>}/>
        <Route path='/CreateProducts' element={<CreateProducts/>}/>
        <Route path='/UsersList' element={<UsersList/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)