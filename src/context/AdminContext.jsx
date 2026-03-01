import axios from "axios";
import { createContext, useState } from "react";
import { showSuccessNotification, showErrorNotification } from "../components/NotificationToast";


export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')

    const [appointments, setAppointments] = useState([])
    const [doctors, setDoctors] = useState([])
    const [patients, setPatients] = useState([])
    const [dashData, setDashData] = useState(false)

    // Getting all Doctors data from Database using API
    const getAllDoctors = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/all-doctors', { headers: { aToken } })
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                showErrorNotification('Error', data.message)
            }

        } catch (error) {
            showErrorNotification('Error', error.message)
        }

    }

    // Function to change doctor availablity using API
    const changeAvailability = async (docId) => {
        try {

            const { data } = await axios.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { aToken } })
            if (data.success) {
                showSuccessNotification('Status Updated', data.message)
                getAllDoctors()
            } else {
                showErrorNotification('Update Failed', data.message)
            }

        } catch (error) {
            console.log(error)
            showErrorNotification('Error', error.message)
        }
    }


    // Getting all appointment data from Database using API
    const getAllAppointments = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/appointments', { headers: { aToken } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
            } else {
                showErrorNotification('Error', data.message)
            }

        } catch (error) {
            showErrorNotification('Error', error.message)
            console.log(error)
        }

    }

    // Getting all Patients data from Database using API
    const getAllPatients = async () => {

        try {

            const { data } = await axios.get(backendUrl + '/api/admin/all-patients', { headers: { aToken } })
            if (data.success) {
                setPatients(data.patients)
            } else {
                showErrorNotification('Error', data.message)
            }

        } catch (error) {
            showErrorNotification('Error', error.message)
            console.log(error)
        }

    }

    // Function to cancel appointment using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axios.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } })

            if (data.success) {
                showSuccessNotification('Appointment Cancelled', data.message)
                getAllAppointments()
            } else {
                showErrorNotification('Cancellation Failed', data.message)
            }

        } catch (error) {
            showErrorNotification('Error', error.message)
            console.log(error)
        }

    }

    // Getting Admin Dashboard data from Database using API
    const getDashData = async () => {
        try {

            const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })

            if (data.success) {
                setDashData(data.dashData)
            } else {
                showErrorNotification('Error', data.message)
            }

        } catch (error) {
            console.log(error)
            showErrorNotification('Error', error.message)
        }

    }

    const value = {
        aToken, setAToken,
        doctors,
        getAllDoctors,
        changeAvailability,
        appointments,
        getAllAppointments,
        patients,
        getAllPatients,
        getDashData,
        cancelAppointment,
        dashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider