import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { showPremiumNotification } from './NotificationToast'

const TopDoctors = () => {

    const navigate = useNavigate()

    const { doctors, token } = useContext(AppContext)

    const handleDoctorClick = (id) => {
        if (!token) {
            showPremiumNotification({ title: 'Authentication Required', subtitle: 'Please login to book an appointment' })
            navigate('/login')
            scrollTo(0, 0)
        } else {
            navigate(`/appointment/${id}`)
            scrollTo(0, 0)
        }
    }

    return (
        <div className='flex flex-col items-center gap-6 my-20 text-gray-800 md:mx-10 px-4 sm:px-0'>
            <div className='text-center max-w-2xl'>
                <h1 className='text-3xl md:text-4xl font-bold tracking-tight mb-3'>Top Doctors to Book</h1>
                <p className='text-gray-500 text-sm md:text-base leading-relaxed'>Simply browse through our extensive list of trusted doctors, and easily find the specialist that best matches your healthcare needs.</p>
            </div>

            <div className='w-full grid grid-cols-auto gap-6 pt-8 gap-y-8 px-3 sm:px-0'>
                {doctors.slice(0, 10).map((item, index) => (
                    <div onClick={() => handleDoctorClick(item._id)} className='bg-white border border-gray-100 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group' key={index}>
                        <div className='bg-blue-50/50 aspect-square overflow-hidden relative'>
                            <div className='absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10'></div>
                            <img className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-0' src={item.image} alt={item.name} />
                        </div>
                        <div className='p-5'>
                            <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-bold mb-3 ${item.available ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-gray-50 text-gray-500 border border-gray-200'}`}>
                                <p className={`w-1.5 h-1.5 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-400"}`}></p>
                                <p>{item.available ? 'Available' : "Not Available"}</p>
                            </div>
                            <p className='text-gray-800 text-lg font-bold tracking-tight mb-1 group-hover:text-primary transition-colors'>{item.name}</p>
                            <p className='text-gray-500 text-sm font-medium'>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>

            <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='group bg-blue-50 text-primary font-bold px-12 py-4 rounded-full mt-10 hover:bg-primary hover:text-white transition-all duration-300 shadow-sm flex items-center gap-2'>
                View All Doctors
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
        </div>
    )
}

export default TopDoctors