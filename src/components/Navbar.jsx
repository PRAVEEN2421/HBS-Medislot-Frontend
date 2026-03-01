import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

  const navigate = useNavigate()

  const [showMenu, setShowMenu] = useState(false)
  const { token, setToken, userData } = useContext(AppContext)

  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    navigate('/login')
  }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-8 border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 px-2 sm:px-0'>
      <img onClick={() => navigate('/')} className='w-40 sm:w-48 cursor-pointer hover:opacity-90 transition-opacity' src={assets.logo} alt="MediSlot Logo" />

      <ul className='md:flex items-center justify-center gap-8 font-semibold text-gray-600 hidden'>
        <NavLink to='/' className={({ isActive }) => `flex flex-col items-center gap-1 cursor-pointer transition-all hover:text-primary ${isActive ? 'text-primary' : ''}`}>
          <li className='py-1 tracking-wide text-[13px]'>HOME</li>
          <hr className='border-none outline-none h-[3px] bg-primary w-full rounded-full transition-transform duration-300 scale-x-0 group-hover:scale-x-100 active:scale-x-100' style={{ transformOrigin: 'center' }} />
        </NavLink>
        <NavLink to='/doctors' className={({ isActive }) => `flex flex-col items-center gap-1 cursor-pointer transition-all hover:text-primary ${isActive ? 'text-primary' : ''}`}>
          <li className='py-1 tracking-wide text-[13px]'>ALL DOCTORS</li>
          <hr className='border-none outline-none h-[3px] bg-primary w-full rounded-full transition-transform duration-300 scale-x-0' style={{ transformOrigin: 'center' }} />
        </NavLink>
        <NavLink to='/about' className={({ isActive }) => `flex flex-col items-center gap-1 cursor-pointer transition-all hover:text-primary ${isActive ? 'text-primary' : ''}`}>
          <li className='py-1 tracking-wide text-[13px]'>ABOUT</li>
          <hr className='border-none outline-none h-[3px] bg-primary w-full rounded-full transition-transform duration-300 scale-x-0' style={{ transformOrigin: 'center' }} />
        </NavLink>
        <NavLink to='/contact' className={({ isActive }) => `flex flex-col items-center gap-1 cursor-pointer transition-all hover:text-primary ${isActive ? 'text-primary' : ''}`}>
          <li className='py-1 tracking-wide text-[13px]'>CONTACT</li>
          <hr className='border-none outline-none h-[3px] bg-primary w-full rounded-full transition-transform duration-300 scale-x-0' style={{ transformOrigin: 'center' }} />
        </NavLink>
      </ul>

      <div className='flex items-center gap-4'>
        {
          token && userData
            ? <div className='flex items-center gap-3 cursor-pointer group relative'>
              <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center p-0.5 border border-primary/20 shadow-sm'>
                <img className='w-full h-full rounded-full object-cover' src={userData.image} alt={userData.name} />
              </div>
              <img className='w-3 opacity-70 group-hover:opacity-100 transition-opacity' src={assets.dropdown_icon} alt="Menu" />

              {/* Dropdown Box */}
              <div className='absolute top-full right-0 pt-4 text-base font-medium text-gray-600 z-50 hidden group-hover:block'>
                <div className='min-w-56 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col p-3 overflow-hidden animate-[fadeIn_0.2s_ease-out]'>

                  {/* User Mini Profile */}
                  <div className='px-4 py-3 border-b border-gray-50 mb-2'>
                    <p className='text-sm font-bold text-gray-800 truncate'>{userData.name}</p>
                    <p className='text-xs text-gray-500 truncate'>{userData.email}</p>
                  </div>

                  <div onClick={() => navigate('/my-profile')} className='flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50/80 hover:text-primary rounded-xl cursor-pointer transition-colors'>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    <p className='text-sm'>My Profile</p>
                  </div>
                  <div onClick={() => navigate('/my-appointments')} className='flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50/80 hover:text-primary rounded-xl cursor-pointer transition-colors'>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    <p className='text-sm'>Appointments</p>
                  </div>
                  <div className='h-px bg-gray-50 my-1'></div>
                  <div onClick={logout} className='flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 hover:text-red-500 rounded-xl cursor-pointer transition-colors text-red-400'>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    <p className='text-sm'>Logout</p>
                  </div>
                </div>
              </div>
            </div>
            : <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-bold tracking-wide text-sm hidden md:block hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300'>Login</button>
        }
        <img onClick={() => setShowMenu(true)} className='w-7 md:hidden cursor-pointer hover:opacity-80 transition-opacity' src={assets.menu_icon} alt="Menu" />

        {/* ---- Mobile Menu ---- */}
        <div className={`md:hidden fixed inset-y-0 right-0 z-[100] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${showMenu ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className='h-full w-[280px] bg-white/90 backdrop-blur-2xl shadow-[-20px_0_50px_rgba(0,0,0,0.1)] border-l border-white/20 flex flex-col'>
            {/* Menu Header */}
            <div className='flex items-center justify-between px-6 py-6 border-b border-gray-100/50'>
              <img src={assets.logo} className='w-32' alt="MediSlot" />
              <button
                onClick={() => setShowMenu(false)}
                className='w-10 h-10 bg-gray-50/80 rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/10 hover:rotate-90 transition-all duration-300 group'
              >
                <img src={assets.cross_icon} className='w-3.5 group-hover:scale-110 transition-transform' alt="Close" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className='flex-1 overflow-y-auto py-8'>
              <ul className='flex flex-col px-4 gap-2'>
                {[
                  { name: 'HOME', path: '/', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                  { name: 'ALL DOCTORS', path: '/doctors', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
                  { name: 'ABOUT', path: '/about', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                  { name: 'CONTACT', path: '/contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                ].map((item, index) => (
                  <NavLink
                    key={item.name}
                    onClick={() => setShowMenu(false)}
                    to={item.path}
                    className={({ isActive }) => `
                      group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300
                      ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]' : 'hover:bg-gray-50 text-gray-600 hover:text-primary'}
                    `}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className={`p-2 rounded-lg transition-colors ${showMenu ? 'animate-[fadeIn_0.5s_ease_both]' : ''}`}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path>
                      </svg>
                    </div>
                    <span className='font-bold text-sm tracking-wider'>{item.name}</span>
                  </NavLink>
                ))}
              </ul>
            </nav>

            {/* Menu Footer */}
            <div className='p-6 border-t border-gray-100/50'>
              {!token ? (
                <button
                  onClick={() => { setShowMenu(false); navigate('/login'); }}
                  className='w-full bg-primary text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95 transition-all duration-300'
                >
                  Login / Create Account
                </button>
              ) : (
                <div className='flex flex-col gap-3'>
                  <div className='flex items-center gap-3 px-2 mb-2'>
                    <img className='w-10 h-10 rounded-full object-cover border-2 border-primary/20' src={userData.image} alt="" />
                    <div className='flex flex-col'>
                      <span className='text-sm font-bold text-gray-800 truncate max-w-[150px]'>{userData.name}</span>
                      <span className='text-[10px] text-gray-500'>Welcome back!</span>
                    </div>
                  </div>
                  <button
                    onClick={logout}
                    className='w-full flex items-center justify-center gap-2 bg-red-50 text-red-500 py-3 rounded-xl font-bold hover:bg-red-100 transition-colors'
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu Backdrop */}
        <div
          onClick={() => setShowMenu(false)}
          className={`md:hidden fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[90] transition-opacity duration-500 ${showMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        ></div>
      </div>
    </div>
  )
}

export default Navbar