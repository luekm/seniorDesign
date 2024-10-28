import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, View, TextInput, Pressable, Image } from "react-native"
import { Button, Card, Text } from '@ui-kitten/components'
import { styles } from "../shared/Styles"
import { homeStyles } from "./HomeStyles"
import { colors } from '../shared/Colors'
import { FontAwesome5 } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system'
import { BASE_URL } from '../shared/Constants'
import axios from 'axios'



export const HomeClient_PetProfile = (props: { petData: any, editPet: any, createAppointment: any, viewAppointment: any, payAppointment: any }) => {

    //region States
    const { pet, appointment } = props.petData
    const { pid, name, petType, petBreed, fileLink, age, weight, height, male } =
        pet

    const [imageEncoding, setImageEncoding] = useState<String>(pet.petImage ?? '')

    useEffect(() => {
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
            if (status !== 'granted') {
                console.error('Sorry, we need camera roll permissions to make this work!')
            }
        })()
    }, [])

    const pickImage = async () => {
        let result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })

        console.log(`### result: ${JSON.stringify(result)}`)

        const base64String: String = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' })
        setImageEncoding(base64String)
        console.log(`### base64String: ${base64String}`)
        try {
            await axios({
                method: 'put',
                url: `${BASE_URL}/pet/upload/image/${pid}`,
                headers: {
                    'Content-Type': 'text/plain',
                    'connection': 'keep-alive'
                },
                data: base64String
            })

        }
        catch (err) {
            console.log(`#### ${err}`)
        }

    }

    return (
        <View key={"pet_profile_" + pid} style={[homeStyles.petInfo, {}]}>
            <View style={{ width: "70%" }}>
                <Pressable style={{ display: "flex", flexDirection: "row", alignItems: 'center' }} onPress={() => props.editPet()}>
                    <Pressable onPress={() => pickImage()}>
                        {imageEncoding ?
                            <Image source={{ uri: `data:image/png;base64,${imageEncoding}` }} style={homeStyles.tempPic} />
                            :
                            <View style={homeStyles.tempPic}>
                                <FontAwesome5 name='images' size={24} />
                            </View>
                        }
                    </Pressable>
                    <View style={{ flexShrink: 1 }}>
                        <View style={{}}>
                            <Text style={{ ...styles.boldText }}> {name}</Text>
                            <Text style={{ color: `${colors.darkGrey}` }}> {petBreed}</Text>
                        </View>
                    </View>
                </Pressable>
            </View>

            <View style={{ width: "40%", marginRight: 200 }}>
                {
                    appointment === "NO_APT" &&
                    <Button style={homeStyles.createAppointment} onPress={() => props.createAppointment()}>
                        <Pressable>
                            <Text>
                                <FontAwesome5 name='calendar-alt' size={14} color={colors.white} />
                                <Text style={{ color: 'white', fontSize: 14 }}> No Appt</Text>
                            </Text>
                        </Pressable>
                    </Button>
                }
                {
                    appointment !== "NO_APT" && appointment.status && appointment.status === "WAITING" &&
                    <Button style={homeStyles.waitingForAppointment} onPress={() => props.viewAppointment()}>
                        <Pressable>
                            <Text>
                                <FontAwesome5 name='spinner' size={14} color={colors.white} />
                                <Text style={{ color: 'white', fontSize: 14 }}>  Waiting</Text>
                            </Text>
                        </Pressable>
                    </Button>
                }
                {
                    appointment !== "NO_APT" && appointment.status && appointment.status === "ACCEPTED" &&
                    <Button style={homeStyles.viewAppointment} onPress={() => props.viewAppointment()}>
                        <Pressable>
                            <Text>
                                <FontAwesome5 name='calendar-check' size={14} color={colors.white} />
                                <Text style={{ color: 'white', fontSize: 14 }}> Accepted</Text>
                            </Text>
                        </Pressable>
                    </Button>
                }
                {
                    appointment !== "NO_APT" && appointment.status && appointment.status === "PAYMENT" &&
                    <Button style={homeStyles.payAppointment} onPress={() => props.payAppointment()}>
                        <Pressable>
                            <Text>
                                <FontAwesome5 name='credit-card' size={14} color={colors.white} />
                                <Text style={{ color: 'white', fontSize: 14 }}>  Pay</Text>
                            </Text>
                        </Pressable>
                    </Button>
                }
            </View>
        </View >
    )
}