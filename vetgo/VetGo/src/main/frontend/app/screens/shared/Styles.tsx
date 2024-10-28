import {StyleSheet} from "react-native"
import {colors} from "./Colors"

export const styles: any = StyleSheet.create({
    background: {
        alignContent: "center", //only takes effect when wrapping occur
        alignItems: "center", // secondary axis
        backgroundColor: colors.lightGrey,
        flex: 1,
        justifyContent: "flex-start", //main axis - currently col
    },

    header: {
        fontSize: 18,
        display: 'flex',
        marginRight: 'auto',
        marginVertical: 10,
        fontWeight: "bold",
    },
    buttonText: {
        color: colors.lightGrey,
        fontSize: 18,
        fontWeight: "bold",
    },

    boldText: {
        fontSize: 20,
        fontWeight: "bold",
    },

    buttonGroup: {
        alignContent: "center",
        alignItems: "center", // secondary axis
        justifyContent: "flex-start", //main axis - currently row
        width: "100%",
    },

    mainButton: {
        alignItems: "center",
        borderRadius: 10,
        justifyContent: "center",
        margin: 5,
        padding: 15,
        width: 230,
    },

    title: {
        alignItems: "center",
        backgroundColor: colors.grey,
        borderRadius: 8,
        flexShrink: 0,
        height: "25%",
        justifyContent: "center",
        marginTop: 25,
        width: "80%",
    },

    fieldText: {
        backgroundColor: colors.white,
        borderRadius: 3,
        borderWidth: 1,
        fontSize: 20,
        fontWeight: "normal",
        height: 50,
        width: "100%",
    },

    errorText: {
        color: colors.brightRed,
        flexShrink: 1,
        fontSize: 16,
        paddingBottom: 4,
        paddingTop: 2,
    },


    //region Google Auto Complete Container
    GAC_Container: {
        flex: 1,
    },
    GAC_ContainerStyle: {
        backgroundColor: colors.white,
        borderColor: colors.grey,
        borderRadius: 3,
        borderWidth: 1,
        fontSize: 20,
        fontWeight: "normal",
        height: 50,
        width: "100%",
    },
    //endregion


    //region Appointment Screen
    descriptionBox: {
        fontSize: 20,
        fontWeight: "normal",
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: colors.white,
    },

    tempMap: {
        alignItems: "center",
        backgroundColor: colors.grey,
        height: 250,
        justifyContent: "center",
        width: "90%",
    },

    defaultText: {
        fontSize: 18,
    },

    petContainer: {
        alignItems: "center",
        borderBottomColor: colors.grey,
        borderBottomWidth: 2,
        flexDirection: "row",
        height: 120,
        justifyContent: "space-between",
        paddingVertical: 10,
        width: "100%",
    },
    //endregion

    ChangePasswordGroup: {
        alignSelf: "center",
        height: "70%",
        justifyContent: "space-evenly",
        marginTop: 20,
        width: "100%",
    },

    AmountText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20
    },

    ReceiptTitleText: {
        fontSize: 16,
        fontWeight: "bold",
    },

    CardInputBoeder: {
        borderWidth: 1,
        borderColor: colors.darkGrey,
        borderRadius: 5
    },

    tagSelect: {
        flex: 1,
        backgroundColor: 'green',
        borderColor: 'green',
        borderWidth: 1,
        margin: 10,
    },

    tagUnselect: {
        flex: 1,
        backgroundColor: 'white',
        borderColor: 'green',
        borderWidth: 1,
        margin: 10,
    },

    tagTextSelect: {
        textAlign: 'center',
        color: 'white',
    },

    tagTextUnselect: {
        textAlign: 'center',
        color: 'green',
    },

    input: {
        borderWidth: 1,
        borderColor: 'grey',
        paddingLeft: 5,
        paddingRight: 5,
        paddingVertical: 2
    },

    inputContainer: {
        flexDirection: 'row',
        allignItems: 'center',
    }


})
