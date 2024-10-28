import React, { useEffect, useState } from 'react'

import { SafeAreaView, Text, View, Pressable, Image } from "react-native"
import { Button } from "@ui-kitten/components"
import { BASE_URL } from "../shared/Constants"
import { styles } from "../shared/Styles"
import { sendEmail } from "../shared/Components"
import { LocationInterface } from '../shared/Interfaces'
import { HomeScreenParams } from '../Home/HomeScreen'
import { MapScreenParams } from '../Map/MapScreen'
import { FontAwesome5 } from '@expo/vector-icons'
import axios from 'axios'
import { homeStyles } from '../Home/HomeStyles'

export interface ViewAppointmentClientScreenParams {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface,
    appointmentId: string
}

interface AppointmentData {
    appointmentId: string,
    location: LocationInterface,
    time: string,
    description: string,
    status: string,
    petId: string,
    petName: string,
    petAge: number,
    clientId: string,
    clientUserName: string,
    clientEmail: string,
    vetUserName: string,
    vetEmail: string,
}

function ViewAppointmentClientScreen(props: any) {
    //region States
    const params: ViewAppointmentClientScreenParams = props.route.params as ViewAppointmentClientScreenParams

    const [remove, setRemove] = useState(false)
    // const [status, setStatus] = useState(appointment.appointment.status);
    const [loading, setLoading] = useState(true)
    const [imageEncoding, setImageEncoding] = useState<String>('')

    const [appointmentData, setAppointmentData] = useState<AppointmentData>({ appointmentId: "", location: { latitude: 0, longitude: 0 }, time: "", description: "", status: "", petId: "", petName: "", petAge: 0, clientId: "", clientUserName: "", clientEmail: "", vetUserName: "", vetEmail: "" })
    //endregion
    useEffect(() => {
        fetchAndHydrateData()
    }, [])

    useEffect(() => {
        if (remove) {
            checkRemove()
        }
    }, [remove])

    async function fetchAndHydrateData() {
        setLoading(true)
        setAppointmentData({ appointmentId: "", location: { latitude: 0, longitude: 0 }, time: "", description: "", status: "", petId: "", petName: "", petAge: 0, clientId: "", clientUserName: "", clientEmail: "", vetUserName: "", vetEmail: "" })

        // Get Appointment and vet data
        let url = BASE_URL + "/appointment/get/" + params.appointmentId
        let responseAppointmentData = await (await fetch(url)).json()
        setAppointmentData((prevState) => ({
            ...prevState,
            appointmentId: responseAppointmentData.aid,
            location: { latitude: responseAppointmentData.latitude, longitude: responseAppointmentData.longitude },
            time: responseAppointmentData.time,
            description: responseAppointmentData.description,
            status: responseAppointmentData.status,
            petId: responseAppointmentData.pet.pid,
            petName: responseAppointmentData.pet.name,
            petAge: responseAppointmentData.pet.name,
            vetUserName: responseAppointmentData.vet ? responseAppointmentData.vet.userAccount.username : "",
            vetEmail: responseAppointmentData.vet ? responseAppointmentData.vet.userAccount.email : ""
        }))

        // Get pet owner data
        url = BASE_URL + "/pet/get/" + responseAppointmentData.pet.pid + "/owner"

        await fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson) {
                    setAppointmentData((prevState) => ({
                        ...prevState,
                        clientId: responseJson.id,
                        clientUserName: responseJson.userAccount.username,
                        clientEmail: responseJson.userAccount.email
                    }))
                }
            })
            .catch(error => {
                console.error(error)
                console.log(error)
            })

        // Get pet image
        url = BASE_URL + "/pet/get/" + responseAppointmentData.pet.pid
        let res = await axios.get(url)
        if (res.data.petImage) {
            setImageEncoding(res.data.petImage)
        }
        setLoading(false)
    }

    function viewMap() {
        let mapLocation: MapScreenParams = {
            userId: params.userId,
            userIsVet: params.userIsVet,
            location: params.location,
            destinationLocation: appointmentData.location
        }
        props.navigation.navigate("Map", mapLocation)
    }

    //CLIENT method for removing the appointment made
    async function checkRemove() {
        let url = BASE_URL + "/appointment/delete/" + appointmentData.appointmentId
        console.log(url)
        let res = await fetch(url, { method: 'DELETE' })
            .then((response) => response.text())
        if (res.includes("Deleted")) {
            console.error("Appointment deleted. \nRedirecting to Home")

            if (appointmentData.status === "ACCEPTED") {
                let message = "(CANCELLED)"
                    + "\nAppointment date: " + appointmentData.time
                    + "\nAppointment Details: " + appointmentData.description
                    + "\nPet Name: " + appointmentData.petName
                    + "\nPet Owner Name: " + appointmentData.clientUserName
                    + "\nVet name: Dr. " + appointmentData.vetUserName

                sendEmail({
                    toName: appointmentData.clientUserName,
                    toEmail: appointmentData.clientEmail,
                    subject: "Appointment Cancelled!",
                    message: message
                })
                sendEmail({
                    toName: appointmentData.vetUserName,
                    toEmail: appointmentData.vetEmail,
                    subject: "Appointment Cancelled!",
                    message: message
                })
            }

            props.navigation.popToTop()
            props.navigation.replace("Home", { ...params } as HomeScreenParams)
        } else {
            console.error(res)
        }
    }

    return (
        <SafeAreaView style={styles.background}>
            <View>
                <Text style={{ marginRight: 'auto', fontSize: 28, fontWeight: 'bold' }}>Appointment Details</Text>
                {loading && <Text> LOADING ...</Text>}
                {!loading &&
                    <>
                        <View style={styles.petContainer}>
                            <Pressable style={{ flexDirection: "row" }}
                                onPress={() => console.error("Viewing Details of Pet with PID: " + appointmentData.petId)}>
                                <View>
                                    {imageEncoding ?
                                        <Image source={{ uri: `data:image/png;base64,${imageEncoding}` }} style={homeStyles.tempPic} />
                                        :
                                        <View style={homeStyles.tempPic}>
                                            <FontAwesome5 name='images' size={24} />
                                        </View>
                                    }
                                </View>
                                <View style={{ justifyContent: "center" }}>
                                    <View>
                                        <Text
                                            style={styles.boldText}> {appointmentData.petName} </Text>
                                        <Text> View Pet info </Text>
                                    </View>
                                </View>
                            </Pressable>
                        </View>
                        <View style={{
                            justifyContent: "space-evenly",
                            alignContent: "center",
                            alignItems: "center",
                            flex: 1
                        }}>
                            <View style={{ width: "100%", alignItems: "center" }}>
                                <Text style={styles.defaultText}>Appointment Description:</Text>
                                <Text style={styles.defaultText}>{appointmentData.description}</Text>

                                <Text style={styles.defaultText}>Date : {appointmentData.time}</Text>
                                {/*<Text style={styles.defaultText}>Appointment Location : XX:XX AM</Text>*/}
                            </View>
                            <View style={{ width: "100%", alignItems: "center" }}>
                                <Text style={styles.defaultText}>Client Details:</Text>
                                <Text style={styles.defaultText}>Name: {appointmentData.clientUserName}</Text>
                                <Text style={styles.defaultText}>Contact: 12345678</Text>
                            </View>
                        </View>

                        <View style={{ flex: 1, justifyContent: "flex-end", marginBottom: 10 }}>
                            <Button style={styles.button} status={"basic"}
                                onPress={() => viewMap()}>
                                <Text numberOfLines={1}>
                                    View in Maps
                                </Text>
                            </Button>
                            <Button style={styles.mainButton} status={"danger"}
                                onPress={() => setRemove(true)}>
                                <Text numberOfLines={1}>
                                    Cancel Appointment
                                </Text>
                            </Button>
                        </View>
                    </>
                }
            </View>
        </SafeAreaView>
    )
}

export default ViewAppointmentClientScreen