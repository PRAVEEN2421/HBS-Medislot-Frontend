import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { showSuccessNotification, showErrorNotification } from '../components/NotificationToast'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)

    const [image, setImage] = useState(false)
    const [rechargeAmount, setRechargeAmount] = useState('')
    const [isRecharging, setIsRecharging] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData, currency } = useContext(AppContext)

    // Function to update user profile data using API
    const updateUserProfileData = async () => {

        try {

            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axios.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                showSuccessNotification('Profile Updated', data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    // Initialize Razorpay for Wallet Recharge
    const initRecharge = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Wallet Recharge',
            description: "Wallet Recharge",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axios.post(backendUrl + "/api/user/verify-wallet-recharge", {
                        ...response,
                        userId: userData._id
                    }, { headers: { token } });

                    if (data.success) {
                        showSuccessNotification('Recharge Successful', data.message)
                        await loadUserProfileData()
                        setIsRecharging(false)
                        setRechargeAmount('')
                    } else {
                        showErrorNotification('Recharge Failed', data.message)
                    }
                } catch (error) {
                    console.log(error)
                    showErrorNotification('Error', error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Initiate Recharge API Call
    const rechargeWallet = async () => {
        if (!rechargeAmount || isNaN(rechargeAmount) || Number(rechargeAmount) <= 0) {
            showErrorNotification('Invalid Amount', "Please enter a valid amount");
            return;
        }

        try {
            const { data } = await axios.post(backendUrl + '/api/user/recharge-wallet-razorpay', { userId: userData._id, amount: Number(rechargeAmount) }, { headers: { token } })
            if (data.success) {
                initRecharge(data.order)
            } else {
                showErrorNotification('Recharge Failed', data.message)
            }
        } catch (error) {
            console.log(error)
            showErrorNotification('Error', error.message)
        }
    }

    return userData ? (
        <div className='max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 font-outfit h-[calc(100vh-[100px])] min-h-screen sm:min-h-0'>
            <div className='flex flex-col gap-6 h-full'>

                {/* Header Profile Section - Horizontal */}
                <div className='bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-3xl p-6 border border-gray-100 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden shrink-0'>
                    {/* Decorative Background Blur */}
                    <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-primary/10 to-transparent -z-10"></div>

                    <div className='relative shrink-0'>
                        {isEdit
                            ? <label htmlFor='image' >
                                <div className='inline-block relative cursor-pointer group/avatar'>
                                    <img className='w-28 h-28 rounded-full md:rounded-2xl object-cover shadow-lg opacity-90 group-hover/avatar:opacity-70 transition-all border-4 border-white' src={image ? URL.createObjectURL(image) : userData.image} alt="" />
                                    <div className='absolute inset-0 flex items-center justify-center bg-black/40 rounded-full md:rounded-2xl opacity-0 group-hover/avatar:opacity-100 transition-opacity'>
                                        <img className='w-8 h-8 filter invert' src={assets.upload_icon} alt="Upload" />
                                    </div>
                                </div>
                                <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                            </label>
                            : <img className='w-28 h-28 rounded-full md:rounded-2xl object-cover shadow-lg border-4 border-white transition-transform duration-500 hover:scale-105' src={userData.image} alt="" />
                        }
                    </div>

                    <div className='flex-1 text-center md:text-left'>
                        {isEdit
                            ? <input className='bg-gray-50/50 text-2xl font-bold text-gray-800 rounded-xl px-4 py-2 w-full max-w-sm border-2 border-transparent focus:outline-none focus:border-primary focus:bg-white transition-all mb-1 mx-auto md:mx-0 text-center md:text-left' type="text" onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))} value={userData.name} />
                            : <h1 className='text-3xl font-bold text-gray-900 mb-1'>{userData.name}</h1>
                        }
                        <p className='text-gray-500 font-medium bg-gray-50 py-1.5 px-4 rounded-full inline-block text-sm'>{userData.email}</p>
                    </div>

                    <div className='w-full md:w-auto mt-2 md:mt-0'>
                        {isEdit
                            ? <button onClick={updateUserProfileData} className='w-full md:w-48 bg-gradient-to-r from-primary to-blue-600 text-white font-semibold text-base py-3 px-6 rounded-xl shadow-[0_8px_20px_-6px_rgba(var(--primary-rgb),0.5)] hover:shadow-[0_12px_25px_-6px_rgba(var(--primary-rgb),0.6)] transition-all transform hover:-translate-y-0.5'>Save Changes</button>
                            : <button onClick={() => setIsEdit(true)} className='w-full md:w-48 bg-white border-2 border-primary/20 text-primary font-semibold text-base py-3 px-6 rounded-xl hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm'>Edit Profile</button>
                        }
                    </div>
                </div>

                {/* Bottom Section - 3 Column Grid */}
                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1'>

                    {/* Contact Information */}
                    <div className='bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-3xl p-6 md:p-8 border border-gray-100 flex flex-col h-full'>
                        <h3 className='text-lg font-bold text-gray-900 mb-6 flex items-center gap-3'>
                            <div className='w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0'>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </div>
                            Contact Info
                        </h3>

                        <div className='flex flex-col gap-4 flex-1'>
                            <div className='p-4 md:p-5 rounded-2xl bg-gray-50/50 border border-transparent hover:border-gray-100 transition-colors'>
                                <p className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2'>Phone</p>
                                {isEdit
                                    ? <input className='w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm' type="text" onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} value={userData.phone} />
                                    : <p className='text-base md:text-lg text-gray-900 font-semibold'>{userData.phone}</p>
                                }
                            </div>

                            <div className='p-4 md:p-5 rounded-2xl bg-gray-50/50 border border-transparent hover:border-gray-100 transition-colors flex-1'>
                                <p className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2'>Address</p>
                                {isEdit
                                    ? <div className='flex flex-col gap-3'>
                                        <input className='w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm' type="text" placeholder='Line 1' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={userData.address.line1} />
                                        <input className='w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm' type="text" placeholder='Line 2' onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={userData.address.line2} />
                                    </div>
                                    : <p className='text-base md:text-lg text-gray-900 font-semibold leading-relaxed'>{userData.address.line1} <br /> {userData.address.line2}</p>
                                }
                            </div>
                        </div>
                    </div>

                    {/* Basic Information */}
                    <div className='bg-white shadow-[0_4px_20px_rgb(0,0,0,0.03)] rounded-3xl p-6 md:p-8 border border-gray-100 flex flex-col h-full'>
                        <h3 className='text-lg font-bold text-gray-900 mb-6 flex items-center gap-3'>
                            <div className='w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0'>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </div>
                            Basic Details
                        </h3>

                        <div className='flex flex-col gap-4 flex-1'>
                            <div className='p-4 md:p-5 rounded-2xl bg-gray-50/50 border border-transparent hover:border-gray-100 transition-colors'>
                                <p className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2'>Gender</p>
                                {isEdit
                                    ? <div className='relative'>
                                        <select className='w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 appearance-none cursor-pointer transition-all text-sm' onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))} value={userData.gender} >
                                            <option value="Not Selected">Not Selected</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                        </select>
                                        <svg className="w-4 h-4 text-gray-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                    </div>
                                    : <p className='text-base md:text-lg text-gray-900 font-semibold'>{userData.gender}</p>
                                }
                            </div>

                            <div className='p-4 md:p-5 rounded-2xl bg-gray-50/50 border border-transparent hover:border-gray-100 transition-colors'>
                                <p className='text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2'>Date of Birth</p>
                                {isEdit
                                    ? <input className='w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 font-medium focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all text-sm' type='date' onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} value={userData.dob} />
                                    : <p className='text-base md:text-lg text-gray-900 font-semibold'>{userData.dob || 'Not Provided'}</p>
                                }
                            </div>
                        </div>
                    </div>

                    {/* Premium Wallet Card */}
                    <div className='bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl flex flex-col h-full'>
                        {/* Abstract Background Shapes */}
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-2xl -ml-10 -mb-10 pointer-events-none"></div>

                        <div className='relative z-10 flex flex-col h-full'>
                            <div className='flex justify-between items-center mb-6'>
                                <h3 className='text-sm font-medium text-gray-300 tracking-wider flex items-center gap-2'>
                                    <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                    Digital Wallet
                                </h3>
                                <div className='px-3 py-1 bg-white/10 rounded-full text-[10px] font-semibold backdrop-blur-sm border border-white/5 uppercase tracking-wider'>Active</div>
                            </div>

                            <div className='mb-auto pt-2'>
                                <p className='text-xs text-gray-400 mb-1 ml-1 uppercase tracking-wider font-medium'>Available Balance</p>
                                <p className='text-5xl font-bold tracking-tight'>{currency}{userData.walletBalance || 0}</p>
                            </div>

                            <div className='pt-8 mt-auto'>
                                {isRecharging ? (
                                    <div className='flex flex-col gap-3 bg-white/5 p-4 rounded-2xl backdrop-blur-md border border-white/10'>
                                        <div className='relative'>
                                            <span className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-base'>₹</span>
                                            <input
                                                className='w-full bg-black/40 border border-white/10 rounded-xl pl-8 pr-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all text-sm'
                                                type="number"
                                                placeholder="Amount"
                                                value={rechargeAmount}
                                                onChange={(e) => setRechargeAmount(e.target.value)}
                                                autoFocus
                                            />
                                        </div>
                                        <div className='flex gap-2'>
                                            <button onClick={rechargeWallet} className='flex-1 bg-white text-gray-900 font-bold text-sm py-2.5 rounded-xl hover:bg-gray-100 transition-colors'>Pay Now</button>
                                            <button onClick={() => { setIsRecharging(false); setRechargeAmount(''); }} className='px-4 py-2.5 bg-white/10 text-white text-sm rounded-xl hover:bg-white/20 font-bold transition-colors border border-white/5'>Cancel</button>
                                        </div>
                                    </div>
                                ) : (
                                    <button onClick={() => setIsRecharging(true)} className='w-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium py-4 rounded-xl backdrop-blur-sm transition-all duration-300 flex justify-center items-center gap-2 group text-base'>
                                        <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
                                        Add Money
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    ) : null
}

export default MyProfile