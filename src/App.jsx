import React, { useContext } from 'react'
import Navbar from './components/Navbar'
import AdminNavbar from './components/AdminNavbar'
import Sidebar from './components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import Appointment from './pages/Appointment'
import ForgotPassword from './pages/ForgotPassword'
import MyAppointments from './pages/MyAppointments'
import MyProfile from './pages/MyProfile'
import Footer from './components/Footer'
import Loader from './components/Loader'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify'

// Admin Pages
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import PatientsList from './pages/Admin/PatientsList';

// Doctor Pages
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';

import { AdminContext } from './context/AdminContext'
import { DoctorContext } from './context/DoctorContext'
import { AppContext } from './context/AppContext'

const App = () => {

  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)
  const { token, isLoading } = useContext(AppContext)

  if (isLoading) {
    return (
      <>
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        <Loader />
      </>
    )
  }

  if (aToken || dToken) {
    return (
      <div className='bg-[#F8F9FD]'>
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        <AdminNavbar />
        <div className='flex items-start'>
          <Sidebar />
          <Routes>
            {/* Admin Routes */}
            {aToken && (
              <>
                <Route path='/' element={<Dashboard />} />
                <Route path='/admin-dashboard' element={<Dashboard />} />
                <Route path='/all-appointments' element={<AllAppointments />} />
                <Route path='/add-doctor' element={<AddDoctor />} />
                <Route path='/doctor-list' element={<DoctorsList />} />
                <Route path='/patient-list' element={<PatientsList />} />
                {/* Fallback for admin if navigating to public routes while logged in */}
                <Route path='*' element={<Dashboard />} />
              </>
            )}

            {/* Doctor Routes */}
            {dToken && (
              <>
                <Route path='/' element={<DoctorDashboard />} />
                <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
                <Route path='/doctor-appointments' element={<DoctorAppointments />} />
                <Route path='/doctor-profile' element={<DoctorProfile />} />
                {/* Fallback for doctor if navigating to public routes while logged in */}
                <Route path='*' element={<DoctorDashboard />} />
              </>
            )}
          </Routes>
        </div>
      </div>
    )
  }

  // Patient / Public Layout
  return (
    <div className='mx-4 flex flex-col min-h-screen sm:mx-[10%]'>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/appointment/:docId' element={<Appointment />} />
        <Route path='/my-appointments' element={<MyAppointments />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App