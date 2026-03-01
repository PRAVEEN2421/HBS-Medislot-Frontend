import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
    return (
        <div className='max-w-7xl mx-auto pt-10 pb-20 px-4 sm:px-0'>
            {/* Header */}
            <div className='text-center mb-16'>
                <h1 className='text-4xl md:text-5xl font-bold text-gray-800 tracking-tight'>
                    About <span className='text-primary'>MediSlot</span>
                </h1>
                <p className='text-gray-500 mt-4 text-lg max-w-2xl mx-auto'>
                    Revolutionizing healthcare access by connecting you with top medical professionals seamlessly.
                </p>
            </div>

            {/* Main Content */}
            <div className='flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-24'>
                <div className='w-full lg:w-1/2'>
                    <div className='relative rounded-3xl overflow-hidden shadow-2xl'>
                        <div className='absolute inset-0 bg-primary/20 mix-blend-multiply'></div>
                        <img className='w-full h-auto object-cover hover:scale-105 transition-transform duration-700' src={assets.about_image} alt="About Us" />
                    </div>
                </div>

                <div className='w-full lg:w-1/2 flex flex-col gap-6 text-gray-600 text-lg leading-relaxed'>
                    <p>
                        Welcome to <span className='font-bold text-gray-800'>MediSlot</span>, your trusted partner in managing your healthcare needs conveniently and efficiently.
                        At MediSlot, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
                    </p>
                    <p>
                        MediSlot is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service. Whether you're booking your first appointment or managing ongoing care, MediSlot is here to support you every step of the way.
                    </p>

                    <div className='mt-4 p-6 bg-blue-50/50 border border-blue-100 rounded-2xl'>
                        <h3 className='text-xl font-bold text-gray-800 mb-2 flex items-center gap-2'>
                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                            Our Vision
                        </h3>
                        <p className='text-gray-600 text-base'>
                            Our vision at MediSlot is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.
                        </p>
                    </div>
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className='mb-12'>
                <h2 className='text-3xl font-bold text-gray-800 mb-8'>
                    Why <span className='text-primary'>Choose Us</span>
                </h2>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                    {/* Feature 1 */}
                    <div className='bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group'>
                        <div className='w-14 h-14 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300'>
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <h3 className='text-xl font-bold text-gray-800 mb-3'>Efficiency</h3>
                        <p className='text-gray-500 leading-relaxed'>Streamlined appointment scheduling that fits seamlessly into your busy lifestyle.</p>
                    </div>

                    {/* Feature 2 */}
                    <div className='bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group'>
                        <div className='w-14 h-14 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300'>
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                        </div>
                        <h3 className='text-xl font-bold text-gray-800 mb-3'>Convenience</h3>
                        <p className='text-gray-500 leading-relaxed'>Access to a vast network of trusted healthcare professionals in your localized area.</p>
                    </div>

                    {/* Feature 3 */}
                    <div className='bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group'>
                        <div className='w-14 h-14 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300'>
                            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                        </div>
                        <h3 className='text-xl font-bold text-gray-800 mb-3'>Personalization</h3>
                        <p className='text-gray-500 leading-relaxed'>Tailored recommendations and reminders to help you stay consistently on top of your health.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About
