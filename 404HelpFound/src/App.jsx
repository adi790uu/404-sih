import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AdminDashBoard from './pages/AdminDashBoard'
import Footer from './components/Footer'
import SignIn from './pages/SignIn'
import AgencySignIn from './pages/AgencySignin'
import SignUp from './pages/SignUp'
import AgencySignUp from './pages/AgencySignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/>
     <Home/>
     {/* <AdminDashBoard/> */}
     {/* <SignIn /> */}
     {/* <AgencySignIn /> */}
     {/* <SignUp/> */}
     {/* <AgencySignUp/> */}
     <Footer/>
    </>
  )
}

export default App
