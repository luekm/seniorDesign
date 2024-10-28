import React, { useEffect, useMemo, useRef, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TextInput, Pressable, Alert } from "react-native"
import { BASE_URL } from "../shared/Constants"
import { styles } from "../shared/Styles"
import { colors } from "../shared/Colors"
import { IndexPath, Input, Select, SelectItem, Button, CheckBox, Radio, Layout } from "@ui-kitten/components"
import { HistoryFormScreenNavigationProp, HistoryFormScreenRouteProp } from '../../utils/props'
import { UserDetailsParams, UserDetails_Location, UserDetails_User, UserDetails_Pet } from '../../utils/params'
import Textfield from '../../components/Textfield'
import { CreatePetScreenParams } from './CreatePetScreen'
import { LocationInterface } from '../shared/Interfaces'

export interface HistoryFormScreenParams {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface,
    // petId: string
}

interface CreateHistoryForm {
    ageAdoptFamily: string, health: string, otherPets: string, childrenAges: string, vetFeelingsMuzzled: string, medicalHistory: string, medications: string, medReactions: string, currentFood: string, shareImageAndStory: boolean
}

function CreateHisotryFormScreen(props: { route: HistoryFormScreenRouteProp, navigation: HistoryFormScreenNavigationProp }) {
    const params: HistoryFormScreenParams = props.route.params as HistoryFormScreenParams
    const [historyForm, setHistoryForm] = useState<CreateHistoryForm>({ ageAdoptFamily: "", health: "", otherPets: "", childrenAges: "", vetFeelingsMuzzled: "", medicalHistory: "", medications: "", medReactions: "", currentFood: "", shareImageAndStory: true})
    const isSubmittingRef = useRef<boolean>(false)

    useEffect(() => {
    }, [])

    const handleSubmit = async () => {
        if (isSubmittingRef.current)
            return
        submitHistoryForm()
    }

    async function submitHistoryForm() {
        //////////
        ///////////         UNCOMMENT DOWN BELOW
        ////////////
        ////////////
        // let url = BASE_URL + "/history/add/" + params.userId //where is petid

        // let res = await fetch(url, {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         "ageAdoptFamily": historyForm.ageAdoptFamily,
        //         "health": historyForm.health,
        //         "otherPets": historyForm.otherPets,
        //         "childrenAges": historyForm.childrenAges,
        //         "vetFeelingsMuzzled": historyForm.vetFeelingsMuzzled,
        //         "medicalHistory": historyForm.medicalHistory,
        //         "medications": historyForm.medications,
        //         "medReactions": historyForm.medReactions,
        //         "currentFood": historyForm.currentFood,
        //         "shareImageAndStory": historyForm.shareImageAndStory,
        //         "pet": params.petId,
        //         "pid": null,
        //         "appointments": null
        //     }),
        // })
        // console.log("-------------------------?????????????????????")
        // console.log(res)

/////////////////////////////////////Uncomment till here ^ ////////////////////////////////////

    ///////////////////////////////////////////////////////////////////////////////UNCOMMENT ONE LINE DOWN
        props.navigation.navigate("CreatePet", { ...params } as CreatePetScreenParams)
    }

    function back() {
        // pets.pop()
        let createPetScreenParams: CreatePetScreenParams = {
            ...params
        }
        props.navigation.navigate("CreatePet", createPetScreenParams)
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
                                setHistoryForm((prevState: CreateHistoryForm) => ({ ...prevState, ageAdoptFamily: newAgeAdoptFamily}))
                            }}
                        />
                        
                        <Text>Was your pet healthy at the time of adoption?</Text>
                        <Textfield
                            value={historyForm.health!}
                            placeholder={historyForm.health!}
                            onChangeText={(newHealth: string) => {
                                setHistoryForm((prevState: CreateHistoryForm) => ({ ...prevState, health: newHealth}))
                            }}
                        />
                        
                        <Text>Do we have other pets in the household? If so, please list.</Text>
                        <Textfield
                            value={historyForm.otherPets!}
                            placeholder={historyForm.otherPets!}
                            onChangeText={(newOtherPets: string) => {
                                setHistoryForm((prevState: CreateHistoryForm) => ({ ...prevState, otherPets: newOtherPets}))
                            }}
                        />
                        
                        <Text>Do we have any children in the household? If so, what are their ages</Text>
                        <Textfield
                            value={historyForm.childrenAges!}
                            placeholder={historyForm.childrenAges!}
                            onChangeText={(newChildrenAges: string) => {
                                setHistoryForm((prevState: CreateHistoryForm) => ({ ...prevState, childrenAges: newChildrenAges}))
                            }}
                        />
                        
                        <Text>Has your pet experienced anxiety, fear, or aggression at a veterinary hospital or groomer before? Has your pet ever needed to be muzzled? Briefly explain.</Text>
                        <Textfield
                            value={historyForm.vetFeelingsMuzzled!}
                            placeholder={historyForm.vetFeelingsMuzzled!}
                            onChangeText={(newVetFeelingsMuzzled: string) => {
                                setHistoryForm((prevState: CreateHistoryForm) => ({ ...prevState, vetFeelingsMuzzled: newVetFeelingsMuzzled}))
                            }}
                        />
                        
                        <Text>Please tell us about any past major medical conditions, injuries, or surgeries that your pet has experienced.</Text>
                        <Textfield
                            value={historyForm.medicalHistory!}
                            placeholder={historyForm.medicalHistory!}
                            onChangeText={(newMedicalHistory: string) => {
                                setHistoryForm((prevState: CreateHistoryForm) => ({ ...prevState, medicalHistory: newMedicalHistory}))
                            }}
                        />
                        
                        <Text>Please list any medications, supplements, and/or preventative your pet is taking. Include doses and how often administered.</Text>
                        <Textfield
                            value={historyForm.medications!}
                            placeholder={historyForm.medications!}
                            onChangeText={(newMedications: string) => {
                                setHistoryForm((prevState: CreateHistoryForm) => ({ ...prevState, medications: newMedications}))
                            }}
                        />
                        
                        <Text>Has your pet had any adverse reactions to medications or vaccinations? Briefly explain.</Text>
                        <Textfield
                            value={historyForm.medReactions!}
                            placeholder={historyForm.medReactions!}
                            onChangeText={(newMedReactions: string) => {
                                setHistoryForm((prevState: CreateHistoryForm) => ({ ...prevState, medReactions: newMedReactions}))
                            }}
                        />
                        
                        <Text>What are you currently feeding your pet? Please include specific brand, type, measured amounts, and the same information for treats as well. You can bring a picture of the bag to your appointment if you'd like or email it to us!</Text>
                        <Textfield
                            value={historyForm.currentFood!}
                            placeholder={historyForm.currentFood!}
                            onChangeText={(newCurrentFood: string) => {
                                setHistoryForm((prevState: CreateHistoryForm) => ({ ...prevState, currentFood: newCurrentFood}))
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

                                    setHistoryForm((prevState: CreateHistoryForm) => ({ ...prevState, shareImageAndStory: true }))
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

                                    setHistoryForm((prevState: CreateHistoryForm) => ({ ...prevState, shareImageAndStory: false }))
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

export default CreateHisotryFormScreen