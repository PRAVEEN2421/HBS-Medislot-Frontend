import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className='relative flex bg-gradient-to-tr from-primary via-blue-600 to-indigo-600 rounded-3xl mx-4 sm:mx-0 px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 overflow-hidden shadow-2xl isolate'>

            {/* Subtle floating background elements */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] bg-white/10 blur-3xl rounded-full pointer-events-none mix-blend-overlay"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[70%] bg-indigo-500/20 blur-3xl rounded-full pointer-events-none mix-blend-overlay"></div>

            {/* ------- Left Side ------- */}
            <div className='flex-1 py-10 sm:py-14 md:py-20 lg:py-28 lg:pl-8 z-10'>
                <div className='inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-white/20 border border-white/30 backdrop-blur-sm shadow-sm'>
                    <span className='flex h-2 w-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)]'></span>
                    <p className='text-xs font-semibold text-white tracking-widest uppercase'>Join Our Network</p>
                </div>

                <div className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight md:leading-tight lg:leading-tight drop-shadow-md'>
                    <p>Book Appointment</p>
                    <p className='mt-2 text-blue-100'>With 100+ Trusted Doctors</p>
                </div>

                <p className='max-w-md text-white/80 mt-6 text-sm sm:text-base leading-relaxed'>
                    Experience healthcare like never before. Sign up today to get personalized recommendations and instant booking access.
                </p>

                <button onClick={() => { navigate('/login'); scrollTo(0, 0) }} className='group mt-8 bg-white px-10 py-4 rounded-full text-gray-800 font-bold tracking-wide shadow-xl hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex items-center gap-2'>
                    <span className='absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-gray-100/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]'></span>
                    <span className='relative z-10'>Create Account</span>
                    <svg className="w-4 h-4 text-primary relative z-10 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                </button>
            </div>

            {/* ------- Right Side ------- */}
            <div className='hidden md:block md:w-1/2 lg:w-[370px] relative z-10 flex items-end justify-center'>
                <img className='w-full max-w-md absolute bottom-0 right-0 h-auto drop-shadow-[0_20px_20px_rgba(0,0,0,0.15)] object-contain transition-transform duration-700 hover:scale-[1.02]' src={assets.appointment_img} alt="Doctors App" />
            </div>
        </div>
    )
}

export default Banner