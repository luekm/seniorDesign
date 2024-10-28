import { SafeAreaView, ScrollView, View } from "react-native"
import ClientNavbar, { ClientNavbarParams } from "../../components/ClientNavbar"
import { MyAppointmentsScreenNavigationProp, MyAppointmentsScreenRouteProp } from '../../utils/props'
import axios from 'axios'
import { BASE_URL } from '../shared/Constants'
import { UserDetailsParams } from '../../utils/params'
import { Button, Card, Layout, Text } from '@ui-kitten/components'
import { styles } from '../shared/Styles'
import { colors } from '../shared/Colors'
import { LocationInterface } from '../shared/Interfaces'
import { appointment } from '@prisma/client'
import { useEffect, useState } from 'react'

export interface MyAppointmentsScreenParams {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface
}

const MyAppointmentsScreen = (props: { route: MyAppointmentsScreenRouteProp, navigation: MyAppointmentsScreenNavigationProp }) => {
    const params: MyAppointmentsScreenParams = props.route.params!
    const [appointments, setAppointments] = useState<any[]>([])


    const fetchPetIdList = async (): Promise<string[]> => {
        const res = await fetch(BASE_URL + "/owner/pet/" + params.userId)

        let tempPetList: any[] = await res.json()
        let petIdList: string[] = []
        for (let i = 0; i < tempPetList.length; i++) {
            petIdList.push(tempPetList[i].pid)
        }
        return petIdList
    }


    const getAppointments = async () => {
        let petIdList: string[] = await fetchPetIdList()
        const allAppointments: any[] = (await axios.get(BASE_URL + "/appointment/all")).data
        const myAppointments = allAppointments.filter(appointment => petIdList.includes(appointment.pet.pid))
        setAppointments(myAppointments)
    }

    useEffect(() => {
        console.log("useEffect")
        getAppointments()
        console.log('length' + appointments.length)
    }, [])

    return (
        <SafeAreaView style={styles.background}>
            <Text style={{ marginRight: 'auto', marginLeft: 20, fontSize: 28, fontWeight: 'bold', }}>My Appointments</Text>
            <ScrollView>
                <View>
                    {appointments.map(appointment => <AppointmentCard key={appointment.aid} appointmentData={appointment} userId={params.userId} petName={appointment.pet.name} />)}
                </View>
            </ScrollView>
            <ClientNavbar navigation={props.navigation} {...params} />
        </SafeAreaView>

    )
}

interface AppointmentCardParams {
    userId: string,
    appointmentData: appointment,
    petName: string
}
const AppointmentCard = ({ userId, appointmentData, petName }: AppointmentCardParams) => {
    const [showDetails, setShowDetails] = useState(false)
    const cancelAppointment = async () => {
        console.log(appointmentData.aid, userId)
        await axios.put(BASE_URL + "/appointment/remove/" + appointmentData.aid + "/" + userId)
        console.error(`Appointment for ${petName} has been cancelled.`)
    }

    return (
        <Card style={{
            margin: 10,
            width: '100%',
        }}>
            <View>
                <Text category='h5'>{petName}</Text>
            </View>
            <Text category='label'>Scheduled for {appointmentData.time ?? ""}</Text>
            <Text category='s1' style={{
                marginVertical: 8,
                fontStyle: 'italic',
            }}>Status: {appointmentData.status ?? ""}</Text>
            <Text style={{
                marginVertical: 8,
                display: showDetails ? 'flex' : 'none'
            }}>Reason for visit: {appointmentData.description ?? ""}</Text>
            <Layout style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                marginTop: 16,
            }}>
                <Button style={{
                    marginHorizontal: 4,
                }} status='basic' size='small' onPress={cancelAppointment}>Cancel</Button>
                <Button style={{
                    marginHorizontal: 4,
                }} size='small' onPress={() => setShowDetails(s => !s)}><Text>{showDetails ? 'Hide' : 'View'} Details</Text></Button>

            </Layout>
        </Card >
    )
}


export default MyAppointmentsScreen
