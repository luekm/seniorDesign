import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View, TextInput, Pressable, Alert, TouchableHighlight } from "react-native"
import { Button, Card, Text, TopNavigation } from '@ui-kitten/components'
import { Dimensions } from 'react-native'
import { BASE_URL } from "../shared/Constants"
import { styles } from "../shared/Styles"
import { homeStyles } from "./HomeStyles"
import { FontAwesome5 } from '@expo/vector-icons'
import { HomeClient_PetProfile } from "./HomeClient_PetProfile"
import TopNavbar from '../../components/TopNavbar'
import { LocationInterface } from '../shared/Interfaces'
import { EditPetScreenParams } from '../EditPet/EditPetScreen'
import { CreatePetScreenParams } from '../CreatePet/CreatePetScreen'
import { CreateAppointmentParams } from '../CreateAppointment/CreateAppointmentScreen'
import { ViewAppointmentScreenParams } from '../ViewAppointment/ViewAppointmentScreen'
import { LocationDisplay } from '../../components/LocationDisplay'
import ClientNavbar from '../../components/ClientNavbar'
import { ClientHomeScreenNavigationProp, ClientHomeScreenRouteProp } from '../../utils/props'
import { appointment, pet } from '@prisma/client'
import { PaymentStripeScreenParams } from '../PaymentStripe/PaymentStripeScreen'
import { SettingsScreenParams } from '../SettingsScreen/SettingsScreen'
import { colors } from '../shared/Colors'
import axios from 'axios'

export interface HomeClientScreenParams {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface
}
function HomeClientScreen(props: { route: ClientHomeScreenRouteProp, navigation: ClientHomeScreenNavigationProp }) {

    //region States
    const params: HomeClientScreenParams = props.route.params as HomeClientScreenParams

    const [pets, setPets] = useState<any[]>([])
    const [petsData, setPetsData] = useState<{ pet: any, appointment: any }[]>([])

    //endregion
    const [loading, setLoading] = useState(true)
    //endregion

    //region Functions
    function settings() {
        props.navigation.navigate("Settings", { ...params } as SettingsScreenParams)
    }

    // INITIALIZATION --- INITIALIZATION --- INITIALIZATION --- INITIALIZATION --- INITIALIZATION --- INITIALIZATION --- INITIALIZATION --- INITIALIZATION

    useEffect(() => {
        fetchPets()
    }, [])



    const fetchPets = async () => {
        setLoading(true)
        const res = await fetch(BASE_URL + "/owner/pet/" + params.userId)

        const tempPetList: pet[] = await res.json()
        setPets(tempPetList)
        const tempPetsData: { pet: any, appointment: any }[] = []
        for (let i = 0; i < tempPetList.length; i++) {
            const res = await fetch(BASE_URL + "/pet/appointment/" + tempPetList[i].pid)
            let tempAppointment: appointment = await res.text()
                .then(text => text.length ? JSON.parse(text) : "NO_APT")
                .catch(err => console.log(err))
            tempPetsData.push({ pet: tempPetList[i], appointment: tempAppointment })
        }

        // params.user.petList = tempPetList

        setPetsData(tempPetsData)
        setLoading(false)
    }


    //region Create / Accept Appointment
    function createAppointment(index: number) {
        let createAppointmentParams: CreateAppointmentParams = {
            ...params,
            petId: pets[index].pid
        }
        props.navigation.navigate("CreateAppointment", createAppointmentParams)
    }

    function viewAppointment(index: number) {
        let viewAppointmentParams: ViewAppointmentScreenParams = {
            ...params,
            appointmentId: petsData[index]["appointment"].aid
        }
        props.navigation.navigate("ViewAppointment", viewAppointmentParams)
    }

    async function payAppointment(index: number) {
        let appointment: any = petsData[index]["appointment"]
        let paymentStripeParams: PaymentStripeScreenParams = {
            ...params,
            transactionId: appointment.transaction.id,
            appointmentId: appointment.aid,
            revieweeId: appointment.vet.id,
            revieweeFirstName: appointment.vet.firstName,
            revieweeLastName: appointment.vet.lastName,
            revieweeAverageRating: appointment.vet.userAccount.averageRating,
            // transaction: appointment.transaction,
            // oid: userDetails.user.id,
            // appointment: appointment.aid,
            // reviewer: userDetails.user,
            // reviewee: appointment.vet,
            // reviewerlocation: userDetails.location
            transactionAmount: appointment.transaction.amount,
            transactionReceipt: appointment.transaction.receipt
        }

        //temporary method
        // props.navigation.popToTop()
        props.navigation.navigate("PaymentStripe", paymentStripeParams)
    }

    //region Pet Screen Functions
    async function addPet() {
        let createPetParams: CreatePetScreenParams = {
            ...params
        }
        props.navigation.navigate("CreatePet", createPetParams)
    }

    function editPet(index: number) {
        let editPetParams: EditPetScreenParams = {
            userId: params.userId,
            userIsVet: params.userIsVet,
            location: params.location,
            petId: pets[index].pid,
        }
        props.navigation.navigate("EditPet", editPetParams)
    }

    return (
        <SafeAreaView style={styles.background}>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 'auto', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 200, marginLeft: 20, marginVertical: 20 }}>
                    <FontAwesome5 name='location-arrow' color={colors.blue} size={24} style={{ marginRight: 10 }} />
                    <LocationDisplay location={params.location} navigation={props.navigation} userId={params.userId} userIsVet={params.userIsVet} />
                </View>
            </View>
            <Text style={{ marginRight: 'auto', marginLeft: 20, fontSize: 28, fontWeight: 'bold' }}>My Pets</Text>
            <ScrollView
                contentContainerStyle={{ width: Dimensions.get("window").width, height: "100%" }}>

                <View style={[homeStyles.container, { width: "90%", marginLeft: "auto", marginRight: "auto" }]}>
                    {loading && <Text style={{ marginLeft: "auto", marginRight: "auto" }}>Loading..</Text>}
                    <View style={homeStyles.container}>
                        {(!petsData || petsData.length == 0) &&
                            (<View key={0} style={homeStyles.petInfo}>
                                <Text style={styles.boldText}> NO PETS </Text>
                            </View>)
                        }
                        {petsData && petsData.length > 0 && petsData.map((petData, index) =>
                        (
                            <HomeClient_PetProfile
                                key={index}
                                petData={petData}
                                editPet={() => editPet(index)}
                                createAppointment={() => createAppointment(index)}
                                viewAppointment={() => viewAppointment(index)}
                                payAppointment={() => payAppointment(index)}
                            />
                        )
                        )
                        }
                    </View>
                </View>

                </ScrollView>
                <View style={homeStyles.addPetContainer}>
                    <Button onPress={() => addPet()} style={{'marginLeft' : -17}}>
                        <FontAwesome5 name='plus' color={colors.blue} size={24} />
                    </Button>
                    <Button onPress={() => fetchPets()} style={{ 'marginLeft': 5}}>
                        <Text>Refresh List</Text>
                    </Button>
                    <Button onPress={() => props.navigation.navigate('AnnualCheckup')} style={{'width' : 150, 'marginLeft':5}}>
                        <Text>Setup Annual Appointment </Text>
                    </Button>

                </View>
            <ClientNavbar navigation={props.navigation} {...params} />

        </SafeAreaView>

    )

}

export default HomeClientScreen
