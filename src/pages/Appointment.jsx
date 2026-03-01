import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import axios from 'axios'
import { toast } from 'react-toastify'
import { showSuccessNotification, showErrorNotification, showPremiumNotification } from '../components/NotificationToast'

const Appointment = () => {

    const { docId } = useParams()
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext)
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState(false)
    const [docSlots, setDocSlots] = useState([])
    const [slotIndex, setSlotIndex] = useState(0)
    const [slotTime, setSlotTime] = useState('')
    const [isBooking, setIsBooking] = useState(false)

    const navigate = useNavigate()

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId)
        setDocInfo(docInfo)
    }

    const getAvailableSolts = async () => {

        setDocSlots([])

        // getting current date
        let today = new Date()

        for (let i = 0; i < 7; i++) {

            // getting date with index 
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i)

            // setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i)
            endTime.setHours(21, 0, 0, 0)

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10)
                currentDate.setMinutes(0)
            }

            let timeSlots = [];


            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate()
                let month = currentDate.getMonth() + 1
                let year = currentDate.getFullYear()

                const slotDate = day + "_" + month + "_" + year
                const slotTime = formattedTime

                const isSlotAvailable = docInfo.slots_booked && docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

                if (isSlotAvailable) {

                    // Add slot to array
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    })
                }

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]))

        }

    }

    const bookAppointment = async () => {

        if (!token) {
            showPremiumNotification({ title: 'Authentication Required', subtitle: 'Login to book appointment' })
            return navigate('/login')
        }

        const date = docSlots[slotIndex][0].datetime

        let day = date.getDate()
        let month = date.getMonth() + 1
        let year = date.getFullYear()

        const slotDate = day + "_" + month + "_" + year

        if (!slotTime) {
            showPremiumNotification({ title: 'Slot Required', subtitle: 'Please select a time slot' })
            return;
        }

        setIsBooking(true);

        try {

            const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })
            if (data.success) {
                showSuccessNotification('Appointment Booked', data.message)
                getDoctosData()
                navigate('/my-appointments')
            } else {
                showErrorNotification('Booking Failed', data.message)
            }

        } catch (error) {
            console.log(error)
            showErrorNotification('Error', error.message)
        } finally {
            setIsBooking(false);
        }

    }

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo()
        }
    }, [doctors, docId])

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts()
        }
    }, [docInfo])

    return docInfo ? (
        <div className='max-w-5xl mx-auto pt-8 pb-16 px-4 sm:px-0'>

            {/* ---------- Doctor Details ----------- */}
            <div className='flex flex-col sm:flex-row gap-6 sm:gap-8'>
                <div className='w-full sm:max-w-72 shrink-0'>
                    <div className='bg-primary/5 rounded-2xl overflow-hidden shadow-sm border border-primary/10'>
                        <img className='w-full h-auto object-cover' src={docInfo.image} alt={docInfo.name} />
                    </div>
                </div>

                <div className='flex-1 border border-gray-100 shadow-sm rounded-2xl p-6 sm:p-8 bg-white relative'>

                    {/* ----- Doc Info : name, degree, experience ----- */}
                    <p className='flex items-center gap-2 text-3xl font-bold text-gray-800 tracking-tight'>
                        {docInfo.name}
                        <img className='w-6' src={assets.verified_icon} alt="Verified" />
                    </p>

                    <div className='flex items-center gap-3 mt-2 text-gray-600'>
                        <p className='font-medium text-primary'>{docInfo.degree} - {docInfo.speciality}</p>
                        <span className='py-1 px-3 bg-gray-50 border border-gray-200 text-xs font-semibold rounded-full tracking-wide'>{docInfo.experience}</span>
                    </div>

                    {/* ----- Doc About ----- */}
                    <div className='mt-6 bg-gray-50/50 p-5 border border-gray-50 rounded-xl'>
                        <p className='flex items-center gap-2 text-sm font-semibold text-gray-800 uppercase tracking-wider mb-2'>
                            About Doctor
                            <img className='w-3.5 opacity-70' src={assets.info_icon} alt="Info" />
                        </p>
                        <p className='text-sm text-gray-600 leading-relaxed max-w-[700px]'>{docInfo.about}</p>
                    </div>

                    <div className='mt-8 pt-6 border-t border-gray-100 flex items-center justify-between'>
                        <div className='flex flex-col'>
                            <p className='text-gray-500 font-medium text-sm uppercase tracking-wider mb-1'>Consultation Fee</p>
                            <p className='text-3xl font-bold text-gray-800'>{currencySymbol}{docInfo.fees}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking slots */}
            <div className='sm:ml-[320px] mt-8 p-6 sm:p-8 bg-white border border-gray-100 shadow-sm rounded-2xl'>
                <h3 className='font-bold text-xl text-gray-800 flex items-center gap-2 mb-6'>
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                    Select Booking Slot
                </h3>

                <div className='flex gap-4 items-center w-full overflow-x-auto pb-4 snap-x' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {docSlots.length && docSlots.map((item, index) => (
                        <div onClick={() => setSlotIndex(index)} key={index} className={`flex-shrink-0 text-center py-4 px-6 min-w-24 rounded-xl cursor-pointer transition-all snap-start ${slotIndex === index ? 'bg-primary text-white shadow-md transform -translate-y-1' : 'bg-gray-50 border border-gray-200 text-gray-600 hover:border-primary/30 hover:bg-primary/5'}`}>
                            <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${slotIndex === index ? 'text-white/80' : 'text-gray-500'}`}>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p className='text-2xl font-bold'>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                <div className='flex items-center gap-3 w-full overflow-x-auto mt-6 pb-4' style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {docSlots.length > 0 && docSlots[slotIndex] && docSlots[slotIndex].map((item, index) => (
                        <button onClick={() => setSlotTime(item.time)} key={index} className={`text-sm font-medium flex-shrink-0 px-6 py-2.5 rounded-full cursor-pointer transition-all ${item.time === slotTime ? 'bg-green-500 text-white shadow-md border-green-500' : 'text-gray-600 bg-white border border-gray-200 hover:border-green-500 hover:text-green-600'}`}>
                            {item.time.toLowerCase()}
                        </button>
                    ))}
                </div>

                <div className='mt-8 pt-6 border-t border-gray-100 flex justify-end'>
                    <button onClick={bookAppointment} disabled={isBooking} className={`w-full sm:w-auto bg-primary text-white font-medium px-12 py-4 rounded-full shadow-md transition-all text-lg ${isBooking ? 'opacity-50 cursor-not-allowed' : 'hover:bg-primary/90 hover:shadow-lg transform hover:-translate-y-0.5'}`}>
                        {isBooking ? 'Processing Booking...' : 'Confirm Appointment'}
                    </button>
                </div>
            </div>

            {/* Listing Releated Doctors */}
            <div className='mt-16'>
                <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
            </div>
        </div>
    ) : null
}

export default Appointment