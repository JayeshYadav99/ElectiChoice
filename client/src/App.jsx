import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from "react-router-dom"
import Home from './Pages/Home'
import Navbar from './Components/Navbar'
import Login from './Components/Auth/Login'
import Signup from './Components/Auth/Signup'
import ProtectedRoutes from "./Pages/ProtectedRoutes";
import PrivateRoutes from './Pages/PrivateRoutes'
import ErrorBoundary from './Pages/ErrorBoundary'

function App() {
  const [count, setCount] = useState(0)
  // const token = cookies.get("TOKEN");
  return (
<>
<Navbar/>
<Routes>

  <Route element={<PrivateRoutes/>}>
    <Route path='Home'element={<Home/>}></Route>

  </Route>

  <Route path="/Login" element={<Login/>}></Route>
  <Route path="/Signup" element={<Signup/>}></Route>
</Routes>
</>
  )
}

export default App
