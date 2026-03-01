import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { showSuccessNotification, showErrorNotification } from '../components/NotificationToast';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const { backendUrl } = useContext(AppContext);
    const navigate = useNavigate();

    // Phase 1: Request OTP
    const [role, setRole] = useState('Patient'); // 'Patient' or 'Doctor'
    const [email, setEmail] = useState('');

    // Phase 2: Verify OTP & Reset
    const [otpSent, setOtpSent] = useState(false);
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            let endpoint = '';
            if (role === 'Patient') endpoint = '/api/user/send-otp';
            if (role === 'Doctor') endpoint = '/api/doctor/send-otp';

            const { data } = await axios.post(backendUrl + endpoint, { email });

            if (data.success) {
                showSuccessNotification('Recovery Code Sent', data.message);
                setOtpSent(true);
            } else {
                showErrorNotification('Failed to Send', data.message);
            }
        } catch (error) {
            showErrorNotification('Error', error.message);
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            let endpoint = '';
            if (role === 'Patient') endpoint = '/api/user/reset-password';
            if (role === 'Doctor') endpoint = '/api/doctor/reset-password';

            const { data } = await axios.post(backendUrl + endpoint, { email, otp, newPassword });

            if (data.success) {
                showSuccessNotification('Password Reset', data.message);
                navigate('/login');
            } else {
                showErrorNotification('Reset Failed', data.message);
            }
        } catch (error) {
            showErrorNotification('Error', error.message);
        }
    };

    return (
        <div className='min-h-[calc(100vh-100px)] flex items-center justify-center p-4 font-outfit relative overflow-hidden'>
            {/* Background Decor */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

            <div className='w-full max-w-md'>
                <div className='bg-white shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100/80 rounded-[2rem] p-8 sm:p-10 relative overflow-hidden backdrop-blur-xl bg-white/95'>

                    {/* Decorative Corner Glow */}
                    <div className='absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-primary/30 to-blue-400/20 rounded-full blur-2xl'></div>

                    <div className='text-center mb-10 relative z-10'>
                        <div className='inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6 shadow-sm border border-primary/10'>
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
                        </div>
                        <h2 className='text-3xl font-extrabold text-gray-900 tracking-tight mb-2'>Account Recovery</h2>
                        <p className='text-gray-500 text-sm font-medium'>
                            {otpSent ? 'Reset your password to regain access' : 'Enter your details to receive a recovery code'}
                        </p>
                    </div>

                    <div className='relative z-10'>
                        {!otpSent ? (
                            <form onSubmit={handleSendOtp} className='w-full flex flex-col gap-5'>

                                {/* Role Selection Toggle */}
                                <div className="flex w-full bg-gray-50/80 p-1.5 rounded-2xl mb-2 border border-gray-100 shadow-inner">
                                    {['Patient', 'Doctor'].map((r) => (
                                        <button
                                            key={r}
                                            type="button"
                                            onClick={(e) => { e.preventDefault(); setRole(r); }}
                                            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${role === r ? 'bg-white text-primary shadow-sm ring-1 ring-gray-200/50' : 'text-gray-500 hover:text-gray-900 hover:bg-white/50'}`}
                                        >
                                            {r}
                                        </button>
                                    ))}
                                </div>

                                <div>
                                    <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1'>Email Address</label>
                                    <input
                                        onChange={(e) => setEmail(e.target.value)}
                                        value={email}
                                        className='w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl px-4 py-3.5 text-gray-800 font-medium focus:outline-none focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all'
                                        type="email"
                                        placeholder='you@example.com'
                                        required
                                    />
                                </div>

                                <button type="submit" className='w-full bg-gradient-to-r from-primary to-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_8px_20px_-6px_rgba(var(--primary-rgb),0.5)] hover:shadow-[0_12px_25px_-6px_rgba(var(--primary-rgb),0.6)] transform hover:-translate-y-0.5 transition-all mt-4 text-lg'>
                                    Send Recovery Code
                                </button>

                                <div className='mt-8 text-center pt-2'>
                                    <p onClick={() => navigate('/login')} className='text-sm text-gray-500 font-medium hover:text-primary cursor-pointer transition-colors flex items-center justify-center gap-2 group'>
                                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                                        Back to Login
                                    </p>
                                </div>
                            </form>
                        ) : (
                            <form onSubmit={handleResetPassword} className='w-full flex flex-col gap-5'>

                                <div className='bg-green-50 text-green-700 p-4 rounded-xl border border-green-200/50 text-sm font-bold flex items-center justify-center gap-2.5 mb-2 shadow-sm'>
                                    <div className='bg-green-100 p-1 rounded-full'>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                    </div>
                                    Code Sent to {email.split('@')[0]}***@{email.split('@')[1]}
                                </div>

                                <div>
                                    <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1 text-center'>6-Digit Verification Code</label>
                                    <input
                                        onChange={(e) => setOtp(e.target.value)}
                                        value={otp}
                                        className='w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl px-4 py-3.5 text-gray-800 focus:outline-none focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all tracking-[0.5em] text-center text-3xl font-extrabold placeholder-gray-300'
                                        type="text"
                                        maxLength={6}
                                        placeholder='••••••'
                                        autoFocus
                                        required
                                    />
                                </div>

                                <div>
                                    <label className='block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1.5 ml-1'>New Password</label>
                                    <input
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        value={newPassword}
                                        className='w-full bg-gray-50/50 border-2 border-gray-100 rounded-xl px-4 py-3.5 text-gray-800 font-medium focus:outline-none focus:bg-white focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all'
                                        type="password"
                                        placeholder='Must be at least 8 characters'
                                        required
                                    />
                                </div>

                                <button type="submit" className='w-full bg-gradient-to-r from-primary to-blue-600 text-white font-bold py-4 rounded-xl shadow-[0_8px_20px_-6px_rgba(var(--primary-rgb),0.5)] hover:shadow-[0_12px_25px_-6px_rgba(var(--primary-rgb),0.6)] transform hover:-translate-y-0.5 transition-all mt-4 text-lg'>
                                    Reset Password & Login
                                </button>

                                <div className='mt-8 text-center pt-2'>
                                    <p onClick={() => setOtpSent(false)} className='text-sm text-gray-500 font-medium hover:text-primary cursor-pointer transition-colors flex items-center justify-center gap-2 group'>
                                        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                                        Use a Different Email
                                    </p>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
