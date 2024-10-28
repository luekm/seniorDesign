import React, { useEffect, useMemo, useRef, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TextInput, Pressable, Alert } from "react-native"
import { BASE_URL } from "../shared/Constants"
import { styles } from "../shared/Styles"
import { colors } from "../shared/Colors"
import { IndexPath, Input, Select, SelectItem, Button, CheckBox, Radio, Layout } from "@ui-kitten/components"
import { EditHistoryFormScreenNavigationProp, EditHistoryFormScreenRouteProp } from '../../utils/props'
import { UserDetailsParams, UserDetails_Location, UserDetails_User, UserDetails_Pet } from '../../utils/params'
import Textfield from '../../components/Textfield'
import { EditPetScreenParams } from './EditPetScreen'
import { LocationInterface } from '../shared/Interfaces'

export interface EditHistoryFormScreenParams {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface,
    petId: string
}

interface EditHistoryForm {
    ageAdoptFamily: string, health: string, otherPets: string, childrenAges: string, vetFeelingsMuzzled: string, medicalHistory: string, medications: string, medReactions: string, currentFood: string, shareImageAndStory: boolean
}

function EditHistoryFormScreen( props: { route: EditHistoryFormScreenRouteProp, navigation: EditHistoryFormScreenNavigationProp }) {
    const params: EditPetScreenParams = props.route.params as EditHistoryFormScreenParams
    const [historyForm, setHistoryForm] = useState<EditHistoryForm>({ ageAdoptFamily: "", health: "", otherPets: "", childrenAges: "", vetFeelingsMuzzled: "", medicalHistory: "", medications: "", medReactions: "", currentFood: "", shareImageAndStory: true })
    const isSubmittingRef = useRef<boolean>(false)

    useEffect(() => {
        fetchAndHydrateHistoryData()
    }, [])

    const fetchAndHydrateHistoryData = async () => {
        let url = BASE_URL + "history.get/" + params.petId
        let historyData = await (await fetch(url)).json()
        setHistoryForm({
            ageAdoptFamily: historyData.ageAdoptFamily,
            health: historyData.health,
            otherPets: historyData.otherPets,
            childrenAges: historyData.childrenAges,
            vetFeelingsMuzzled: historyData.vetFeelingsMuzzled,
            medicalHistory: historyData.medicalHistory,
            medications: historyData.medications,
            medReactions: historyData.medReactions,
            currentFood: historyData.currentFood,
            shareImageAndStory: historyData.shareImageAndStory
        })
        console.log(historyData.shareImageAndStory)
    }

    const handleSubmit = async () => {
        if (isSubmittingRef.current)
            return
        submitEditHistory()
    }

    async function submitEditHistory() {
        let url = BASE_URL + "/history/update/" + params.petId 
        let res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "ageAdoptFamily": historyForm.ageAdoptFamily,
                "health": historyForm.health,
                "otherPets": historyForm.otherPets,
                "childrenAges": historyForm.childrenAges,
                "vetFeelingsMuzzled": historyForm.vetFeelingsMuzzled,
                "medicalHistory": historyForm.medicalHistory,
                "medications": historyForm.medications,
                "medReactions": historyForm.medReactions,
                "currentFood": historyForm.currentFood,
                "shareImageAndStory": historyForm.shareImageAndStory,
                "hid": null
            }),
        })
        props.navigation.navigate("EditPet", { ...params } as EditPetScreenParams)
    }

    function back() {
        let editPetScreenParams: EditPetScreenParams = {
            ...params
        }
        props.navigation.navigate("EditPet", editPetScreenParams)
    }

    return (
        <ScrollView>
            <SafeAreaView style={styles.background}>
            <View style={{ width: "80%" }}>
                    <Text style={styles.header}> Pet History Form </Text>
                    <View>
                        <Text>How old was your pet when they first became a part of your family? Where did we adopt from? And did we see mom, or dad, or littermates?</Text>
                        <Textfield
                            value={historyForm.ageAdoptFamily!}
                            placeholder={historyForm.ageAdoptFamily!}
                            onChangeText={(newAgeAdoptFamily: string) => {
                                setHistoryForm((prevState: EditHistoryForm) => ({ ...prevState, ageAdoptFamily: newAgeAdoptFamily}))
                            }}
                        />
                        
                        <Text>Was your pet healthy at the time of adoption?</Text>
                        <Textfield
                            value={historyForm.health!}
                            placeholder={historyForm.health!}
                            onChangeText={(newHealth: string) => {
                                setHistoryForm((prevState: EditHistoryForm) => ({ ...prevState, health: newHealth}))
                            }}
                        />
                        
                        <Text>Do we have other pets in the household? If so, please list.</Text>
                        <Textfield
                            value={historyForm.otherPets!}
                            placeholder={historyForm.otherPets!}
                            onChangeText={(newOtherPets: string) => {
                                setHistoryForm((prevState: EditHistoryForm) => ({ ...prevState, otherPets: newOtherPets}))
                            }}
                        />
                        
                        <Text>Do we have any children in the household? If so, what are their ages</Text>
                        <Textfield
                            value={historyForm.childrenAges!}
                            placeholder={historyForm.childrenAges!}
                            onChangeText={(newChildrenAges: string) => {
                                setHistoryForm((prevState: EditHistoryForm) => ({ ...prevState, childrenAges: newChildrenAges}))
                            }}
                        />
                        
                        <Text>Has your pet experienced anxiety, fear, or aggression at a veterinary hospital or groomer before? Has your pet ever needed to be muzzled? Briefly explain.</Text>
                        <Textfield
                            value={historyForm.vetFeelingsMuzzled!}
                            placeholder={historyForm.vetFeelingsMuzzled!}
                            onChangeText={(newVetFeelingsMuzzled: string) => {
                                setHistoryForm((prevState: EditHistoryForm) => ({ ...prevState, vetFeelingsMuzzled: newVetFeelingsMuzzled}))
                            }}
                        />
                        
                        <Text>Please tell us about any past major medical conditions, injuries, or surgeries that your pet has experienced.</Text>
                        <Textfield
                            value={historyForm.medicalHistory!}
                            placeholder={historyForm.medicalHistory!}
                            onChangeText={(newMedicalHistory: string) => {
                                setHistoryForm((prevState: EditHistoryForm) => ({ ...prevState, medicalHistory: newMedicalHistory}))
                            }}
                        />
                        
                        <Text>Please list any medications, supplements, and/or preventative your pet is taking. Include doses and how often administered.</Text>
                        <Textfield
                            value={historyForm.medications!}
                            placeholder={historyForm.medications!}
                            onChangeText={(newMedications: string) => {
                                setHistoryForm((prevState: EditHistoryForm) => ({ ...prevState, medications: newMedications}))
                            }}
                        />
                        
                        <Text>Has your pet had any adverse reactions to medications or vaccinations? Briefly explain.</Text>
                        <Textfield
                            value={historyForm.medReactions!}
                            placeholder={historyForm.medReactions!}
                            onChangeText={(newMedReactions: string) => {
                                setHistoryForm((prevState: EditHistoryForm) => ({ ...prevState, medReactions: newMedReactions}))
                            }}
                        />
                        
                        <Text>What are you currently feeding your pet? Please include specific brand, type, measured amounts, and the same information for treats as well. You can bring a picture of the bag to your appointment if you'd like or email it to us!</Text>
                        <Textfield
                            value={historyForm.currentFood!}
                            placeholder={historyForm.currentFood!}
                            onChangeText={(newCurrentFood: string) => {
                                setHistoryForm((prevState: EditHistoryForm) => ({ ...prevState, currentFood: newCurrentFood}))
                            }}
                        />
                        <Text>We love social media! Do we have your permission to share your pet's image and story on social media, our website & other forms of related media? Your name and personal information will never be shared</Text>
                        <Layout
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}
                            level='1'
                        >
                            <Radio
                                style={{ margin: 2 }}
                                checked={historyForm.shareImageAndStory}
                                onChange={(nextChecked) => {

                                    setHistoryForm((prevState: EditHistoryForm) => ({ ...prevState, shareImageAndStory: true }))
                                    //                                 setStory(true)
                                }
                                }
                            >
                                Yes
                            </Radio>
                            <Radio
                                style={{ margin: 2 }}
                                checked={!historyForm.shareImageAndStory}
                                onChange={nextChecked => {

                                    setHistoryForm((prevState: EditHistoryForm) => ({ ...prevState, shareImageAndStory: false }))
                                    //                             setStory(false)
                                }}
                            >
                                No
                            </Radio>

                        </Layout>
                        <View style={styles.buttonGroup}>
                            <Button style={{ ...styles.mainButton, backgroundColor: colors.green, borderColor: colors.green }} onPress={handleSubmit}>
                                <Text> Save Changes </Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

export default EditHistoryFormScreen