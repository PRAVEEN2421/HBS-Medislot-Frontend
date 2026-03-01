import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className='max-w-7xl mx-auto pt-10 pb-20 px-4 sm:px-0'>
      {/* Header */}
      <div className='text-center mb-16'>
        <h1 className='text-4xl md:text-5xl font-bold text-gray-800 tracking-tight'>
          Contact <span className='text-primary'>Us</span>
        </h1>
        <p className='text-gray-500 mt-4 text-lg max-w-2xl mx-auto'>
          Have questions or need assistance? Our team is always here to help you.
        </p>
      </div>

      <div className='flex flex-col md:flex-row items-center gap-12 lg:gap-20 bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 p-6 md:p-10'>
        {/* Image Side */}
        <div className='w-full md:w-1/2'>
          <div className='relative rounded-2xl overflow-hidden shadow-lg border border-gray-100'>
            <img className='w-full h-auto object-cover hover:scale-105 transition-transform duration-700' src={assets.contact_image} alt="Contact Us" />
          </div>
        </div>

        {/* Content Side */}
        <div className='w-full md:w-1/2 flex flex-col justify-center gap-8'>

          {/* Office Info */}
          <div className='bg-blue-50/50 p-6 rounded-2xl border border-blue-50'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center text-primary'>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              </div>
              <h3 className='font-bold text-xl text-gray-800'>Our Office</h3>
            </div>
            <p className='text-gray-600 leading-relaxed ml-13'>S.Pudur<br />Sivaganga, TamilNadu</p>

            <div className='mt-4 flex flex-col gap-2 ml-13'>
              <p className='text-gray-600 flex items-center gap-2'>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                <span className='font-medium text-gray-800'>+91 7868831758</span>
              </p>
              <p className='text-gray-600 flex items-center gap-2'>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                <span className='font-medium text-gray-800'>medislot@gmail.com</span>
              </p>
            </div>
          </div>

          {/* Careers */}
          <div className='p-6 rounded-2xl border border-gray-100'>
            <div className='flex items-center gap-3 mb-2'>
              <div className='w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary'>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              </div>
              <h3 className='font-bold text-xl text-gray-800'>Careers at MediSlot</h3>
            </div>
            <p className='text-gray-500 mb-6 ml-13'>Learn more about our vibrant teams and discover new job openings.</p>
            <button className='ml-13 bg-white border-2 border-primary text-primary font-bold px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-all duration-300 shadow-sm'>
              Explore Jobs
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Contact
