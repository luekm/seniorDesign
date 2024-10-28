import React, { useEffect } from 'react'
import { LocationInterface } from '../shared/Interfaces'
import { HomeVetScreenParams } from './HomeVetScreen'

export interface HomeScreenParams {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface
}
function HomeScreen(props: any) {

    //region States
    const params: HomeScreenParams = props.route.params as HomeScreenParams

    //endregion



    useEffect(() => {
        if (params.userIsVet) {
            props.navigation.replace("VetHome", params as HomeVetScreenParams)
        } else {
            props.navigation.replace("HomeClient", params)
        }
    }, [])

    return <></>



}

export default HomeScreen
