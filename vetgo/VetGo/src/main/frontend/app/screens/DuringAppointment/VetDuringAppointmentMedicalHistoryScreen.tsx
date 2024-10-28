import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { Input, Button } from "@ui-kitten/components";
import { BASE_URL } from "../shared/Constants";
import { styles } from "../shared/Styles";
import { LocationInterface } from '../shared/Interfaces'
import { AddtionalPetInfoParams } from '../AdditionalPetInfo/AddtionalPetInfo';
import ClientNavbar from '../../components/ClientNavbar';
import {homeStyles} from "../Home/HomeStyles"
import { VetDuringAppointment1ScreenParams } from './VetDuringAppointment1Screen';
export interface VetDuringAppointmentMedicalHistoryScreenParams {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface,
    appointmentId: string,
    petId: string,
}
function VetDuringAppointmentMedicalHistoryScreen(props: any) {
    const params = props.route.params as VetDuringAppointmentMedicalHistoryScreenParams;
    console.log(params);
    const handlePressOnAppointment = (additionalPetInfo:AddtionalPetInfoParams) => {
        // Navigate to AdditionalPetInfo page
        let addtionalPetInfoParams : AddtionalPetInfoParams = {
            ...params,...additionalPetInfo
        };
        props.navigation.navigate('AdditionalPetInfo', addtionalPetInfoParams);
      };
      const handlePressOnAddPetInfo = () => {
        // Navigate to AdditionalPetInfo page
        let vetDuringAppointment1ScreenParams : VetDuringAppointment1ScreenParams = {
            ...params,
            diet: '',
            medications: '',
            allergies: '',
            changesInBehavior: '',
            bloodPressure: '',
            weight: '',
            symptoms: '',
            illnesses: '',
            shots: '',
            otherNotes: '',
            height: ''
        };
        props.navigation.navigate('VetDuringAppointment1', vetDuringAppointment1ScreenParams);
      };
    const [previousAppointments, setpreviousAppointments] = useState<any[]>([])
    const getAllAppointment = async () => {
        let url = BASE_URL + "/appointment/all/" + params.petId
        console.log(params.petId)
        await fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson) {
                    console.log("PRINTING all the appointments" + JSON.stringify(responseJson))
                    if(responseJson.length>0)
                    {
                        setpreviousAppointments(responseJson);
                    }
                    else
                    {
                        props.navigation.navigate("VetDuringAppointment1", params);
                    }
                        
                }
            })
    }

    useEffect(() => {
        getAllAppointment()
    }, [])
    return (
        <SafeAreaView style={styles.background}>
            <ScrollView>
                <Text style={{ ...styles.boldText, fontSize: 30 }}>Previous Appointments</Text>
                <View style={{ width: "90%", marginLeft: "auto", marginRight: "auto", marginTop: 20 }}>
                                </View>

                                {previousAppointments && previousAppointments.length > 0 && previousAppointments.map((appointmentData, index) => {
                               return <React.Fragment key={"Appointment_" + index}>
            {appointmentData &&
                <View style={homeStyles.petInfo}>
                    <Pressable style={{flexDirection: "row"}} onPress={()=>handlePressOnAppointment(appointmentData.petInformation)}>
                        <View style={{justifyContent: "center"}}>
                            <View>
                                <Text
                                    style={styles.boldText}> {appointmentData.time}
                                </Text> 
                                <Text
                                    style={styles.boldText}> {appointmentData.description}
                                </Text>
                            </View>
                        </View>
                    </Pressable>
                </View>
            }                
            </React.Fragment>
})}
            </ScrollView>
            <View style={homeStyles.petInfo}>
            <Button style={styles.buttonGroup} onPress={handlePressOnAddPetInfo}>
                    <Text  style={styles.boldText}> Add Pet Details </Text>
                </Button>
                </View>
            <ClientNavbar navigation={props.navigation} {...params} />
        </SafeAreaView>)
}


export default VetDuringAppointmentMedicalHistoryScreen;