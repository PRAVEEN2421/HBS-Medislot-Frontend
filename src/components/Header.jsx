import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { showPremiumNotification } from './NotificationToast'

const Header = () => {
    const { token } = useContext(AppContext)
    const navigate = useNavigate()

    const handleBookAppointment = (e) => {
        if (!token) {
            e.preventDefault();
            showPremiumNotification({ title: 'Authentication Required', subtitle: 'Please login to book an appointment' });
            navigate('/login');
            window.scrollTo(0, 0);
        }
        // If logged in, the href="#speciality" will natively scroll them down via default behavior.
    }
    return (
        <div className='relative flex flex-col md:flex-row flex-wrap bg-gradient-to-tr from-primary via-blue-600 to-indigo-600 rounded-3xl mx-4 sm:mx-0 px-6 md:px-10 lg:px-20 overflow-hidden shadow-2xl isolate'>

            {/* Subtle floating background elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] bg-white/10 blur-3xl rounded-full pointer-events-none mix-blend-overlay"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[70%] bg-indigo-500/20 blur-3xl rounded-full pointer-events-none mix-blend-overlay"></div>

            {/* --------- Header Left --------- */}
            <div className='md:w-1/2 flex flex-col items-start justify-center gap-6 py-12 m-auto md:py-[8vw] md:mb-[-30px] z-10'>

                <div className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm shadow-sm'>
                    <span className='flex h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]'></span>
                    <p className='text-xs font-semibold text-white tracking-widest uppercase'>Trusted Healthcare</p>
                </div>

                <h1 className='text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight md:leading-tight lg:leading-tight drop-shadow-md tracking-tight'>
                    Book Appointment <br className='hidden md:block' /> <span className='text-blue-100'>With Trusted</span> Doctors
                </h1>

                <div className='flex flex-col md:flex-row items-center gap-4 text-white/90 text-sm font-medium bg-white/10 p-4 rounded-2xl border border-white/20 backdrop-blur-sm'>
                    <img className='w-28 shrink-0 drop-shadow-md' src={assets.group_profiles} alt="Trusted Doctors" />
                    <p className='leading-relaxed'>
                        Simply browse through our extensive list of highly verified doctors, <br className='hidden lg:block' /> and schedule your appointment completely hassle-free.
                    </p>
                </div>

                <a href='#speciality' onClick={handleBookAppointment} className='group flex items-center justify-center gap-3 bg-white px-8 py-4 rounded-full text-gray-800 font-bold tracking-wide shadow-xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 mt-2 sm:mt-4 m-auto md:m-0 w-full sm:w-auto overflow-hidden relative'>
                    <span className='absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]'></span>
                    <span className='relative z-10 flex items-center gap-2'>
                        Book Appointment
                        <svg className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                </a>
            </div>

            {/* --------- Header Right --------- */}
            <div className='md:w-1/2 relative z-10 flex items-end justify-center md:justify-end mt-8 md:mt-0'>
                <img className='w-full max-w-md md:absolute bottom-0 md:right-0 h-auto rounded-lg drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] object-contain transition-transform duration-700 hover:scale-[1.02]' src={assets.header_img} alt="Header Doctors" />
            </div>
        </div>
    )
}

export default Header