import React, {useEffect, useState} from 'react'
import { Linking, SectionList, StatusBar, ScrollView, StyleSheet, View, TextInput, Pressable, Alert} from "react-native"
import {Button, Card, Text} from '@ui-kitten/components'
import * as Location from 'expo-location'
import {useFocusEffect} from "@react-navigation/native"
import {BASE_URL} from "../shared/Constants"
import {styles} from "../shared/Styles"
import ApiCalendar from "react-google-calendar-api";
import CalendarPicker from "react-native-calendar-picker";
import * as Calendar from "expo-calendar"
import { VictoryBar, VictoryChart, VictoryTheme, VictoryAxis, VictoryLegend } from "victory-native";
// import Stomp from "@stomp/stompjs";
import Stomp from "stompjs";
import SockJS from "sockjs-client";


export interface HomeScreenParams {
    time: String
    userId: String
}

function CalendarScreen(props: any) {
    const [date, setDate] = useState(null);
    const [events, setEvents] = useState<EventData[]>([]);
    const [chartData, setChartData] = useState([]);
    const [stompClient, setStompClient] = useState(null);
    var eventCount;
    const params = props.route.params as HomeScreenParams;
    console.log("params:")
    console.log(params);

    useEffect(() => {

//       const socket = new SockJS(BASE_URL + "/ws");
//       const client = Stomp.over(socket);
//
//       client.connect({}, () => {
//         console.log(client.state)
//         client.subscribe("/topic/messages", (message) => {
// //             console.log(client.status)
//             const receivedMessage = message.body;
//             console.log(receivedMessage);
//             createAuthAlert(receivedMessage)
//         });
// //         console.log("choke on my balls")
//         getCalendar();
//       });
// //       console.log("AA")
//       setStompClient(client);
//       while(client.state !== "ACTIVE")
//       {
// //         console.log("not connected yet")
//       }
//       console.log("connected")
      //client.send("topic/messages", "boolin")
      getCalendar();

//       return () => {
//         client.disconnect();
//       }
      //console.log("using effect woah");


    }, []);

    interface EventData {
            title: string;
            start: string;
            end: string;
        }


    const times = [
        "00:00",
        "01:00",
        "02:00",
        "03:00",
        "04:00",
        "05:00",
        "06:00",
        "07:00",
        "08:00",
        "09:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00"
    ].reverse();

    function createAuthAlert(url){
        Alert.alert('Alert', 'Allow VetGo to access your Google Account?', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {text: 'OK', onPress: () => {
               Linking.openURL(url)
//             WebView webview = (WebView)findViewById(R.id.webView);
//             webview .setWebViewClient(new WebViewClient());
//             webView.loadUrl("https://...");
          },},
        ]);
    }

    async function getCalendar() {
//         console.log("getting...");
        var theDay = new Date(params.time);
        console.log(theDay);
        let d = theDay.getDate() + 1; // days are 0 indexed
        let m = theDay.getMonth() + 1; // months are 0 indexed
        let y = theDay.getFullYear();
        setDate(d+"/"+m+"/"+y);
        let url = BASE_URL + "/calendar/getEvents/user" + params.userId+ "/" + y + "/" + m + "/" + Number(d);
        console.log(url);
        const response = await fetch(url, {
            method: 'GET',
        }).then((response) => response.text())//response is a list, then dict or something [i].
        .then((response) => {
                console.log(response);
                var eventsData = response.substring(1,response.length-1).split(", ");
                let numEvents = eventsData.length / 3;
                if(response == "[]") {
                    console.log("no events to display");
                    numEvents = 0;
                }
                console.log("numevents: " +numEvents);
                 let tmplist = [];
                for(var i = 0; i < numEvents * 3; i+=3) {
                    let nextEvent: EventData = {title: eventsData[i],
                                                start: eventsData[i+1].substring(11,16),
                                                end: eventsData[i+2].substring(11,16)};
//                     console.log(nextEvent);
                    tmplist.push(nextEvent);
                    //data.push(nextEvent);
                    events.push(nextEvent);
//                     console.log(nextEvent);
                }
                setEvents(tmplist);
//                 console.log("events");
//                 console.log(events);

//                 console.log(numEvents) // WHY CANT I GE THISSSS AAAA
                let tempData = []
                console.log(events)
                for(i = 0; i < numEvents; i++){
//                     console.log("event #" + i);
//                     console.log(events[0]);
//                     data.push({ x: i, y: i+1, y0: i+2});
                    let startMins = Number(events[i].start.substring(3,5)) / 60.0;
                    let startVal = 24 - (Number(events[i].start.substring(0,2)) + startMins)
                    let endMins = Number(events[i].end.substring(3,5)) / 60.0;
                    let endVal = 24 - (Number(events[i].end.substring(0,2)) + endMins);
//                     console.log(startMins + " -> " + endMins);
                    tempData.push({ x: i+1  , y: startVal, y0: endVal });
                }
                if(theDay.hours) {
                    let hours = theDay.hours()
                    tempData.push({ x: 2, y: hours, y0: hours + 1})
                }
                else {
                    console.error("Warning: no appointment time provided, default value provided")
                    tempData.push({ x: 0, y: 11, y0: 12})
                }
                //tempData.push({x: 0, y:})
                setChartData(tempData);
                console.log(chartData);
//                 console.log("done");
        })
        .catch((error) => console.error(error.message));
    }

    var data = [
      { x: 2, y: 3 },
    ];

    return (
        <>
        <View style={myStyles.container}>
            <Text> My Calendar </Text>
            <Text> {date} </Text>


{/*               <Button onPress={oauthSignIn} > */}
{/*                 <Text> oauth thingy </Text> */}
{/*               </Button> */}

            <View style={vicstyles.container}>
                <VictoryChart width={300} height={600} domainPadding={10} theme={VictoryTheme.material}>
                    <VictoryLegend x={50} y={50}
                      	title="Legend"
                        centerTitle
                        orientation="horizontal"
                        gutter={20}
                        style={{ title: {fontSize: 15 } }}
                        data={[
                          { name: "Appointment", symbol: { fill: "#0000FF"} },
                          { name: "From Your Calendar", symbol: { fill: "#c43a31" } },
                        ]}
                      />
                    <VictoryBar
                        data={chartData}
                        style={{
                              data: {
                                fill: ({ datum }) => datum.x === 0 ? "#0000FF" : "#c43a31",
                              }
                            }}
                        alignment="start"
                    />
                    <VictoryAxis dependentAxis

                        tickValues={times}
                        domain={{times}}
                        orientation="left"
                    />
                    <VictoryAxis
                        style={{
                            axis: {stroke: "transparent"},
                            ticks: {stroke: "transparent"},
                            tickLabels: { fill:"transparent"}
                        }}
                        orientation="bottom"
                        domain = {[0,chartData.length]}
                    />

                </VictoryChart>
            </View>

        </View>
        </>
    );
    //<Button title={"See events"} onPress={getEvents} />
}
export default CalendarScreen;

const vicstyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff"
  }
});

const myStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  focusItem: {
    backgroundColor: '#cccccc',
    padding: 20,
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
  },
});