import React, { useEffect, useState, useRef } from 'react'
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    TouchableHighlight
} from "react-native"
import { useFocusEffect } from "@react-navigation/native"
import { Input } from "@ui-kitten/components"
import { BASE_URL } from "../shared/Constants"
import { colors } from "../shared/Colors"
import { styles } from "../shared/Styles"
import { LocationInterface } from '../shared/Interfaces'
import ClientNavbar from '../../components/ClientNavbar'

export interface ChangePasswordScreenParams {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface
}
interface ChangePasswordForm {
    password: string,
    confirmPassword: string
}

function ChangePasswordScreen(props: any) {
    const params = props.route.params as ChangePasswordScreenParams

    const [form, setForm] = useState<ChangePasswordForm>({ password: "", confirmPassword: "" })
    const [errors, setErrors] = useState<ChangePasswordForm>({ password: "", confirmPassword: "" })
    const isSubmittingRef = useRef<boolean>(false)
    const [isSubmit, setSubmit] = useState(false)
   
    //#region Handlers
    const handleSubmit = async () => {
        if (isSubmittingRef.current)
            return

        let isValid = validate()
        if (isValid) {
            submitChangePasswordForm()
        }
    }

    //#endregion

    //#region Functions
    useFocusEffect(
        React.useCallback(() => {
            return () => {
                setForm({ password: "", confirmPassword: "" })
                setErrors({ password: "", confirmPassword: "" })
                setSubmit(false)
            }
        }, [])
    )

    function validate() {
        let isValid: boolean = true
        setErrors({ password: "", confirmPassword: "" })
        if (!form.password) {
            setErrors((prevState) => ({ ...prevState, password: "Password is required!" }))
            isValid = false
        } else if (form.password.length < 6) {
            setErrors((prevState) => ({ ...prevState, password: "Password must contain at least 6 characters!" }))
            isValid = false
        }
        if (!form.confirmPassword.match(form.password) || !form.password) {
            setErrors((prevState) => ({ ...prevState, confirmPassword: "Password does not match" }))
            isValid = false
        }
        return isValid
    }

    async function submitChangePasswordForm() {
        isSubmittingRef.current = true

        // Get User Id

        let url = "";
        if (!params.userIsVet) {
            url = BASE_URL + "/owner/getUser/id/" + Number(params.userId);
        } else {
            url = BASE_URL + "/vet/getUser/id/" + Number(params.userId);
        }
        let user: any = await fetch(url).then((response) => response.json()).then(async (responseJson) => {
            console.log(responseJson)
            let actualUserId = responseJson.id;

            if (actualUserId == undefined) {
                console.error("Invalid userId from server");
                return;
            }
            // Change password
            url = BASE_URL + "/api/user/updatePassword/" + actualUserId;
            const body = {
                newPassword: form.password
            }
            const options = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            }
            let currUser = await fetch(url, options)
                .then((response) => response.json())
                //If response is in json then in success
                .then(responseJson => {
                    //alert("Login Successful");
                    console.log("-----------------------")
                    console.log(responseJson)
                    props.navigation.navigate("Home", params)
                })
                //If response is not in json then in error
                .catch((error) => {
                    console.error("Could not find user!");
                    console.error(error);
                });
        }).catch((error) => {
            console.error(error);
        });

        isSubmittingRef.current = false
        // props.navigation.navigate("Home", props)
    }


    return (
        <SafeAreaView style={styles.background}>
            <View style={{ width: "80%", flex: 1 }}>
                <ScrollView>
                    <View id={"ChangePasswordGroup"} style={styles.signUpLoginGroup}>
                        <Text style={{ fontSize: 30, fontWeight: "bold", margin: 10 }}>
                            Change Password
                        </Text>

                        <Input
                            clearButtonMode={"always"} size={"large"}
                            value={form.password} style={styles.fieldText}
                            placeholder={"New Password"} secureTextEntry={true}
                            onChangeText={(newPassword) => {
                                setForm((prevState: ChangePasswordForm) => ({ ...prevState, password: newPassword }))
                            }}
                        />
                        <Text style={styles.errorText}>{errors.password}</Text>

                        <Input
                            clearButtonMode={"always"} size={"large"}
                            value={form.confirmPassword} style={styles.fieldText}
                            placeholder={"Confirm New Password"} secureTextEntry={true}
                            onChangeText={(newConfirmPassword) => {
                                setForm((prevState: ChangePasswordForm) => ({ ...prevState, confirmPassword: newConfirmPassword }))
                            }}
                        />
                        <Text style={styles.errorText}>{errors.confirmPassword}</Text>

                    </View>

                    <View id={"buttonGroup"} style={styles.buttonGroup}>
                        <TouchableHighlight style={{ ...styles.mainButton, backgroundColor: colors.black }}
                            underlayColor={colors.black_underlay}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonText}> SUBMIT </Text>
                        </TouchableHighlight>
                    </View>
                </ScrollView>
                <ClientNavbar navigation={props.navigation} {...params} />
            </View>
        </SafeAreaView>
    )
}

export default ChangePasswordScreen