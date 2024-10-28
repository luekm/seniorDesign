import React from 'react'

import { SafeAreaView, StyleSheet, Text, View, TouchableHighlight } from "react-native"
import { styles } from "../shared/Styles"
import { colors } from "../shared/Colors"
import ClientNavbar from '../../components/ClientNavbar'
import { LocationInterface } from '../shared/Interfaces'
import { VetAddChargesScreenParams } from '../VetAddCharges/VetAddChargesScreen'
import { ChangePasswordScreenParams } from '../ChangePassword/ChangePasswordScreen'
import { PaymentStripeScreenParams } from '../PaymentStripe/PaymentStripeScreen'


export interface SettingsScreenParams {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface
}
function SettingsScreen(props: any) {
    const params = props.route.params as SettingsScreenParams

    function logout() {
        props.navigation.navigate("Welcome")
    }

    return (
        <SafeAreaView style={{ ...styles.background, justifyContent: "space-evenly" }}>
            <View style={styles.buttonGroup}>
                <TouchableHighlight style={{ ...styles.mainButton, backgroundColor: colors.black }}
                    underlayColor={colors.black_underlay}
                    onPress={() => props.navigation.navigate("PaymentStripe", {...params} as PaymentStripeScreenParams)} // Made change so params are passed in the navigate
                >
                    <Text style={styles.buttonText}> Payment Stripe </Text>
                </TouchableHighlight>

                <TouchableHighlight style={{ ...styles.mainButton, backgroundColor: colors.black }}
                    underlayColor={colors.black_underlay}
                    onPress={() => props.navigation.navigate("VetAddCharges", { ...params } as VetAddChargesScreenParams)}
                >
                    <Text style={styles.buttonText}> VetAddCharges Test </Text>
                </TouchableHighlight>

                <TouchableHighlight style={{ ...styles.mainButton, backgroundColor: colors.black }}
                    underlayColor={colors.black_underlay}
                    onPress={() => props.navigation.navigate("ChangePassword", { ...params } as ChangePasswordScreenParams)}
                >
                    <Text style={styles.buttonText}> Change Password </Text>
                </TouchableHighlight>

                <TouchableHighlight style={{ ...styles.mainButton, backgroundColor: colors.black }}
                    underlayColor={colors.brightRed_underlayColor}
                // onPress={() => props.navigation.navigate("Map")}
                >
                    <Text style={styles.buttonText}> TesT BTN </Text>
                </TouchableHighlight>

                <TouchableHighlight style={{ ...styles.mainButton, backgroundColor: colors.lightGrey }}>
                    <Text style={styles.buttonText}></Text>
                </TouchableHighlight>

                <TouchableHighlight style={{ ...styles.mainButton, backgroundColor: colors.black }}
                    underlayColor={colors.black_underlay}
                    onPress={logout}>
                    <Text style={styles.buttonText}> Log Out </Text>
                </TouchableHighlight>
            </View>
            <ClientNavbar navigation={props.navigation} {...params} />
        </SafeAreaView>
    )
}

export default SettingsScreen