import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const PatientsList = () => {

    const { patients, aToken, getAllPatients } = useContext(AdminContext)

    useEffect(() => {
        if (aToken) {
            getAllPatients()
        }
    }, [aToken])

    return (
        <div className='m-5 max-h-[90vh] overflow-y-scroll'>
            <h1 className='text-lg font-medium'>All Patients</h1>
            <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
                {patients.map((item, index) => (
                    <div className='border border-[#C9D8FF] rounded-xl max-w-56 w-56 overflow-hidden bg-white group' key={index}>
                        <div className='w-full h-48 bg-[#EAEFFF] flex items-center justify-center overflow-hidden'>
                            <img className='w-full h-full object-cover group-hover:scale-105 transition-all duration-500' src={item.image} alt="" />
                        </div>
                        <div className='p-4'>
                            <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                            <p className='text-[#5C5C5C] text-sm break-all'>{item.email}</p>
                            <div className='mt-3 flex flex-col gap-1 text-sm text-[#5C5C5C]'>
                                <p><b>Phone:</b> {item.phone || "N/A"}</p>
                                <p><b>DOB:</b> {item.dob || "N/A"}</p>
                                <p><b>Gender:</b> {item.gender || "N/A"}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PatientsList
