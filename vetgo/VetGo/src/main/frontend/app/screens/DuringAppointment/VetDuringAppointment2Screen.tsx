import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native"
import { Input, Button } from "@ui-kitten/components"
import { BASE_URL } from "../shared/Constants"
import { styles } from "../shared/Styles"
import { LocationInterface } from '../shared/Interfaces'
import { VetAddChargesScreenParams } from '../VetAddCharges/VetAddChargesScreen'
import ClientNavbar from '../../components/ClientNavbar'
import axios from 'axios'

export interface VetDuringAppointment2ScreenParams {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface,
    appointmentId: string,
    petId: string,
    diet: string,
    medications: string,
    allergies: string,
    changesInBehavior: string,
    bloodPressure: string,
    weight: string,
    symptoms: string,
    illnesses: string,
    shots: string,
    otherNotes: string,
    height: string,
}


function VetDuringAppointment2Screen(props: any) {

    const params = props.route.params as VetDuringAppointment2ScreenParams

    const [other, setOther] = useState("")
    const [petOwner, setPetOwner] = useState(null)
    const [isSubmit, setSubmit] = useState(false)
    const [diet, setDiet] = useState("")
    const [medications, setMedications] = useState("")
    const [allergies, setAllergies] = useState("")
    const [changesInBehavior, setChangesInBehavior] = useState("")

    const handleSubmit = async () => {
        setSubmit(true)
    }

    useEffect(() => {
        if (isSubmit) {
            checkInfoIsValid()
        }
    }, [isSubmit])

    useEffect(() => {
        if (!petOwner)
            getOwner()
    }, [petOwner])

    const getOwner = async () => {
        let url = BASE_URL + "/pet/get/" + params.petId + "/owner"
        await fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson) {
                    console.log("PRINTING PET OWNER IN APPOINTMENT SCREEN" + JSON.stringify(responseJson))
                    setPetOwner(responseJson)
                }
            })
    }

    async function postPetInformationToServer() {
        const url = `${BASE_URL}/appointment/addPetInfo/${params.appointmentId}` // Update the URL as needed
        console.log(url)
        const requestBody = {
            diet: params.diet,
            medications: params.medications,
            allergies: params.allergies,
            changesInBehavior: params.changesInBehavior,
            bloodPressure: params.bloodPressure,
            weight: params.weight,
            symptoms: params.symptoms,
            illnesses: params.illnesses,
            shots: params.shots,
            otherNotes: params.otherNotes,
            height: params.height,
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })

            if (!response.ok) {
                console.error('Error posting pet information:', response.status)
                // Handle the error as needed
            } else {
                console.log('Pet information posted successfully')
                // Handle the success as needed
            }
        } catch (error) {
            console.error('Error posting pet information:', error)
            // Handle the error as needed
        }

        await axios.put(`${BASE_URL}/appointment/update/${params.appointmentId}`, {
            status: "PAYMENT"
        })
    }
    async function checkInfoIsValid() {

        params.changesInBehavior = changesInBehavior
        params.allergies = allergies
        params.diet = diet
        params.medications = medications
        params.otherNotes = other
        postPetInformationToServer()
        let url = BASE_URL + "/appointment/payment/" + params.appointmentId + "/" + params.userId
        console.log(url)
        let res = await fetch(url, { method: 'PUT' })
            .then((response) => response.text())
        if (res.includes("updated appointment to payment status")) {
            console.error("Appointment finished. \nRedirecting to Review")
            let VetAddChargesParams: VetAddChargesScreenParams = {
                ...params
            }
            props.navigation.popToTop()
            props.navigation.replace("VetAddCharges", VetAddChargesParams)
        } else {
            console.error(res)
        }
        //props.navigation.navigate("Home",apt.user);
    }


    return (
        <SafeAreaView style={styles.background}>
            <ScrollView>
                <Text style={{ ...styles.boldText, fontSize: 30 }}>Appointment Notes</Text>

                <View>

                    <Text style={styles.titleText}>Pet Medications</Text>
                    <Input
                        size={"large"}
                        style={{ ...styles.descriptionBox, height: 80 }}
                        placeholder='Please provide any medication given or suggested...'
                        onChangeText={(text) => setMedications(text)}
                    />
                    <Text style={styles.titleText}>Any Changes in Behavior?</Text>
                    <Input
                        size={"large"}
                        style={{ ...styles.descriptionBox, height: 80 }}
                        placeholder="Please note any change in behavior if there's some..."
                        onChangeText={(text) => setChangesInBehavior(text)}
                    />
                    <Text style={styles.titleText}>Pet diet</Text>
                    <Input
                        size={"large"}
                        style={{ ...styles.descriptionBox, height: 80 }}
                        placeholder='Please provide the current diet .....'
                        onChangeText={(text) => setDiet(text)}
                    />

                    <Text style={styles.titleText}>Other Notes</Text>
                    <Input
                        size={"large"}
                        style={{ ...styles.descriptionBox, height: 80 }}
                        placeholder='Please provide other useful information...'
                        onChangeText={(text) => setOther(text)}
                    />
                    <Text style={styles.titleText}>Pet Allergies</Text>
                    <Input
                        size={"large"}
                        style={{ ...styles.descriptionBox, height: 80 }}
                        placeholder='Please provide the any recent pet  allergies...'
                        onChangeText={(text) => setAllergies(text)}
                    />
                </View>

                <Button style={styles.buttonGroup} onPress={handleSubmit}>
                    <Text> Finish Appointment </Text>
                </Button>
            </ScrollView>

            <ClientNavbar navigation={props.navigation} {...params} />
        </SafeAreaView>
    )
}

export default VetDuringAppointment2Screen