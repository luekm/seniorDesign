import React from 'react';
import {SafeAreaView, Text, View, TouchableHighlight} from "react-native";
import {Logo} from "../shared/Components";
import {styles} from "../shared/Styles";
import {colors} from "../shared/Colors";
import EntryButtons from '../../components/EntryButtons';

export interface WelcomeScreenParams {

}
function WelcomeScreen(props: any) {
    let params = props.route.params as  WelcomeScreenParams
    return (
        <SafeAreaView style={{ ...styles.background, justifyContent: "space-evenly" }}>
            <Logo />
            <EntryButtons direction={"Login"} navigation={props.navigation} />
        </SafeAreaView>
    );
}

export default WelcomeScreen;