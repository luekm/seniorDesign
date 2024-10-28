import React, { useEffect } from 'react'
import { LocationInterface } from '../shared/Interfaces'

export interface ViewAppointmentScreenParams {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface,
    appointmentId: string
}
function ViewAppointmentScreen(props: any) {

    //region States
    const params: ViewAppointmentScreenParams = props.route.params as ViewAppointmentScreenParams

    //endregion



    useEffect(() => {
        if (params.userIsVet) {
            props.navigation.replace("ViewAppointmentVet", params)
        } else {
            props.navigation.replace("ViewAppointmentClient", params)
        }
    }, [])

    return <></>



}

export default ViewAppointmentScreen
