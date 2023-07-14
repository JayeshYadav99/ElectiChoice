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
import Homepage from './Pages/HomePage'
import StudentHome from './Pages/StudentHome'
import StudentForm from './Components/Student/StudentForm'
import EditStudent from './Components/Student/EditStudent'
import SubjectNavbar from  './Components/SubjectNavbar'
import SubjectHome from './Pages/SubjectHome'
import EditSubject from './Components/Subject/EditSubject'
import SubjectForm from './Components/Subject/SubjectForm'

function App() {
  const [count, setCount] = useState(0)
  // const token = cookies.get("TOKEN");
  return (
<>


<Routes>

<Route path="/" element={<Homepage/>}>
  
</Route>

<Route path="/Login" element={<><Navbar/><Login/></>}></Route>
  <Route path="/Signup" element={<><Navbar/> <Signup/></>}></Route>
  <Route path="/add-student" element={<StudentForm/>}></Route>
  <Route path="/add-subject" element={<SubjectForm/>}></Route>
  <Route path="/edit/:id" element={<EditStudent/>}></Route>
  <Route path="/editsubject/:id" element={<EditSubject/>}></Route>
  
  
  <Route element={<PrivateRoutes/>}>
    <Route path='Home'element={<><Navbar/><Home/></> }></Route>
    <Route path='Student'element={<StudentHome/>}></Route>
    <Route path='/Subject' element={<SubjectHome/>}></Route>
  </Route>

</Routes>
</>
  )
}

export default App
