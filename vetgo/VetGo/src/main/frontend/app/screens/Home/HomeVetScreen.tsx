import React, { useEffect, useState } from 'react'
import { Linking, SafeAreaView, ScrollView, StyleSheet, View, TextInput, Pressable, Alert } from "react-native"
import { Button, Card, Text } from '@ui-kitten/components'
import { FontAwesome5 } from '@expo/vector-icons'
import { Dimensions } from 'react-native'
import { BASE_URL } from "../shared/Constants"
import { styles } from "../shared/Styles"
import { homeStyles } from "./HomeStyles"
import HomeVet_AvailableAppointment from "./HomeVet_AvailableAppointment"
import HomeVet_ScheduledAppointment from "./HomeVet_ScheduledAppointment"
import TopNavbar from '../../components/TopNavbar'
import { LocationInterface } from '../shared/Interfaces'
import { VetAddChargesScreenParams } from '../VetAddCharges/VetAddChargesScreen'
import { CheckupExamScreenParams } from '../DuringAppointment/CheckupExamScreen'
import { ViewAppointmentScreenParams } from '../ViewAppointment/ViewAppointmentScreen'
import { VetDuringAppointmentMedicalHistoryScreenParams } from '../DuringAppointment/VetDuringAppointmentMedicalHistoryScreen'
import { HomeScreenParams } from './HomeScreen'
import ClientNavbar from '../../components/ClientNavbar'
import { SettingsScreenParams } from '../SettingsScreen/SettingsScreen'
import CalendarScreen from '../Calendar/CalendarScreen'
import Stomp from "stompjs"
import SockJS from "sockjs-client"
import { colors } from '../shared/Colors'
import { LocationDisplay } from '../../components/LocationDisplay'

export interface HomeVetScreenParams {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface
}

function HomeVetScreen(props: any) {

    //region States
    const params = props.route.params as HomeVetScreenParams

    const [vetLicenseStatus, setVetLicenseStatus] = useState<boolean>(false)
    const [availableAppointments, setAvailableAppointments] = useState<any[]>([])
    const [scheduledAppointments, setScheduledAppointments] = useState<any[]>([])
    //endregion
    const [loading, setLoading] = useState(true)


    function settings() {
        props.navigation.navigate("Settings", { ...params } as SettingsScreenParams)
    }

    useEffect(() => {
        fetchAndHydrateVetData()
        fetchAndHydrateAppointmentsData()
    }, [])

    // function goToExam() {
    //     props.navigation.navigate("CheckupExamScreen", { ...params} as CheckupExamScreenParams)
    // }



    async function fetchAndHydrateVetData() {

        let url = BASE_URL + "/vet/id/" + params.userId
        const res = await fetch(url)

        const vetData = await res.json()
        if (vetData.status != undefined)
            setVetLicenseStatus(vetData.status)

    }

    async function fetchAndHydrateAppointmentsData() {
        setLoading(true)
        let newCoords = {
            latitude: params.location.latitude,
            longitude: params.location.longitude,
            radius: 100
        }

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCoords)
        }
        let url = BASE_URL + "/appointment/all"
        // const res = await fetch(url, requestOptions)
        
        let appointmentList = await (await fetch(url)).json()

        // const appointmentList = await res.json()
        let temp_availableAppointments: any[] = []
        let temp_scheduledAppointments: any[] = []
        for (let appointment of appointmentList) {
            switch (appointment.status) {
                case "WAITING":
                    temp_availableAppointments.push(appointment)
                    break
                case "PAYMENT":
                    temp_scheduledAppointments.push(appointment)
                    break
                case "ACCEPTED":
                    temp_scheduledAppointments.push(appointment)
                    break
                default:
                    temp_availableAppointments.push(appointment)
                    break
            }
        }
        console.log(temp_availableAppointments)
        console.log(temp_scheduledAppointments)

        setAvailableAppointments(temp_availableAppointments)
        setScheduledAppointments(temp_scheduledAppointments)

        setLoading(false)
    }

    async function acceptAppointment(appointmentData: any) {
        let url = BASE_URL + "/appointment/accept/" + appointmentData.aid + "/" + params.userId

        let res = await fetch(url, { method: 'PUT' })
            .then((response) => response.text())
        fetchAndHydrateAppointmentsData()
        // if (res.includes("updated appointment to payment status")) {
        //     props.navigation.popToTop();
        //     props.navigation.replace("Home", {...params} as HomeScreenParams);
        // } else {
        //     console.error(res);
        // }
    }
    function duringAppointment(appointmentData: any) {
        let checkupExamScreenParams: CheckupExamScreenParams = {
            ...params,
            appointmentId: appointmentData.aid,
            petId: appointmentData.pet.pid,
            heartRate: "", 
            heartItems: [], 
            heartNotes: "", 
            lungSounds: "", 
            lungNotes: "", 
            eyeItems: [], 
            tearProduction: "", 
            eyePressure: "", 
            eyelidExamination: "", 
            irisExamination: "", 
            lensExamination: "", 
            retinaExamination: "", 
            opticNerveExamination: "", 
            coatItems: [], 
            coatNotes: "", 
            skinItems: [], 
            skinNotes: "", 
            earItems: [], 
            earNotes: "", 
            noseItems: [], 
            noseNotes: "", 
            mouthAndTeethItems: [], 
            mouthNotes:"", 
            teethNotes: "", 
            gaitAndPostureItems: [], 
            gaitNotes: "", 
            postureNotes: "", 
            feetNotes: "", 
            weight: 0, 
            weightMessurement: "", 
            weightAnalysis: "", 
            muscleStructureNotes: "", 
            temperature: 0, 
            dietNotes: "", 
            habitNotes: "", 
            behaviorNotes: "", 
            shots: ""
        }
        props.navigation.navigate("CheckupExam", checkupExamScreenParams as CheckupExamScreenParams)

    }

    function viewAppointment(appointmentData: any) {

        let viewAppointmentParams: ViewAppointmentScreenParams = {
            ...params,
            appointmentId: appointmentData.aid
        }

        // console.log("Printing appointment Detail" + JSON.stringify(appointmentDetail))
        props.navigation.navigate("ViewAppointment", viewAppointmentParams)
    }

    async function viewCalendar(appointmentData: any) {
        console.log("data")
        //         console.log(appointmentData)
        //         console.log(params.userId)
        //         console.log("end data")

        let viewCalendarParams = {
            ...params,
            time: appointmentData.time,
        }

        console.log(viewCalendarParams)

        function createAuthAlert(url, client) {
            Alert.alert('Alert', 'Allow VetGo to access your Google Account?', [
                {
                    text: 'Cancel',
                    onPress: () => {
                        console.log('Cancel Pressed')
                        client.disconnect()
                    },
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: async () => {
                        //Linking.openURL(url)
                        // TODO: in a perfect world, this Linking.open would
                        // open the consent screen on your mobile browser,
                        // but google doesnt respect the default android emu browser
                        // so you gotta click on the link in the console :(
                        console.log("OK pressed - this is a placeholder for opening a link!")
                        let response = await fetch(url,
                            { method: 'GET', }
                        ).then((response) => response.text()
                        )
                    },
                },
            ])
        }

        const socket = new SockJS(BASE_URL + "/ws")
        const client = Stomp.over(socket)

        client.connect({}, async () => {
            console.log(client.state)
            client.subscribe("/topic/messages", (message: string) => {
                //             console.log(client.status)
                console.log(`Received: ${message}`)
                const receivedMessage = message.body
                let obj = JSON.parse(receivedMessage)
                console.log(obj.content)
                if (obj.content[4] == params.userId) {
                    console.log("you got authed!")
                    client.disconnect()
                    props.navigation.navigate("CalendarScreen", viewCalendarParams)
                }
            })

            let url = BASE_URL + "/calendar/credentialExists/user" + params.userId
            console.log(url)

            let response = await fetch(url,
                { method: 'GET', }
            ).then((response) => {
                response.text()
                console.log(response)
                console.log("Status: " + response.status)
                if (response.status == 200) {
                    client.disconnect()
                    props.navigation.navigate("CalendarScreen", viewCalendarParams)
                }
                else if (response.status == 404) {
                    createAuthAlert(BASE_URL + "/calendar/addCredential/user" + params.userId, client)
                }
            }
            )



            //             const response = await fetch(url,
            //                             { method: 'GET', }
            //                             ).then((response) => response.text()
            //                             )
            //.then(props.navigation.navigate("CalendarScreen", appointmentData))
        })
        //       console.log("AA")
        //           setStompClient(client);
    }


    return (
        <SafeAreaView style={styles.background}>
            <ScrollView contentContainerStyle={{ width: Dimensions.get("window").width }}>
                {/*Not validated vet view*/}
                {!vetLicenseStatus &&
                    <Card style={{ flex: 1, width: "100%" }}>
                        <Text style={{ alignSelf: "center" }} category='h5'>
                            You are not validated. {"\n\n\n"}
                        </Text>
                        <Text category='h6'>
                            Please contact us through: {"\n"}
                            (ENTER_EMAIL_HERE) {"\n"}
                            (ENTER_PHONE_NUMBER). {"\n"}
                        </Text>
                    </Card>
                }

                {/*Validated vet view*/}
                {vetLicenseStatus &&
                    <View style={homeStyles.container}>
                        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginRight: 'auto', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 200, marginLeft: 20, marginVertical: 20 }}>
                                <FontAwesome5 name='location-arrow' color={colors.blue} size={24} style={{ marginRight: 10 }} />
                                <LocationDisplay location={params.location} navigation={props.navigation} userId={params.userId} userIsVet={params.userIsVet} />
                            </View>
                        </View>
                        {loading && <Text style={{ marginLeft: "auto", marginRight: "auto" }}>Loading..</Text>}
                        <View style={homeStyles.container}>
                            <View style={{ width: "90%", marginLeft: "auto", marginRight: "auto", marginTop: 20 }}>
                                <Text style={styles.boldText}> Accepted Appointments </Text>
                                {(!scheduledAppointments || scheduledAppointments.length === 0) &&
                                    (<View style={homeStyles.petInfo}>
                                        <Text style={styles.boldText}> NO APPOINTMENTS </Text>
                                    </View>)
                                }
                                {scheduledAppointments && scheduledAppointments.length > 0 && scheduledAppointments.map((appointmentData, index) => {
                                    return <React.Fragment key={"scheduledAppointment_" + index}>{
                                        <HomeVet_ScheduledAppointment
                                            appointmentData={appointmentData}
                                            appointmentIndex={index}
                                            duringAppointment={() => duringAppointment(appointmentData)}
                                            viewAppointment={() => viewAppointment(appointmentData)}
                                        />
                                    }
                                    </React.Fragment>
                                })}
                            </View>

                            <View style={{ width: "90%", marginLeft: "auto", marginRight: "auto", marginTop: 40 }}>
                                <Text style={styles.boldText}> Available Appointments </Text>
                                {(!availableAppointments || availableAppointments.length === 0) &&
                                    (<View style={homeStyles.petInfo}>
                                        <Text style={styles.boldText}> NO APPOINTMENTS </Text>
                                    </View>)
                                }
                                {availableAppointments && availableAppointments.length > 0 && availableAppointments.map((appointmentData, index) => {
                                    return <React.Fragment key={"availableAppointment_" + index}>{(
                                        HomeVet_AvailableAppointment(appointmentData, index, () => {
                                            acceptAppointment(appointmentData)
                                        }, () => { viewCalendar(appointmentData) })

                                    )}
                                    </React.Fragment>
                                })}
                            </View>
                        </View>
                    </View>
                }
            </ScrollView>
            <ClientNavbar navigation={props.navigation} {...params} />
        </SafeAreaView>

    )

}

export default HomeVetScreen
