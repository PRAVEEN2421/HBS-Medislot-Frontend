import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { dToken, setDToken } = useContext(DoctorContext)
  const { aToken, setAToken } = useContext(AdminContext)

  const navigate = useNavigate()

  const logout = () => {
    navigate('/')
    dToken && setDToken('')
    dToken && localStorage.removeItem('dToken')
    aToken && setAToken('')
    aToken && localStorage.removeItem('aToken')
  }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-4 border-b bg-white shadow-sm sticky top-0 z-50'>
      <div className='flex items-center gap-3 text-xs'>
        <img onClick={() => navigate('/')} className='w-36 sm:w-40 cursor-pointer hover:opacity-90 transition-opacity' src={assets.admin_logo} alt="MediSlot Admin" />
        <p className='border border-gray-300 px-3 py-1 rounded-full text-gray-700 font-medium tracking-wide bg-gray-50 uppercase shadow-xs'>
          {aToken ? 'Admin' : 'Doctor'}
        </p>
      </div>
      <button onClick={() => logout()} className='bg-primary text-white text-sm px-8 py-2.5 rounded-full font-bold shadow-md hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2'>
        Logout
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
      </button>
    </div>
  )
}

export default Navbar