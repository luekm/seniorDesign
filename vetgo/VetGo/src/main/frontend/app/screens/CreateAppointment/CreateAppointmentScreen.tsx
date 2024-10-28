import { useState, useEffect } from "react"
import { SafeAreaView, ScrollView, Text, View, Alert } from "react-native"
import { styles } from "../shared/Styles"
import Textfield from "../../components/Textfield"
import { Button, Calendar, CheckBox } from "@ui-kitten/components"
import { colors } from "../shared/Colors"
import { BASE_URL } from "../shared/Constants"
import { LocationInterface } from "../shared/Interfaces"
import { HomeScreenParams } from "../Home/HomeScreen"

export interface CreateAppointmentParams {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface,
    petId: string,
}

const CreateAppointmentScreen = (props: any) => {
    const params: CreateAppointmentParams = props.route.params as CreateAppointmentParams

    const [description, setDescription] = useState('')
    const [date, setDate] = useState(new Date())
    const [error, setError] = useState('')
    const [petName, setPetName] = useState<string>("")
    const [isBleeding, setIsBleeding] = useState(false);
    const [isChoking, setIsChoking] = useState(false);
    const [isDifficultPotty, setIsDifficultPotty] = useState(false);
    const [isSeize, setIsSeize] = useState(false);
    const [isPale, setIsPale] = useState(false);


    useEffect(() => {
        fetchAndHydratePetData()
    }, [])

    const fetchAndHydratePetData = async () => {
        let url = BASE_URL + "/pet/get/" + params.petId
        let petData = await (await fetch(url)).json()
        setPetName(petData.name)
    }

    const postAppointment = async (url: string, options: any) => {
        await fetch(url, options)
            .then(response => response.json())
            .then(_ => {
                console.error('Appointment created!')
                props.navigation.popToTop()

                props.navigation.navigate('Home', { ...params } as HomeScreenParams)
            })
    }

    const handleSubmit = async () => {
        if (!description.length) {
            setError('Description is required!')
            return
        }
        setError('')

        let unsanitizedDate = date.toLocaleDateString()
        let sanitizedDate = unsanitizedDate.split('/')
        const body = {
            ...params.location,
            day: ('0' + sanitizedDate[1]).slice(-2),
            month: ('0' + sanitizedDate[0]).slice(-2),
            year: sanitizedDate[2].slice(-2),
        }
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        }
        const url = BASE_URL + '/appointment/create/' + params.userId + '/' + params.petId + '/' + description

        await postAppointment(url, options)
    }

    const handleBleedingCheck = (checked: boolean) => {
        setIsBleeding(checked);
        if(checked) {
            props.navigation.navigate('Emergency');
            Alert.alert(
                        'Emergency Alert',
                        'Please seek immediate veterinary attention! The provided information will take you to the nearest veterinarian.',
                        [
                            {
                                text: 'OK',
                                onPress: () => console.log('OK Pressed'),
                                style: 'cancel',
                            },
                        ],
                        { cancelable: false }
                    );

        }

    }

    const handleChokingCheck = (checked: boolean) => {
            setIsChoking(checked);
            if(checked) {
                props.navigation.navigate('Emergency');
                Alert.alert(
                            'Emergency Alert',
                            'Please seek immediate veterinary attention! The provided information will take you to the nearest veterinarian.',
                            [
                                {
                                    text: 'OK',
                                    onPress: () => console.log('OK Pressed'),
                                    style: 'cancel',
                                },
                            ],
                            { cancelable: false }
                        );

            }

        }

        const handlePottyCheck = (checked: boolean) => {
                setIsDifficultPotty(checked);
                if(checked) {
                    props.navigation.navigate('Emergency');
                    Alert.alert(
                                'Potential Emergency Alert',
                                'Consider calling the veterinarian, could be a sign of something more serious.',
                                [
                                    {
                                        text: 'OK',
                                        onPress: () => console.log('OK Pressed'),
                                        style: 'cancel',
                                    },
                                ],
                                { cancelable: false }
                            );
                }
            }

    const handleSeizeCheck = (checked: boolean) => {
                    setIsDifficultPotty(checked);
                    if(checked) {
                        props.navigation.navigate('Emergency');
                        Alert.alert(
                                    'Potential Emergency Alert',
                                    'Consider calling the veterinarian, could be a sign of something more serious.',
                                    [
                                        {
                                            text: 'OK',
                                            onPress: () => console.log('OK Pressed'),
                                            style: 'cancel',
                                        },
                                    ],
                                    { cancelable: false }
                                );
                    }
                }
    const handlePaleCheck = (checked: boolean) => {
                        setIsDifficultPotty(checked);
                        if(checked) {
                            props.navigation.navigate('Emergency');
                            Alert.alert(
                                        'Potential Emergency Alert',
                                        'Consider calling the veterinarian, your pet may be in shock.',
                                        [
                                            {
                                                text: 'OK',
                                                onPress: () => console.log('OK Pressed'),
                                                style: 'cancel',
                                            },
                                        ],
                                        { cancelable: false }
                                    );
                        }
                    }

    return (<SafeAreaView style={styles.background}>
        <ScrollView>
            <Text style={styles.header}>Schedule Appointment for {petName}</Text>

            <Text>Reason for appointment</Text>
            <Textfield placeholder='Please be as descriptive as possible.' value={description} onChangeText={setDescription} />
            <Text style={styles.header}>Select Date</Text>
            <View>
                <Calendar min={new Date()} date={date} onSelect={d => setDate(d)} />
            </View>
            <View>
            </View>
        <View>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={{ fontWeight: "bold" }}>Symptom Checker</Text>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ marginRight: -2, marginLeft: 5 }}>Is your pet experiencing bleeding lasting 5 or more minutes?</Text>
                <CheckBox checked={isBleeding} onChange={handleBleedingCheck} />
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: "black", marginVertical: 5 }} />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ marginRight: -2, marginLeft: 5 }}>Is your pet experiencing choking, difficulty breathing, or other respiratory problems?</Text>
                <CheckBox checked={isChoking} onChange={handleChokingCheck} />
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: "black", marginVertical: 5 }} />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ marginRight: -2, marginLeft: 5 }}>Is your pet experiencing difficulty using the bathroom?</Text>
                <CheckBox checked={isDifficultPotty} onChange={handlePottyCheck} />
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: "black", marginVertical: 5 }} />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ marginRight: -2, marginLeft: 5 }}>Is your pet experiencing seizures?</Text>
                <CheckBox checked={isSeize} onChange={handleSeizeCheck} />
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: "black", marginVertical: 5 }} />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ marginRight: -2, marginLeft: 5 }}>Does your pet have pale gums, showing weakness or appear confused?</Text>
                <CheckBox checked={isPale} onChange={handlePaleCheck} />
            </View>
            <View style={{ borderBottomWidth: 1, borderBottomColor: "black", marginVertical: 5 }} />
        </View>



        </ScrollView>
        <Text>{error}</Text>
        <Button style={{ ...styles.mainButton, backgroundColor: colors.green, borderColor: colors.green }}
            onPress={handleSubmit}>
            <Text>Submit</Text>
        </Button>

    </SafeAreaView>)
}

export default CreateAppointmentScreen