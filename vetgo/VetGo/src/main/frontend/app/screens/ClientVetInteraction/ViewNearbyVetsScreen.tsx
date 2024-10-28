import { Image, Linking, Pressable, SafeAreaView, ScrollView, StyleSheet, View } from "react-native"
import ClientNavbar from "../../components/ClientNavbar"
import { styles } from "../shared/Styles"
import { LocationInterface } from '../shared/Interfaces'
import { ViewNearbyVetsScreenNavigationProp, ViewNearbyVetsScreenRouteProp } from '../../utils/props'
import { Avatar, Button, Card, Layout, Text } from '@ui-kitten/components'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { BASE_URL } from '../shared/Constants'
import { getLocationString } from '../../components/LocationDisplay'
import { homeStyles } from '../Home/HomeStyles'
import { FontAwesome5 } from '@expo/vector-icons'
import { colors } from '../shared/Colors'

export interface ViewNearbyVetsParams {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface
}

interface VetInternalModel {
    id: string,
    latitude: number,
    longitude: number,
    firstName: string,
    email: string,
    telephone: string,
}

const ViewNearbyVetsScreen = (props: { route: ViewNearbyVetsScreenRouteProp, navigation: ViewNearbyVetsScreenNavigationProp }) => {
    const params: ViewNearbyVetsParams = props.route.params!
    const [vets, setVets] = useState<VetInternalModel[]>([])

    const getAllVets = async () => {
        const allVets: any[] = (await axios.get(BASE_URL + "/vet/all")).data
        const allVetsInternal: VetInternalModel[] = []
        for (let i = 0; i < allVets.length; i++) {
            const vet = allVets[i]
            let vetInternalModel: VetInternalModel = {
                id: vet.aid,
                latitude: vet.userAccount.latitude,
                longitude: vet.userAccount.longitude,
                firstName: vet.firstName,
                email: vet.userAccount.email,
                telephone: vet.telephone
            }
            allVetsInternal.push(vetInternalModel)
        }

        // sort all vets by euclidian distance from current location
        allVetsInternal.sort((a, b) => {
            return Math.sqrt(Math.pow(a.latitude - params.location.latitude, 2) + Math.pow(a.longitude - params.location.longitude, 2)) -
                Math.sqrt(Math.pow(b.latitude - params.location.latitude, 2) + Math.pow(b.longitude - params.location.longitude, 2))
        })
        setVets(allVetsInternal)
    }

    useEffect(() => {
        getAllVets()
    }, [])

    return (
        <SafeAreaView style={styles.background}>
            <Text style={{ marginRight: 'auto', marginLeft: 20, fontSize: 28, fontWeight: 'bold', }}>Nearby Vets</Text>
            <ScrollView>
                <View>
                    {vets.map((vet) => <VetCard key={vet.id} vet={vet} />)}
                </View>
            </ScrollView>
            <ClientNavbar navigation={props.navigation} {...params} />
        </SafeAreaView>

    )
}

export default ViewNearbyVetsScreen

interface VetCardProps {
    vet: VetInternalModel
}

const VetCard: React.FC<VetCardProps> = ({ vet }) => {
    const [locationString, setLocationString] = useState<string>("")
    const [imageEncoding, setImageEncoding] = useState<String>("")

    useEffect(() => {
        getLocationString(vet.latitude ?? 0, vet.longitude ?? 0).then((locationString) => setLocationString(locationString))
    }, [])

    console.log(vet)

    const callVet = () => {
        console.log(vet)
        Linking.openURL(`tel:${vet.telephone}`)
            .then((supported) => {
                if (!supported) {
                    console.log("Can't handle phone call")
                } else {
                    return Linking.openURL(`tel:${vet.telephone}`)
                }
            })
            .catch((err) => console.error('An error occurred', err))
    }
    return (
        <View style={[homeStyles.petInfo, {}]}>
            <View style={{ width: "90%" }}>
                <Pressable style={{ display: "flex", flexDirection: "row", alignItems: 'center' }} onPress={() => { }}>
                    <Pressable onPress={() => { }}>
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
                            <Text style={{ ...styles.boldText }}> {vet.firstName}</Text>
                            <Text style={{ color: `${colors.darkGrey}` }}> {locationString}</Text>
                        </View>
                    </View>
                </Pressable>

                <Text style={{ marginLeft: 20, marginTop: 10 }}>{vet.email}</Text>
                <Text style={{ marginLeft: 20, marginTop: 10 }}>{vet.telephone}</Text>
                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10, marginLeft: 'auto' }}>
                    <Button style={{ marginRight: 10 }} onPress={callVet} status='primary'><FontAwesome5 name='phone' size={32} /></Button>
                    <Button style={{ marginRight: -20 }}><FontAwesome5 name='calendar-alt' size={32} /></Button>
                </View>
            </View>
        </View>
    )
}

const _styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '90%',
        maxWidth: 400,
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        marginRight: 16,
    },
    detailContainer: {
        flex: 1,
        justifyContent: 'center',
    },
});

