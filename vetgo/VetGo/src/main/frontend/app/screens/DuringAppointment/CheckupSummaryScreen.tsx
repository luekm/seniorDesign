import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native"
import { IndexPath, Input, Select, SelectItem, Button, CheckBox, Radio, Layout } from "@ui-kitten/components"
import { BASE_URL } from "../shared/Constants"
import { styles } from "../shared/Styles"
import { LocationInterface } from '../shared/Interfaces'
import { CheckupExamScreenParams } from './CheckupExamScreen'
import { HomeVetScreenParams } from '../Home/HomeVetScreen'
import ClientNavbar from '../../components/ClientNavbar'
import { CheckupExamScreenNavigationProp, CheckupExamScreenRouteProp } from '../../utils/props'
import { CheckupSummaryScreenNavigationProp, CheckupSummaryScreenRouteProp } from '../../utils/props'
import { VetHomeScreenNavigationProp, VetHomeScreenRouteProp } from '../../utils/props'
import Textfield from '../../components/Textfield'
import { sum } from '../../foo'

export interface CheckupSummaryScreenParams {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface,
    appointmentId: string,
    petId: string,
    heartRate: string, 
    heartItems: string, 
    heartNotes: string, 
    lungSounds: string, 
    lungNotes: string, 
    eyeItems: string, 
    tearProduction: string, 
    eyePressure: string, 
    eyelidExamination: string, 
    irisExamination: string, 
    lensExamination: string, 
    retinaExamination: string, 
    opticNerveExamination: string, 
    coatItems: string, 
    coatNotes: string, 
    skinItems: string, 
    skinNotes: string, 
    earItems: string, 
    earNotes: string, 
    noseItems: string, 
    noseNotes: string, 
    mouthAndTeethItems: string, 
    mouthNotes:string, 
    teethNotes: string, 
    gaitAndPostureItems: string, 
    gaitNotes: string, 
    postureNotes: string, 
    feetNotes: string, 
    weight: number, 
    weightMessurement: string, 
    weightAnalysis: string, 
    muscleStructureNotes: string, 
    temperature: number, 
    dietNotes: string, 
    habitNotes: string, 
    behaviorNotes: string, 
    shots: string
}

interface CheckEyeListItem {
    id: number;
    name: string;
    isChecked: boolean;
}

interface CheckCoatListItem {
    id: number;
    name: string;
    isChecked: boolean;
}

interface CheckSkinListItem {
    id: number;
    name: string;
    isChecked: boolean;
}

interface CheckEarListItem {
    id: number;
    name: string;
    isChecked: boolean;
}

interface CheckNoseListItem {
    id: number;
    name: string;
    isChecked: boolean;
}

interface CheckMouthAndTeethListItem {
    id: number;
    name: string;
    isChecked: boolean;
}

interface CheckHeartListItem {
    id: number;
    name: string;
    isChecked: boolean;
}

interface CheckGaitAndPostureListItem {
    id: number;
    name: string;
    isChecked: boolean;
}

interface SummaryExamForm {
    heartRate: string, heartItems: CheckHeartListItem[], heartNotes: string, lungSounds: string, lungNotes: string, eyeItems: CheckEyeListItem[], tearProduction: string, eyePressure: string, eyelidExamination: string, irisExamination: string, lensExamination: string, retinaExamination: string, opticNerveExamination: string, coatItems: CheckCoatListItem[], coatNotes: string, skinItems: CheckSkinListItem[], skinNotes: string, earItems: CheckEarListItem[], earNotes: string, noseItems: CheckNoseListItem[], noseNotes: string, mouthAndTeethItems: CheckMouthAndTeethListItem[], mouthNotes:string, teethNotes: string, gaitAndPostureItems: CheckGaitAndPostureListItem[], gaitNotes: string, postureNotes: string, feetNotes: string, weight: number, weightMessurement: string, weightAnalysis: string, muscleStructureNotes: string, temperature: number, dietNotes: string, habitNotes: string, behaviorNotes: string, shots: string
}

interface CheckupSummaryForm {
    diagnosis: string, plan: string, medications: string
}


function CheckupSummaryScreen(props: {route: CheckupSummaryScreenRouteProp, navigation: CheckupSummaryScreenNavigationProp}) {
    const params = props.route.params as CheckupExamScreenParams

    const homeParams = {userId: params.userId, userIsVet: params.userIsVet, location: params.location}

    const [checkupSummaryForm, setCheckupSummaryForm] = useState<CheckupSummaryForm>({ diagnosis: "", plan: "", medications: ""})

    const [appointment, setAppointment] = useState(null)
    const [isSubmit, setSubmit] = useState(false)

    const handleSubmit = async () => {
        setSubmit(true)
        postPetInformationToServer()
        props.navigation.navigate("VetHome", { ...homeParams} as HomeVetScreenParams)
    }

    useEffect(() => {
        if (isSubmit) {
        }
    }, [isSubmit])

    useEffect(() => {
        if (!appointment)
            getAppointment()
    }, [appointment])


    const getAppointment = async () => {
        let url = BASE_URL + "/appointment/get/" + params.appointmentId
        await fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson) {
                    console.log("Getting Appointment: " + JSON.stringify(responseJson))
                    setAppointment(responseJson)
                }
            })
    }

    async function postPetInformationToServer() {
        const url = `${BASE_URL}/appointment/addPetInfo/${params.appointmentId}` // Update the URL as needed
        console.log(url)
        const requestBody = {
            appointment: null,
            heartRate: params.heartRate,
            heartNotes: params.heartNotes,
            lungSounds: params.lungSounds,
            lungNotes: params.lungNotes,
            tearProduction: params.tearProduction,
            eyePressure: params.eyePressure,
            eyelidExamination: params.eyelidExamination,
            irisExamination: params.irisExamination,
            lensExamination: params.lensExamination,
            retinaExamination: params.retinaExamination,
            opticNerveExamination: params.opticNerveExamination,
            coatNotes: params.coatNotes,
            skinNotes: params.skinNotes,
            earNotes: params.earNotes,
            mouthNotes: params.mouthNotes,
            teethNotes: params.teethNotes,
            gaitNotes: params.gaitNotes,
            postureNotes: params.postureNotes,
            feetNotes: params.feetNotes,
            noseNotes: params.noseNotes,
            weight: params.weight,
            weightMessurement: params.weightMessurement,
            weightAnalysis: params.weightAnalysis,
            muscleStructureNotes: params.muscleStructureNotes,
            temperature: params.temperature,
            dietNotes: params.dietNotes,
            habitNotes: params.habitNotes,
            behaviorNotes: params.behaviorNotes,
            shots: params.shots,
            diagnosis: checkupSummaryForm.diagnosis,
            plan: checkupSummaryForm.plan,
            medications: checkupSummaryForm.medications
        }
        console.log(checkupSummaryForm.medications)

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
    }


    return (
        <SafeAreaView style={styles.background}>
            <ScrollView>
                <Text style={{ ...styles.boldText, fontSize: 30 }}>Examination Summary</Text>
                <Text>Temperature: {params.temperature} F</Text>
                <Text></Text>
                <Text>Weight: {params.weight} {params.weightMessurement}</Text>
                <Text></Text>
                <Text>Lung Sounds: {params.lungSounds}</Text>
                <Text>Lung Notes: {params.lungNotes}</Text>
                <Text></Text>
                <Text>Heart Rate: {params.heartRate} BPM</Text>
                {/* <Text>Heart Traits: {params.heartItems}</Text> */}
                <Text>Heart Notes: {params.heartNotes}</Text>
                <Text></Text>
                {/* <Text>Eye Traits: {params.eyeItems}</Text> */}
                <Text>Tear Production: {params.tearProduction}</Text>
                <Text>Eye Pressure: {params.eyePressure}</Text>
                <Text>Eyelid Analysis: {params.eyelidExamination}</Text>
                <Text>Iris Analysis: {params.irisExamination}</Text>
                <Text>Lens Analysis: {params.lensExamination}</Text>
                <Text>Retina Analysis: {params.retinaExamination}</Text>
                <Text>Optic Nerve Analysis: {params.opticNerveExamination}</Text>
                <Text></Text>
                {/* <Text>Coat Traits: {params.coatItems}</Text> */}
                <Text>Coat Notes: {params.coatNotes}</Text>
                <Text></Text>
                {/* <Text>Skin Traits: {params.skinItems}</Text> */}
                <Text>Skin Notes: {params.skinNotes}</Text>
                <Text></Text>
                {/* <Text>Ear Traits: {params.earItems}</Text> */}
                <Text>Ear Notes: {params.earNotes}</Text>
                <Text></Text>
                {/* <Text>Nose Traits: {params.noseItems}</Text> */}
                <Text>Nose Notes: {params.noseNotes}</Text>
                <Text></Text>
                {/* <Text>Mouth and Teeth Traits: {params.mouthAndTeethItems}</Text> */}
                <Text>Mouth Notes: {params.mouthNotes}</Text>
                <Text>Teeth Notes: {params.teethNotes}</Text>
                <Text></Text>
                <Text>Feet Notes: {params.feetNotes}</Text>
                {/* <Text>Weight Analysis: {params.weightAnalysis}</Text> */}
                <Text></Text>
                <Text>Muscle Structure Notes: {params.muscleStructureNotes}</Text>
                <Text></Text>
                {/* <Text>Gait and Posture Traits: {params.gaitAndPostureItems}</Text> */}
                <Text>Gait Notes: {params.gaitNotes}</Text>
                <Text>Posture Notes: {params.postureNotes}</Text>
                <Text></Text>
                <Text>Diet Notes: {params.dietNotes}</Text>
                <Text></Text>
                <Text>Habit Notes: {params.habitNotes}</Text>
                <Text></Text>
                <Text>Behavior Notes: {params.behaviorNotes}</Text>
                <Text></Text>
                <Text></Text>
                <Text>Shots: {params.shots}</Text>
                <Text style={{ ...styles.boldText, fontSize: 30 }}>Diagnosis</Text>
                <Textfield
                    value={checkupSummaryForm.diagnosis}
                    placeholder='Write the diagnosis...'
                    onChangeText={(text: string) => {setCheckupSummaryForm((prevState: CheckupSummaryForm) => ({ ...prevState, diagnosis: text}))}}
                />
                <Text style={{ ...styles.boldText, fontSize: 30 }}>Next Steps</Text>
                <Textfield
                    value={checkupSummaryForm.plan}
                    placeholder='Write the next steps...'
                    onChangeText={(text: string) => {setCheckupSummaryForm((prevState: CheckupSummaryForm) => ({ ...prevState, plan: text}))}}
                />
                <Text style={{ ...styles.boldText, fontSize: 30 }}>Medications</Text>
                <Textfield
                    value={checkupSummaryForm.medications}
                    placeholder='Write any new medications...'
                    onChangeText={(text: string) => {setCheckupSummaryForm((prevState: CheckupSummaryForm) => ({ ...prevState, medications: text}))}}
                />

                <Button style={styles.buttonGroup} onPress={handleSubmit}>
                    <Text>Finish Appointment</Text>
                </Button>
                
            </ScrollView>
        </SafeAreaView>

    )

}

export default CheckupSummaryScreen
