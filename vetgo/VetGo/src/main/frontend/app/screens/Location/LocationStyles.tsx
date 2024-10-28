import {StyleSheet} from "react-native"
import {colors} from "../shared/Colors"

export const locationStyles: any = StyleSheet.create({
    background: {
        backgroundColor: "#fefafd",
        flex: 1,
        justifyContent: "flex-start", //main axis - currently col
        alignItems: "center", // secondary axis
        alignContent: "center", //only takes effect when wrapping occur
    },
    descriptionBox: {
        fontSize: 20,
        fontWeight: "normal",
        width: "100%",
        height: 50,
        borderWidth: 1,
        borderRadius: 3,
        backgroundColor: "#ffffff",
    },
    container: {
        flex: 1,
        width: "80%",
        justifyContent: "flex-start",
        alignItems: "center",

        marginVertical: 15,
    },
    create: {
        backgroundColor: "#68FD53",
        borderColor: "#68FD53",

        width: 230,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",

        margin: 5,
        padding: 15,
    },
    errorText: {
        color: "red",
        fontSize: 16,
        paddingTop: 2,
        paddingBottom: 4,
        flexShrink: 1
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
    },

})
