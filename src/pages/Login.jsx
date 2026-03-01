import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { AdminContext } from '../context/AdminContext'
import { DoctorContext } from '../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { showErrorNotification } from '../components/NotificationToast'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  // Role: 'Patient', 'Admin', 'Doctor'
  const [role, setRole] = useState('Patient')
  const [state, setState] = useState('Login') // 'Login' or 'Sign Up'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [addressLine1, setAddressLine1] = useState('')
  const [dob, setDob] = useState('')
  const [gender, setGender] = useState('Not Selected')

  // Validation state
  const [errors, setErrors] = useState({})

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)
  const { aToken, setAToken } = useContext(AdminContext)
  const { dToken, setDToken } = useContext(DoctorContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setErrors({}); // Reset errors

    try {
      if (role === 'Patient') {
        if (state === 'Sign Up') {
          // Validate required fields
          const newErrors = {};
          if (!name.trim()) newErrors.name = 'Full Name is required';
          if (!phone.trim()) newErrors.phone = 'Mobile is required';
          if (gender === 'Not Selected') newErrors.gender = 'Gender is required';
          if (!addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
          if (!dob) newErrors.dob = 'Date of Birth is required';
          if (!email.trim()) newErrors.email = 'Email Address is required';
          if (!password.trim()) newErrors.password = 'Password is required';

          if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            showErrorNotification('Validation Error', 'Please fill in all required fields');
            return;
          }

          const addressObj = { line1: addressLine1, line2: '' }
          const { data } = await axios.post(backendUrl + '/api/user/register', {
            name, email, password, phone, address: JSON.stringify(addressObj), dob, gender
          })
          if (data.success) {
            localStorage.setItem('token', data.token)
            localStorage.removeItem('aToken')
            localStorage.removeItem('dToken')
            setToken(data.token)
            setAToken('')
            setDToken('')
          } else {
            showErrorNotification('Sign Up Failed', data.message)
          }
        } else {
          const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })
          if (data.success) {
            localStorage.setItem('token', data.token)
            localStorage.removeItem('aToken')
            localStorage.removeItem('dToken')
            setToken(data.token)
            setAToken('')
            setDToken('')
          } else {
            showErrorNotification('Login Failed', data.message)
          }
        }
      } else if (role === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          localStorage.setItem('aToken', data.token)
          localStorage.removeItem('token')
          localStorage.removeItem('dToken')
          setAToken(data.token)
          setToken('')
          setDToken('')
        } else {
          showErrorNotification('Admin Login Failed', data.message)
        }
      } else if (role === 'Doctor') {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          localStorage.setItem('dToken', data.token)
          localStorage.removeItem('token')
          localStorage.removeItem('aToken')
          setDToken(data.token)
          setToken('')
          setAToken('')
        } else {
          showErrorNotification('Doctor Login Failed', data.message)
        }
      }
    } catch (error) {
      showErrorNotification('Error', error.message)
    }
  }

  useEffect(() => {
    if (token) navigate('/')
    if (aToken) navigate('/admin-dashboard')
    if (dToken) navigate('/doctor-dashboard')
  }, [token, aToken, dToken, navigate])

  return (
    <div className='min-h-[calc(100vh-100px)] flex items-center justify-center p-4 font-outfit relative overflow-hidden'>
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className={`w-full ${state === 'Sign Up' ? 'max-w-2xl' : 'max-w-md'} transition-all duration-500 ease-in-out`}>
        <form onSubmit={onSubmitHandler} className='bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100/80 rounded-[2rem] p-8 sm:p-10 relative overflow-hidden backdrop-blur-xl bg-white/95'>

          {/* Decorative Corner Glow */}
          <div className='absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/30 to-blue-400/20 rounded-full blur-2xl'></div>

          <div className='text-center mb-10 relative z-10'>
            <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 shadow-sm border border-primary/10'>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h2 className='text-3xl font-extrabold text-gray-900 tracking-tight mb-2'>
              {role === 'Patient' && state === 'Sign Up' ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className='text-gray-500 text-sm font-medium'>
              Please {role === 'Patient' && state === 'Sign Up' ? 'sign up' : 'log in'} as a <span className='font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full inline-block ml-1 shadow-sm border border-primary/5'>{role}</span>
            </p>
          </div>

          <div className='relative z-10'>
            {/* Role Selection Toggle */}
            {state === 'Login' && (
              <div className="flex w-full bg-gray-50/80 p-1.5 rounded-2xl mb-8 border border-gray-100 shadow-inner">
                {['Patient', 'Doctor', 'Admin'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={(e) => { e.preventDefault(); setRole(r); setState('Login'); }}
                    className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${role === r ? 'bg-white text-primary shadow-sm ring-1 ring-gray-200/50' : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}

            <div className='flex flex-col gap-5'>
              {state === 'Sign Up' && role === 'Patient' && (
                <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                  <div className='md:col-span-2'>
                    <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1'>Full Name *</label>
                    <input onChange={(e) => { setName(e.target.value); setErrors({ ...errors, name: null }) }} value={name} className={`w-full bg-gray-50/50 border-2 rounded-xl px-4 py-3.5 text-gray-800 font-medium focus:outline-none focus:bg-white focus:ring-4 transition-all ${errors.name ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-100 focus:border-primary focus:ring-primary/10'}`} type="text" placeholder='John Doe' />
                    {errors.name && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1'>Mobile *</label>
                    <input onChange={(e) => { setPhone(e.target.value); setErrors({ ...errors, phone: null }) }} value={phone} className={`w-full bg-gray-50/50 border-2 rounded-xl px-4 py-3.5 text-gray-800 font-medium focus:outline-none focus:bg-white focus:ring-4 transition-all ${errors.phone ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-100 focus:border-primary focus:ring-primary/10'}`} type="tel" placeholder='+1 234 567' />
                    {errors.phone && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1'>Gender *</label>
                    <div className='relative'>
                      <select onChange={(e) => { setGender(e.target.value); setErrors({ ...errors, gender: null }) }} value={gender} className={`w-full bg-gray-50/50 border-2 rounded-xl px-4 py-3.5 text-gray-800 font-medium focus:outline-none focus:bg-white focus:ring-4 transition-all appearance-none cursor-pointer ${errors.gender ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10 text-red-500' : 'border-gray-100 focus:border-primary focus:ring-primary/10'}`}>
                        <option value="Not Selected" disabled>Select</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                      <svg className={`w-5 h-5 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${errors.gender ? 'text-red-400' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                    {errors.gender && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.gender}</p>}
                  </div>

                  <div>
                    <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1'>Address *</label>
                    <input onChange={(e) => { setAddressLine1(e.target.value); setErrors({ ...errors, addressLine1: null }) }} value={addressLine1} className={`w-full bg-gray-50/50 border-2 rounded-xl px-4 py-3.5 text-gray-800 font-medium focus:outline-none focus:bg-white focus:ring-4 transition-all ${errors.addressLine1 ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-100 focus:border-primary focus:ring-primary/10'}`} type="text" placeholder='123 Main St' />
                    {errors.addressLine1 && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.addressLine1}</p>}
                  </div>

                  <div>
                    <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1'>Date of Birth *</label>
                    <input onChange={(e) => { setDob(e.target.value); setErrors({ ...errors, dob: null }) }} value={dob} className={`w-full bg-gray-50/50 border-2 rounded-xl px-4 py-3.5 text-gray-800 font-medium focus:outline-none focus:bg-white focus:ring-4 transition-all ${errors.dob ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10 text-red-500' : 'border-gray-100 focus:border-primary focus:ring-primary/10'}`} type="date" />
                    {errors.dob && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.dob}</p>}
                  </div>
                </div>
              )}

              <div className={`${state === 'Sign Up' ? 'md:col-span-2 mt-2 pt-4 border-t border-gray-100' : ''}`}>
                <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1'>Email Address {state === 'Sign Up' ? '*' : ''}</label>
                <input onChange={(e) => { setEmail(e.target.value); setErrors({ ...errors, email: null }) }} value={email} className={`w-full bg-gray-50/50 border-2 rounded-xl px-4 py-3.5 text-gray-800 font-medium focus:outline-none focus:bg-white focus:ring-4 transition-all ${errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-100 focus:border-primary focus:ring-primary/10'}`} type="email" placeholder='you@example.com' />
                {errors.email && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.email}</p>}
              </div>

              <div>
                <div className='flex justify-between items-center mb-1.5 ml-1 mr-1'>
                  <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest'>Password {state === 'Sign Up' ? '*' : ''}</label>
                  {(role === 'Patient' || role === 'Doctor') && state === 'Login' && (
                    <span onClick={() => navigate('/forgot-password')} className='text-[11px] text-primary font-bold hover:underline cursor-pointer transition-all uppercase tracking-wider'>Recover</span>
                  )}
                </div>
                <input onChange={(e) => { setPassword(e.target.value); setErrors({ ...errors, password: null }) }} value={password} className={`w-full bg-gray-50/50 border-2 rounded-xl px-4 py-3.5 text-gray-800 font-medium focus:outline-none focus:bg-white focus:ring-4 transition-all ${errors.password ? 'border-red-400 focus:border-red-500 focus:ring-red-500/10' : 'border-gray-100 focus:border-primary focus:ring-primary/10'}`} type="password" placeholder='••••••••' />
                {errors.password && <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.password}</p>}
              </div>

              <button type="submit" className='w-full bg-gradient-to-r from-primary to-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_8px_20px_-6px_rgba(var(--primary-rgb),0.5)] hover:shadow-[0_12px_25px_-6px_rgba(var(--primary-rgb),0.6)] transform hover:-translate-y-0.5 transition-all mt-4 text-lg'>
                {role === 'Patient' && state === 'Sign Up' ? 'Create Account' : 'Login Securely'}
              </button>
            </div>

            {/* Footer Toggle */}
            {role === 'Patient' && (
              <div className='mt-8 text-center pt-2'>
                {state === 'Sign Up' ? (
                  <p className='text-sm text-gray-500 font-medium'>Already have an account? <span onClick={() => setState('Login')} className='text-primary font-bold hover:underline cursor-pointer transition-all'>Login here</span></p>
                ) : (
                  <p className='text-sm text-gray-500 font-medium'>New to MediSlot? <span onClick={() => setState('Sign Up')} className='text-primary font-bold hover:underline cursor-pointer transition-all'>Create an account</span></p>
                )}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login