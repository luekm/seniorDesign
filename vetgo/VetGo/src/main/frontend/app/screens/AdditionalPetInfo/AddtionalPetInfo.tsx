import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, ScrollView, Pressable } from "react-native";
import { Input, Button } from "@ui-kitten/components";
import { BASE_URL } from "../shared/Constants";
import { styles } from "../shared/Styles";
import { LocationInterface } from '../shared/Interfaces'
import ClientNavbar from '../../components/ClientNavbar';
import {homeStyles} from "../Home/HomeStyles"
export interface AddtionalPetInfoParams {
    additionalInfoId: string,
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
    medicalHistory:string,
    userId: string,
    location: LocationInterface,
    userIsVet: boolean
}

function AddtionalPetInfo(props: any) {
    const params = props.route.params as AddtionalPetInfoParams;
    return (
        <SafeAreaView style={styles.background}>
            <ScrollView>
            <View style={homeStyles.container}>
            <Text style={styles.boldText}>Diet: {params.diet}</Text>
          <Text style={styles.boldText}>Medications: {params.medications}</Text>
          <Text style={styles.boldText}>Allergies: {params.allergies}</Text>
          <Text style={styles.boldText}>Changes in Behavior: {params.changesInBehavior}</Text>
          <Text style={styles.boldText}>Blood Pressure: {params.bloodPressure}</Text>
          <Text style={styles.boldText}>Weight: {params.weight}</Text>
          <Text style={styles.boldText}>Symptoms: {params.symptoms}</Text>
          <Text style={styles.boldText}>Illnesses: {params.illnesses}</Text>
          <Text style={styles.boldText}>Shots: {params.shots}</Text>
          <Text style={styles.boldText}>Other Notes: {params.otherNotes}</Text>
          <Text style={styles.boldText}>Height: {params.height}</Text>
        </View>
            </ScrollView>
            <ClientNavbar navigation={props.navigation} {...params} />
            </SafeAreaView>)
}
export default AddtionalPetInfo;