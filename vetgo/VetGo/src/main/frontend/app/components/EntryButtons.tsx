import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, Text, View, Pressable, Alert, TouchableHighlight} from "react-native";
import {Logo} from "../screens/shared/Components";
import {Input} from "@ui-kitten/components";
import {useFocusEffect} from "@react-navigation/native";
import {colors} from "../screens/shared/Colors";
import {styles} from "../screens/shared/Styles";
import {BASE_URL} from "../screens/shared/Constants";

function EntryButtons(props: any) {
    let direction = props.direction;
    var cmd: any = null
    if(direction == "Login"){
        cmd = props.navigation.navigate
    }
    else{
        cmd = props.cmd
    }

    return (
        <View id={"buttonGroup"} style={styles.buttonGroup}>
            <TouchableHighlight style={{...styles.mainButton, backgroundColor: colors.black}}
                underlayColor={colors.black_underlay}
                onPress={() => cmd(direction)}>
                <Text style={styles.buttonText}> LOGIN </Text>
            </TouchableHighlight>

            <TouchableHighlight style={{...styles.mainButton, backgroundColor: colors.black}}
                underlayColor={colors.black_underlay}
                onPress={() => props.navigation.navigate("SignUp")}>
                <Text style={styles.buttonText}> SIGNUP </Text>
            </TouchableHighlight>

            <TouchableHighlight style={{...styles.mainButton, backgroundColor: colors.brightRed}}
                underlayColor={colors.brightRed_underlayColor}
                onPress={() => props.navigation.navigate('Emergency')}>
                <Text style={styles.buttonText}> EMERGENCY </Text>
            </TouchableHighlight>
        </View>
    );
}

export default EntryButtons