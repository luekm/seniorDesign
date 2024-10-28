import React, { useEffect } from 'react'
import { LocationInterface } from '../shared/Interfaces'
import { CreateReviewClientScreenParams } from './CreateReviewClientScreen'
import { CreateReviewVetScreenParams } from './CreateReviewVetScreen'

export interface CreateReviewScreenParams {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface,
    reviewerId: string,
    revieweeId: string,
    revieweeFirstName: string,
    revieweeLastName: string,
    revieweeAverageRating: number,
    appointmentId: string,
}
function CreateReviewScreen(props: any) {

    //region States
    const params = props.route.params as CreateReviewScreenParams

    //endregion


    useEffect(() => {
        if (params.userIsVet) {
            props.navigation.replace("CreateReviewVet", { ...params } as CreateReviewClientScreenParams)
        } else {
            props.navigation.replace("CreateReviewClient", { ...params } as CreateReviewVetScreenParams)
        }
    }, [])

    return <></>



}

export default CreateReviewScreen
