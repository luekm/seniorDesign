import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View, TextInput, Pressable, Alert } from "react-native"
import { Button, Card, Text } from '@ui-kitten/components'
import { styles } from "../shared/Styles"
import { homeStyles } from "./HomeStyles"

function HomeVet_AvailableAppointment(appointmentData: any, appointmentIndex: any, acceptAppointment: any, viewCalendar: any) {

    return (
        <>
            <View style={homeStyles.petInfo}>
                <Pressable style={{ flexDirection: "row" }} onPress={() => console.error("Viewing Details of Pet")}>
                    <View style={homeStyles.tempPic}></View>
                    <View style={{ justifyContent: "center" }}>
                        <View>
                            <Text
                                style={styles.boldText}> {appointmentData.pet.name} {appointmentData.pet.age}
                            </Text>
                        </View>
                    </View>
                </Pressable>
                <Button onPress={() => viewCalendar(appointmentData)}>
                    <Text numberOfLines={1}>
                        My Calendar
                    </Text>
                </Button>
                <Button style={homeStyles.viewAppointment} onPress={() => {
                console.log(appointmentData)
                acceptAppointment(appointmentData.pet.name)}
                }>
                    <Text numberOfLines={1}>
                        Accept
                    </Text>
                </Button>
            </View>
        </>
    )

}

export default HomeVet_AvailableAppointment
