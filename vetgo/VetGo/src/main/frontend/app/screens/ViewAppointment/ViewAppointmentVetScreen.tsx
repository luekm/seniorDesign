import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View, Pressable } from "react-native"
import { Button } from "@ui-kitten/components"
import { BASE_URL } from "../shared/Constants"
import { styles } from "../shared/Styles"
import { sendEmail } from "../shared/Components"
import { LocationInterface } from '../shared/Interfaces'
import { MapScreenParams } from '../Map/MapScreen'
import { HomeScreenParams } from '../Home/HomeScreen'
import { VetDuringAppointmentMedicalHistoryScreenParams } from '../DuringAppointment/VetDuringAppointmentMedicalHistoryScreen'

export interface ViewAppointmentVetScreenParams {
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
    vetId: string,
    vetUserName: string,
    vetEmail: string,
}
function ViewAppointmentVetScreen(props: any) {
    //region States
    const params = props.route.params as ViewAppointmentVetScreenParams

    const [accept, setAccept] = useState(false)
    const [cancel, setCancel] = useState(false)
    const [start, setStart] = useState(false)
    const [loading, setLoading] = useState(true)
    const [petOwner, setPetOwner] = useState<any>(null)

    const [appointmentData, setAppointmentData] = useState<AppointmentData>({ appointmentId: "", location: { latitude: 0, longitude: 0 }, time: "", description: "", status: "", petId: "", petName: "", petAge: 0, clientId: "", clientUserName: "", clientEmail: "", vetId: "", vetUserName: "", vetEmail: "" })
    //endregion
    useEffect(() => {
        fetchAndHydrateData()
    }, [])

    async function fetchAndHydrateData() {
        setLoading(true)
        setAppointmentData({ appointmentId: "", location: { latitude: 0, longitude: 0 }, time: "", description: "", status: "", petId: "", petName: "", petAge: 0, clientId: "", clientUserName: "", clientEmail: "", vetId: "", vetUserName: "", vetEmail: "" })

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
            petName: responseAppointmentData.petName,
            petAge: responseAppointmentData.petName,
            vetId: responseAppointmentData.vet ? responseAppointmentData.vet.userAccount.id : "",
            vetUserName: responseAppointmentData.vet ? responseAppointmentData.vetUserName : "",
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

        setLoading(false)
    }

    useEffect(() => {
        if (!petOwner)
            getOwner()
    }, [petOwner])

    useEffect(() => {
        if (accept) {
            checkAccept()
        }
        if (cancel) {
            checkCancel()
        }
        if (start) {
            checkStart()
        }
    }, [accept, cancel, start])

    function viewMap() {
        let mapLocationParams: MapScreenParams = {
            userId: params.userId,
            userIsVet: params.userIsVet,
            location: params.location,
            destinationLocation: appointmentData.location
        }
        props.navigation.navigate("Map", mapLocationParams)

        // let mapLocation = {
        //     vet: appointment.location,
        //     client: appointmentData,
        // }
        // props.navigation.navigate("Map", mapLocation)
    }

    const getOwner = async () => {
        let url = BASE_URL + "/pet/get/" + appointmentData.petId + "/owner"
        await fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson) {
                    console.log("PRINTING PET OWNER IN APPOINTMENT SCREEN" + JSON.stringify(responseJson))
                    setLoading(false)
                    setPetOwner(responseJson)
                }
            })
            .catch(error => {
                console.error(error)
                console.log(error)
            })
    }

    //VET method for accepting appointment
    async function checkAccept() {
        let url = BASE_URL + "/appointment/accept/" + appointmentData.appointmentId + "/" + appointmentData.vetId
        console.log(url)
        let res = await fetch(url, { method: 'PUT' })
            .then((response) => response.json())
            //If response is in json then in success
            .then(responseJson => {
                console.log(responseJson)

                let message = "Appointment date: " + appointmentData.time
                    + "\nAppointment Details: " + appointmentData.description
                    + "\nPet Name: " + appointmentData.petName
                    + "\nPet Owner Name: " + appointmentData.clientUserName
                    + "\nVet name: Dr. " + appointmentData.vetUserName

                sendEmail({
                    toName: appointmentData.clientUserName,
                    toEmail: appointmentData.clientEmail,
                    subject: "Appointment Accepted!",
                    message: message
                })
                sendEmail({
                    toName: appointmentData.clientUserName,
                    toEmail: appointmentData.clientEmail,
                    subject: "Appointment Accepted!",
                    message: message
                })

                let homeParams: HomeScreenParams = {
                    userId: params.userId,
                    userIsVet: params.userIsVet,
                    location: params.location
                }
                props.navigation.popToTop()
                props.navigation.replace("Home", homeParams)
            })
            //If response is not in json then in error
            .catch((error) => {
                console.error("Invalid Appointment! Appointment doesn't exist or user doesn't exist!")
                console.error(error)
            })
    }

    //VET method for cancelling or ignoring the appointment
    async function checkCancel() {
        let url = BASE_URL + "/appointment/remove/" + appointmentData.appointmentId + "/" + appointmentData.vetId

        console.log(url)
        let res = await fetch(url, { method: 'PUT' })
            .then((response) => response.json())
            //If response is in json then in success
            .then(responseJson => {
                //alert("Login Successful");
                console.log(responseJson)

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
                        toName: appointmentData.clientUserName,
                        toEmail: appointmentData.clientEmail,
                        subject: "Appointment Cancelled!",
                        message: message
                    })
                }

                let homeParams: HomeScreenParams = {
                    userId: params.userId,
                    userIsVet: params.userIsVet,
                    location: params.location
                }
                props.navigation.popToTop()
                props.navigation.replace("Home", homeParams)
            })
            //If response is not in json then in error
            .catch((error) => {
                console.error("Invalid Appointment! Appointment doesn't exist or user doesn't exist!")
                console.error(error)
            })
    }

    //VET method for marking the appointment as finish
    async function checkStart() {
        let url = BASE_URL + "/appointment/payment/" + appointmentData.appointmentId + "/" + appointmentData.vetId

        console.log(url)
        let res = await fetch(url, { method: 'PUT' })
            .then((response) => response.text())
        if (res.includes("updated appointment to payment status")) {
            console.error("Appointment finished. \nDirecting to Payment Setting")
            let vetDuringAppointmentMedicalHistoryScreenParams: VetDuringAppointmentMedicalHistoryScreenParams = {
                userId: params.userId,
                userIsVet: params.userIsVet,
                location: params.location,
                appointmentId: appointmentData.appointmentId,
                petId: appointmentData.petId
            }
            props.navigation.popToTop()
            props.navigation.replace("VetDuringAppointmentMedicalHistory", vetDuringAppointmentMedicalHistoryScreenParams)
            // props.navigation.replace("CreateReview", reviewDetails);
        } else {
            console.error(res)
        }
    }

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.container}>
                <Text>APPOINTMENT DETAILS</Text>
                {loading && <Text> LOADING ...</Text>}
                {!loading && petOwner &&
                    <>
                        <View style={styles.petContainer}>
                            <Pressable style={{ flexDirection: "row" }}
                                onPress={() => console.error("Viewing Details of Pet with PID: " + appointmentData.petId)}>
                                <View style={styles.tempPic}><Text> imfg </Text></View>
                                <View style={{ justifyContent: "center" }}>
                                    <View>
                                        <Text
                                            style={styles.boldText}> {appointmentData.petName} {appointmentData.petAge}</Text>
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
                                <Text style={styles.defaultText}>Appointment Details:</Text>
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
                            {appointmentData.status === "WAITING" &&
                                <>
                                    <Button style={styles.mainButton} status={"success"}
                                        onPress={() => setAccept(true)}>
                                        <Text numberOfLines={1}>
                                            Accept
                                        </Text>
                                    </Button>

                                    <Button style={styles.mainButton} status={"danger"}
                                        onPress={() => props.navigation.replace("Home", { ...params } as HomeScreenParams)}>
                                        <Text numberOfLines={1}>
                                            Ignore / Reject
                                        </Text>
                                    </Button>
                                </>
                            }
                            {appointmentData.status === "ACCEPTED" &&
                                <>
                                    <Button style={styles.mainButton} status={"success"}
                                        onPress={() => setStart(true)}>
                                        <Text numberOfLines={1}>
                                            Finish Appointment
                                        </Text>
                                    </Button>

                                    <Button style={styles.mainButton} status={"danger"}
                                        onPress={() => setCancel(true)}>
                                        <Text numberOfLines={1}>
                                            Cancel Appointment
                                        </Text>
                                    </Button>
                                </>
                            }
                            {/* {!(appointment.user.vetLicense > 0) &&
                                <>
                                    <Button style={styles.mainButton} status={"danger"}
                                            onPress={() => setRemove(true)}>
                                        <Text numberOfLines={1}>
                                            Cancel Appointment
                                        </Text>
                                    </Button>
                                </>
                            } */}
                        </View>
                    </>
                }
            </View>
        </SafeAreaView>
    )
}

export default ViewAppointmentVetScreen