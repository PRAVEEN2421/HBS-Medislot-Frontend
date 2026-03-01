import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id='speciality' className='flex flex-col items-center gap-6 py-20 text-gray-800'>
            <div className='text-center max-w-2xl px-4'>
                <h1 className='text-3xl md:text-4xl font-bold tracking-tight mb-3'>Find by Speciality</h1>
                <p className='text-gray-500 text-sm md:text-base leading-relaxed'>
                    Simply browse through our extensive list of trusted doctors, and seamlessly schedule your appointment today.
                </p>
            </div>

            <div className='flex sm:justify-center gap-6 pt-10 w-full overflow-x-auto pb-8 px-6' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {specialityData.map((item, index) => (
                    <Link to={`/doctors/${item.speciality}`} onClick={() => scrollTo(0, 0)} className='group flex flex-col items-center flex-shrink-0 cursor-pointer transition-all duration-300 transform hover:-translate-y-3' key={index}>
                        <div className='w-24 h-24 sm:w-28 sm:h-28 bg-white border border-gray-100 rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:shadow-xl group-hover:border-primary/30 transition-all duration-300 relative overflow-hidden'>
                            <div className='absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full'></div>
                            <img className='w-14 sm:w-16 h-14 sm:h-16 object-contain relative z-10 group-hover:scale-110 transition-transform duration-500' src={item.image} alt={item.speciality} />
                        </div>
                        <p className='text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors'>{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default SpecialityMenu