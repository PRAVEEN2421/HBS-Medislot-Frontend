import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { showSuccessNotification, showErrorNotification } from '../components/NotificationToast'
import { assets } from '../assets/assets'

const MyAppointments = () => {

    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')

    const { loadUserProfileData } = useContext(AppContext);

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    // Getting User Appointments Data Using API
    const getUserAppointments = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())

        } catch (error) {
            console.log(error)
            showErrorNotification('Error', error.message)
        }
    }

    // Function to cancel appointment Using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

            if (data.success) {
                showSuccessNotification('Appointment Cancelled', data.message)
                getUserAppointments()
                loadUserProfileData()
            } else {
                showErrorNotification('Cancellation Failed', data.message)
            }

        } catch (error) {
            console.log(error)
            showErrorNotification('Error', error.message)
        }

    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {

                console.log(response)

                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    showErrorNotification('Payment Verification Error', error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Function to make payment using razorpay
    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            } else {
                showErrorNotification('Payment Failed', data.message)
            }
        } catch (error) {
            console.log(error)
            showErrorNotification('Error', error.message)
        }
    }

    // Function to make payment using stripe
    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } })
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url)
            } else {
                showErrorNotification('Payment Failed', data.message)
            }
        } catch (error) {
            console.log(error)
            showErrorNotification('Error', error.message)
        }
    }



    // Function to make payment explicitly using user wallet
    const appointmentWallet = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/user/payment-wallet', { appointmentId }, { headers: { token } })
            if (data.success) {
                showSuccessNotification('Payment Successful', data.message)
                getUserAppointments()
                loadUserProfileData()
            } else {
                showErrorNotification('Payment Failed', data.message)
            }
        } catch (error) {
            console.log(error)
            showErrorNotification('Error', error.message)
        }
    }


    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div className='max-w-5xl mx-auto pt-8 pb-20'>
            <div className='flex items-center justify-between mb-8 border-b border-gray-100 pb-4'>
                <h1 className='text-3xl font-bold text-gray-800 tracking-tight'>My Appointments</h1>
            </div>

            <div className='flex flex-col gap-6'>
                {appointments.length === 0 && (
                    <div className='text-center py-16 bg-gray-50 rounded-2xl border border-gray-100'>
                        <p className='text-gray-500 text-lg'>You have no appointments booked yet.</p>
                        <button onClick={() => navigate('/doctors')} className='mt-4 bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors'>Book Now</button>
                    </div>
                )}

                {appointments.map((item, index) => (
                    <div key={index} className='bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow relative overflow-hidden'>

                        {/* Status Badges */}
                        <div className='absolute top-5 right-5 flex gap-2'>
                            {item.cancelled && <span className='bg-red-50 text-red-500 border border-red-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm'>Cancelled</span>}
                            {item.isCompleted && <span className='bg-green-50 text-green-600 border border-green-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm'>Completed</span>}
                        </div>

                        {/* Doctor Image */}
                        <div className='w-full md:w-48 shrink-0'>
                            <div className='bg-blue-50 rounded-xl overflow-hidden aspect-square md:aspect-auto md:h-full'>
                                <img className='w-full h-full object-cover object-top' src={item.docData.image} alt={item.docData.name} />
                            </div>
                        </div>

                        {/* Appointment Details */}
                        <div className='flex-1 flex flex-col justify-center mt-2 md:mt-0'>
                            <p className='text-gray-800 text-2xl font-bold'>{item.docData.name}</p>
                            <p className='text-primary font-medium mb-4'>{item.docData.speciality}</p>

                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm bg-gray-50 rounded-xl p-4 border border-gray-100'>
                                <div>
                                    <p className='text-gray-500 font-semibold mb-1 uppercase text-xs tracking-wider flex items-center gap-1'>
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                        Address
                                    </p>
                                    <p className='text-gray-800 font-medium'>{item.docData.address.line1}</p>
                                    <p className='text-gray-800 font-medium'>{item.docData.address.line2}</p>
                                </div>
                                <div>
                                    <p className='text-gray-500 font-semibold mb-1 uppercase text-xs tracking-wider flex items-center gap-1'>
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        Date & Time
                                    </p>
                                    <p className='text-gray-800 font-medium'>{slotDateFormat(item.slotDate)}</p>
                                    <p className='text-primary font-semibold'>{item.slotTime}</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex flex-col gap-3 justify-end md:w-56 shrink-0 mt-2 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100'>

                            {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                                <button onClick={() => setPayment(item._id)} className='w-full bg-primary text-white font-medium py-3 rounded-xl hover:bg-primary/90 transition-all shadow-sm transform hover:-translate-y-0.5'>
                                    Pay Online
                                </button>
                            )}

                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                                <div className='flex flex-col gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100'>
                                    <p className='text-xs text-center font-medium text-gray-500 uppercase tracking-wider mb-1'>Select Payment</p>
                                    <button onClick={() => appointmentWallet(item._id)} className='w-full flex items-center justify-center gap-2 bg-green-500 text-white font-medium py-2.5 rounded-lg hover:bg-green-600 transition-colors shadow-sm'>
                                        Wallet Options
                                    </button>
                                    <button onClick={() => appointmentStripe(item._id)} className='w-full flex items-center justify-center bg-white border border-gray-200 py-2.5 rounded-lg hover:bg-gray-50 transition-colors'>
                                        <img className='h-5' src={assets.stripe_logo} alt="Stripe" />
                                    </button>
                                    <button onClick={() => appointmentRazorpay(item._id)} className='w-full flex items-center justify-center bg-white border border-gray-200 py-2.5 rounded-lg hover:bg-gray-50 transition-colors'>
                                        <img className='h-5' src={assets.razorpay_logo} alt="Razorpay" />
                                    </button>
                                    <button onClick={() => setPayment('')} className='w-full text-center text-gray-400 text-xs py-1 hover:text-gray-600 mt-1'>Cancel Payment</button>
                                </div>
                            )}

                            {!item.cancelled && item.payment && !item.isCompleted && (
                                <div className='w-full flex items-center justify-center gap-2 bg-green-50 text-green-600 font-medium py-3 rounded-xl border border-green-200'>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Payment Verified
                                </div>
                            )}

                            {!item.cancelled && !item.isCompleted && payment !== item._id && (
                                <button onClick={() => cancelAppointment(item._id)} className='w-full text-gray-600 font-medium py-3 border border-gray-200 rounded-xl hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all'>
                                    Cancel Booking
                                </button>
                            )}

                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyAppointments
