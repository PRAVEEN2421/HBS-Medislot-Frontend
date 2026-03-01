import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate, useParams } from 'react-router-dom'
import { showPremiumNotification } from '../components/NotificationToast'

const Doctors = () => {

  const { speciality } = useParams()

  const [filterDoc, setFilterDoc] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const navigate = useNavigate();

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

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    } else {
      setFilterDoc(doctors)
    }
  }

  useEffect(() => {
    applyFilter()
  }, [doctors, speciality])

  return (
    <div className='max-w-7xl mx-auto pt-8 pb-16'>
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 tracking-tight'>Find Your Specialist</h1>
        <p className='text-gray-500 mt-2 text-lg'>Browse through our extensive list of trusted doctors.</p>
      </div>

      <div className='flex flex-col sm:flex-row items-start gap-8'>
        {/* Filters Sidebar */}
        <div className='w-full sm:w-64 shrink-0'>
          <button onClick={() => setShowFilter(!showFilter)} className={`w-full py-3 px-4 rounded-xl text-left font-medium flex justify-between items-center transition-all sm:hidden ${showFilter ? 'bg-primary text-white shadow-md' : 'bg-white border border-gray-200 text-gray-700'}`}>
            <span>Speciality Filters</span>
            <svg className={`w-5 h-5 transition-transform ${showFilter ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </button>

          <div className={`mt-4 sm:mt-0 flex-col gap-2 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>
            {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec) => (
              <p
                key={spec}
                onClick={() => speciality === spec ? navigate('/doctors') : navigate(`/doctors/${spec}`)}
                className={`w-full px-4 py-3 rounded-xl transition-all cursor-pointer font-medium border ${speciality === spec ? 'bg-primary text-white border-primary shadow-md transform -translate-y-0.5' : 'bg-white border-gray-200 text-gray-600 hover:border-primary/30 hover:bg-blue-50/50'}`}
              >
                {spec}
              </p>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {filterDoc.map((item, index) => (
            <div onClick={() => handleDoctorClick(item._id)} className='bg-white border border-[#C9D8FF] rounded-2xl overflow-hidden cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group' key={index}>
              <div className='bg-[#EAEFFF] overflow-hidden'>
                <img className='w-full object-cover group-hover:scale-105 transition-transform duration-500' src={item.image} alt={item.name} />
              </div>
              <div className='p-6 relative'>
                {/* Availability Badge floating between image and content */}
                <div className={`absolute -top-4 right-4 flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border ${item.available ? 'bg-green-50 text-green-600 border-green-200' : "bg-gray-50 text-gray-500 border-gray-200"}`}>
                  <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500 animate-pulse' : "bg-gray-400"}`}></span>
                  <span>{item.available ? 'Available' : "Unavailable"}</span>
                </div>
                <h3 className='text-gray-800 text-xl font-bold mt-2 truncate'>{item.name}</h3>
                <p className='text-primary font-medium text-sm mt-1 mb-4'>{item.speciality}</p>

                <div className='flex items-center justify-between border-t border-gray-100 pt-4'>
                  <div className='flex flex-col'>
                    <span className='text-xs text-gray-400 font-medium uppercase tracking-wider'>Consultation</span>
                    <span className='text-gray-700 font-bold'>₹{item.fees}</span>
                  </div>
                  <div className='w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors'>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {filterDoc.length === 0 && (
            <div className='col-span-full py-20 text-center bg-gray-50 rounded-2xl border border-gray-100'>
              <p className='text-gray-500 text-lg font-medium'>No doctors found for this specialty.</p>
              <button onClick={() => navigate('/doctors')} className='mt-4 text-primary font-medium hover:underline'>View all doctors</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Doctors