import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native"
import { Input, Button } from "@ui-kitten/components"
import { BASE_URL } from "../shared/Constants"
import { styles } from "../shared/Styles"
import { LocationInterface } from '../shared/Interfaces'
import { VetDuringAppointment2ScreenParams } from './VetDuringAppointment2Screen'
import ClientNavbar from '../../components/ClientNavbar'

export interface VetDuringAppointment1ScreenParams {
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
function VetDuringAppointment1Screen(props: any) {

    const params = props.route.params as VetDuringAppointment1ScreenParams

    const [bp, setBp] = useState("")
    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")
    const [petOwner, setPetOwner] = useState(null)
    const [isSubmit, setSubmit] = useState(false)
    const [symptoms, setSymptoms] = useState("")
    const [shots, setShots] = useState("")

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


    async function checkInfoIsValid() {
        params.shots = shots
        params.height = height
        params.weight = weight
        params.bloodPressure = bp
        params.symptoms = symptoms
        props.navigation.navigate("VetDuringAppointment2", { ...params } as VetDuringAppointment2ScreenParams)
    }



    return (
        <SafeAreaView style={styles.background}>
            <ScrollView>
                <Text style={{ ...styles.boldText, fontSize: 30 }}>Appointment Notes</Text>

                <View>

                    <Text style={styles.titleText}>Pet Blood Pressure</Text>
                    <Input
                        size={"large"}
                        style={{ ...styles.descriptionBox, height: 80 }}
                        placeholder='Please provide the pets blood pressure...'
                        onChangeText={(text) => setBp(text)}
                    />

                    <Text style={styles.titleText}>Pet Height</Text>
                    <Input
                        size={"large"}
                        style={{ ...styles.descriptionBox, height: 80 }}
                        placeholder='Please provide the pets Height...'
                        onChangeText={(text) => setHeight(text)}
                    />

                    <Text style={styles.titleText}>Pet Weight</Text>
                    <Input
                        size={"large"}
                        style={{ ...styles.descriptionBox, height: 80 }}
                        placeholder='Please provide the pets weight...'
                        onChangeText={(text) => setWeight(text)}
                    />
                    
                    <Text style={styles.titleText}>Pet Symptoms</Text>
                    <Input
                        size={"large"}
                        style={{ ...styles.descriptionBox, height: 80 }}
                        placeholder='Please provide the pets symptoms...'
                        onChangeText={(text) => setSymptoms(text)}
                    />
                    <Text style={styles.titleText}>Pet Shots</Text>
                    <Input
                        size={"large"}
                        style={{ ...styles.descriptionBox, height: 80 }}
                        placeholder='Please provide the pets shots information...'
                        onChangeText={(text) => setShots(text)}
                    />
                </View>

                <Button style={styles.buttonGroup} onPress={handleSubmit}>
                    <Text> Next Step </Text>
                </Button>
            </ScrollView>

            <ClientNavbar navigation={props.navigation} {...params} />
        </SafeAreaView>
    )
}

export default VetDuringAppointment1Screen