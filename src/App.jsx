import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AdminDashBoard from './pages/AdminDashBoard'
import Footer from './components/Footer'
import SignIn from './pages/SignIn'
import WorkerSignIn from './pages/WorkerSignIn'
import AgencySignIn from './pages/AgencySignin'
import SignUp from './pages/SignUp'
import AgencySignUp from './pages/AgencySignUp'
import WorkerSignUp from './pages/WorkerSignUp'
import MemberHelpPage from './pages/MemberHelpPage'
import AgencyPersonalDashBoard from './pages/AgencyPersonalDashBoard'
import { Container } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Changed Redirect to Navigate

function App() {

  const [user, setUser]= useState(JSON.parse(localStorage.getItem('profile')));
  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('profile')));
  },[])

  console.log(user?.userType);
  // const user = JSON.parse(localStorage.getItem('profile'));
  
  return (
    <Router>
    <div >
      <Navbar />
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/agencydashboard" element={<AdminDashBoard/>} />
      {/* <Route path='/agencydashboard' element={(user?.userType==='agency')? <AdminDashBoard/> : <Navigate to='/'/>} /> */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/agencysignin" element={<AgencySignIn />} />
      <Route path="/workersignin" element={<WorkerSignIn />} />
      <Route path="/agencysignup" element={<AgencySignUp />} />
      <Route path="/workersignup" element={<WorkerSignUp />} />
      <Route path="/memberhelppage" element={<MemberHelpPage/>} />
      {/* <Route path="/memberhelppage" element={(user?.userType==='worker')?<MemberHelpPage/> : <Navigate to='/'/>} /> */}
      <Route path="/agencyPersonalDashBoard" element={<AgencyPersonalDashBoard/>} />
      </Routes>
      {/* <Footer/> */}
    </div>
    </Router>
     
  )
}

export default App

{/* <Route path="/" element={<Navigate to="/posts" />}/>
<Route path="/posts/:id" element={<PostDetails />} />
<Route path="/auth" element={!user ? <Auth /> : <Navigate to="/posts" >} /> */}

