import { StyleSheet } from "react-native"
import { colors } from "../shared/Colors"

export const homeStyles: any = StyleSheet.create({

    clientComponent: {
        width: "90%",
        height: "90%"
    },

    vetComponent: {
        width: "90%",
        height: "90%"
    },

    petInfo: {
        alignItems: "center",
        borderBottomColor: colors.grey,
        borderBottomWidth: 2,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 10,
        width: "100%",
    },

    createAppointment: {
        backgroundColor: colors.darkGrey,
        borderColor: colors.darkGrey,
        width: 120,
    },

    viewAppointment: {
        backgroundColor: colors.green,
        borderColor: colors.green,
        width: 120,
    },

    waitingForAppointment: {
        backgroundColor: colors.blue,
        borderColor: colors.blue,
        width: 120,
    },

    payAppointment: {
        backgroundColor: colors.black,
        borderColor: colors.black,
        width: 120,
    },

    container: {
        alignItems: "flex-start",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: 0,
        margin: 0,
    },

    addPetContainer: {
        bottom: 40,
        left: 15,
        position: "absolute",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 20,
    },

    addPetButton: {
        borderRadius: 35,
        borderWidth: 2,
        color: colors.lightBlue,
        width: 70,
    },

    tempPic: {
        backgroundColor: colors.grey,
        height: 60,
        width: 60,
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
    },

})