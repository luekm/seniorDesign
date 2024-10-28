import React, { useEffect, useState, useRef } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable, Alert, TouchableHighlight } from "react-native"
import { Logo } from "../shared/Components"
import { Input } from "@ui-kitten/components"
import { useFocusEffect } from "@react-navigation/native"
import { colors } from "../shared/Colors"
import { styles } from "../shared/Styles"
import { BASE_URL } from "../shared/Constants"
import EntryButtons from "../../components/EntryButtons"
import { LocationScreenParams } from '../Location/LocationScreen'
import { LoginScreenNavigationProp, LoginScreenRouteProp } from '../../utils/props'

export interface LoginScreenParams {

}
function LoginScreen(props: { navigation: LoginScreenNavigationProp, route: LoginScreenRouteProp }) {

    // hydrate the params
    let params = props.route.params as LoginScreenParams

    //region States
    const [nameEmail, setNameEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailError, setEmailError] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")

    const isSubmittingRef = useRef(false)
    //endregion

    //region Handlers
    const handleSubmit = async () => {
        if (isSubmittingRef.current)
            return

        let isValid = validateCredentials()
        if (isValid) {
            submitLogin()
        } else {
        }
    }

    //endregion

    //region Functions
    // For clearing fields when user switch between apps
    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setNameEmail("")
                setPassword("")
                setEmailError("")
                setPasswordError("")
                isSubmittingRef.current = false
            }
        }, [])
    )

    function validateCredentials() {
        let isValid = true
        if (!nameEmail) {
            setEmailError("Username or Email is required!")
            isValid = false
        }
        if (!password) {
            setPasswordError("Password is required!")
            isValid = false
        }
        return isValid
    }

    async function submitLogin() {
        isSubmittingRef.current = true
        
        // Log the username and password being used for the login attempt
        console.log("Attempting login with Username/Email:", nameEmail, "and Password:", password);

        let url = BASE_URL + "/api/user/login/" + nameEmail + "/" + password
        //let url = "coms-402-001.class.las.iastate.edu:8080" + "/api/user/login/" + nameEmail + "/" + password
        
        //-------------
        
         fetch(url, { method: 'GET' })
        .then((response) => {
            console.log("Raw response:", response);
            return response.text(); // Use text() to read the response body as text
        })
        .then((text) => {
            console.log("Response body as text:", text);
            try {
                return JSON.parse(text); // Manually parse the text as JSON
            } catch (error) {
                console.error("Error parsing JSON:", error);
                throw new Error("Failed to parse response as JSON");
            }
        })
        .then(responseJson => {
            let params: LocationScreenParams = {
                userId: responseJson.id,
                userIsVet: responseJson.vetLicense ? true : false
            }
            props.navigation.navigate("Location", params);
            isSubmittingRef.current = false;
        })
        .catch((error) => {
            console.error("Invalid Login! \nUsername / Email is not found or password is wrong.");
            console.error(error);
            isSubmittingRef.current = false;
        });
        
        //------------

        let currUser = await fetch(url, { method: 'GET' })
            .then((response) => response.json())
            //If response is in json then in success
            .then(responseJson => {
                let params: LocationScreenParams = {
                    userId: responseJson.id,
                    userIsVet: responseJson.vetLicense ? true : false
                }
                props.navigation.navigate("Location", params)
                isSubmittingRef.current = false
            })
            //If response is not in json then in error
            .catch((error) => {
                console.error("Invalid Login! \nUsername / Email is not found or password is wrong.")
                console.error(error)
                isSubmittingRef.current = false
            })
    }

    //endregion

    return (
        <SafeAreaView style={styles.background}>
            <Logo />

            <View style={{ width: "80%", flex: 1 }}>
                <ScrollView>
                    <View style={styles.signUpLoginGroup}>
                        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                            Login
                        </Text>

                        <Input
                            value={nameEmail} size={"large"} style={styles.fieldText}
                            placeholder={"Username / Email"}
                            onChangeText={(nameEmail) => {
                                setNameEmail(nameEmail)
                            }}
                        />
                        <Text style={styles.errorText}>{emailError}</Text>
                        <Input
                            value={password} size={"large"} style={styles.fieldText}
                            placeholder={"Password"}
                            secureTextEntry={true}
                            onChangeText={(password) => {
                                setPassword(password)
                            }}
                        />
                        <Text style={styles.errorText}>{passwordError}</Text>
                    </View>

                    <EntryButtons direction={null} navigation={props.navigation} cmd={handleSubmit} />
                </ScrollView>
               {/* additional emergency button was here... already used in entry buttons though...*/}
            </View>

        </SafeAreaView>
    )
}

export default LoginScreen

// <TouchableHighlight style={{ ...styles.mainButton, backgroundColor: colors.brightRed }}
//                             underlayColor={colors.brightRed_underlayColor}
//                             onPress={() => props.navigation.navigate('Emergency')}>
//                             <Text style={styles.buttonText}> EMERGENCY </Text>
//                         </TouchableHighlight>