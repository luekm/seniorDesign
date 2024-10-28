import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView, TouchableOpacity, FlatList, StyleSheet, Text, View, Pressable } from "react-native"
import { Input, Button } from "@ui-kitten/components"
import { BASE_URL } from "../shared/Constants"
import { styles } from "../shared/Styles"
import StarRating from 'react-native-star-rating-widget'
import { LocationInterface } from '../shared/Interfaces'
import { HomeScreenParams } from '../Home/HomeScreen'
import ClientNavbar from '../../components/ClientNavbar'

export interface CreateReviewVetScreenParams {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface,
    reviewerId: string,
    revieweeId: string,
    revieweeFirstName: string,
    revieweeLastName: string,
    revieweeAverageRating: number,
    appointmentId: string,
}
function CreateReviewVetScreen(props: any) {
    const params = props.route.params as CreateReviewVetScreenParams

    const reviewTextRef = useRef('')
    const [errors, setError] = useState({})
    const isSubmittingRef = useRef(false)
    const [rating, setRating] = useState(0)

    /* user tags */
    const [clientTags, setClientTags] = useState([
        { name: 'Excellent Service', id: '1' },
        { name: 'Great Conversation', id: '2' },
        { name: 'Attentive', id: '3' },
        { name: 'Punctual', id: '4' },
        { name: 'Knowledgeable', id: '5' },
    ])
    const [vetTags, setVetTags] = useState([
        { name: 'Great Conversation', id: '2' },
        { name: 'Attentive', id: '3' },
        { name: 'Clean Tidy', id: '6' },
    ])
    /* user tags */

    /* selected tags */
    const [selected, setSelected] = useState<string[]>([])

    const finalTagRef = useRef({})


    const handleSubmit = async () => {
        if (isSubmittingRef.current)
            return

        matchTags()
        submitReview()
    }


    const matchTags = () => {
        finalTagRef.current = {
            excellentService: selected.some(ar => ar.includes(clientTags[0].id)) ? 1 : 0,
            greatConversation: selected.some(ar => ar.includes(vetTags[0].id)) ? 1 : 0,
            attentive: selected.some(ar => ar.includes(vetTags[1].id)) ? 1 : 0,
            punctual: selected.some(ar => ar.includes(clientTags[3].id)) ? 1 : 0,
            knowledgeable: selected.some(ar => ar.includes(clientTags[4].id)) ? 1 : 0,
            cleanTidy: 0,
        }
    }


    async function submitReview() {
        // POST request using fetch with async/await
        if (!isSubmittingRef.current && (Object.keys(finalTagRef.current).length !== 0)) {
            isSubmittingRef.current = true

            let reviewObject = {
                reviewer: params.reviewerId,
                reviewee: params.revieweeId,
                description: reviewTextRef.current,
                rating: rating,
                appointment: null,
                tags: finalTagRef.current,
            }


            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reviewObject)
            }

            let url = BASE_URL + '/review/create/' + params.appointmentId

            let res = await fetch(url, requestOptions)
                .then((response) => response.json())
                .then(responseJson => {
                    console.error("Create Review Successful")
                    let homeParams: HomeScreenParams = {
                        userId: params.userId,
                        userIsVet: params.userIsVet,
                        location: params.location
                    }
                    props.navigation.replace("Home", homeParams)
                    isSubmittingRef.current = false
                })
                .catch((error) => {
                    console.error("Invalid review")
                    console.error(error)
                    isSubmittingRef.current = false
                })
        }
    }


    const renderTags: any = (params: any) => {
        const { name, id } = params.item

        const isSelected = selected.filter((i) => i === id).length > 0 // checking if the item is already selected

        return (
            <TouchableOpacity
                key={params.index}
                onPress={() => {
                    if (isSelected) {
                        setSelected((prev) => prev.filter((i) => i !== id))
                    } else {
                        setSelected(prev => [...prev, id])
                    }
                }}
                style={isSelected ? styles.tagSelect : styles.tagUnselect}>
                <Text style={isSelected ? styles.tagTextSelect : styles.tagTextUnselect}> {name} </Text>
            </TouchableOpacity>
        )
    }

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.container}>
                <View>


                    <Text style={styles.titleText}>Leave a review!</Text>

                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.tempPic}><Text> img </Text></View>
                        <View style={{ justifyContent: "center" }}>
                            <View>
                                <Text style={styles.boldText}> {params.revieweeFirstName} {params.revieweeLastName}</Text>
                                <Text style={{ justifyContent: "center" }}> {params.revieweeAverageRating} star rating </Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.titleText}>Rate</Text>
                    <StarRating
                        rating={rating}
                        onChange={setRating}
                        maxStars={5}
                        enableHalfStar={true}
                    />

                    <Text style={styles.titleText}>Review</Text>
                    <Input
                        multiline size={"large"}
                        style={styles.descriptionBox}
                        placeholder='Enter a review if you would like'
                        onChangeText={(text) => { reviewTextRef.current = text }}
                    />

                    <View>
                        <View>
                            <FlatList
                                keyExtractor={item => item.id}
                                numColumns={3}
                                data={vetTags}
                                renderItem={renderTags}
                            />
                        </View>
                        <Button style={styles.create} onPress={handleSubmit}>
                            <Text> Submit </Text>
                        </Button>
                    </View>

                </View>

            </View>

            <ClientNavbar navigation={props.navigation} {...params} />
        </SafeAreaView>
    )
}

export default CreateReviewVetScreen