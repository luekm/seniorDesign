import React from 'react';
import {SafeAreaView, Text, View, TextInput, Button, ScrollView} from "react-native";
import {Logo} from "../shared/Components";
import {styles} from "../shared/Styles";
import {colors} from "../shared/Colors";
import EntryButtons from '../../components/EntryButtons';
import DateTimePicker from '@react-native-community/datetimepicker';
import SelectDropdown from 'react-native-select-dropdown'
import { useState } from 'react';

export interface AnnualCheckupScreenParams{

}

function AnnualScreen(props: any) {
    let params = props.route.params as  AnnualCheckupScreenParams
 const [date, setDate] = useState(new Date());
   const [mode, setMode] = useState('date');
   const [show, setShow] = useState(false);

   const onChange = (event, selectedDate) => {
     const currentDate = selectedDate;
     setShow(false);
     setDate(currentDate);
   };

   const showMode = (currentMode) => {
     setShow(true);
     setMode(currentMode);
   };

   const showDatepicker = () => {
     showMode('date');
   };

   const showTimepicker = () => {
     showMode('time');
   };

   const savedPets = [];
   const coatColors = ["Black","White","Brown","Yellow"];

   const [lastName, setLastName] = React.useState('');
   const [firstName, setFirstName] = React.useState('');
   const [address, setAddress] = React.useState('');
   const [zip, setZip] = React.useState('');
   const [cityState, setCityState] = React.useState('');
   const [cellPhoneNum, setCellPhoneNum] = React.useState('');
   const [petName, setPetName] = React.useState('');
   const [petBreed, setPetBreed] = React.useState('');
   const [petSex, setPetSex] = React.useState('');



    return (

        <SafeAreaView style={{ ...styles.background, justifyContent: "space-evenly" }}>
            <Logo />
            <View style={{height : 20}}/>
            <ScrollView style={{paddingRight: 25}}>
            <Text style={{fontWeight: 'bold'}}>PERSONAL INFO </Text>

            <Text>Last Name </Text>
                 <TextInput
                   style={[styles.input]}
                  onChangeText={setLastName}
                  value={lastName}
                />

                <Text>First Name </Text>
                 <TextInput
                       style={styles.input}
                       onChangeText={setFirstName}
                       value={firstName}
                 />
                  <Text>Cell Phone Number </Text>
                                  <TextInput
                                        style={styles.input}
                                        onChangeText={setCellPhoneNum}
                                        value={cellPhoneNum}
                                  />
                <Text>Address </Text>
                  <TextInput
                        style={styles.input}
                        onChangeText={setAddress}
                        value={address}
                  />

                  <Text>Zip code </Text>
                       <TextInput
                        style={styles.input}
                         onChangeText={setZip}
                         value={zip}
                         keyboardType="numeric"
                      />

                  <Text style={{fontWeight: 'bold'}}>PET INFO </Text>
                  <Text>Select pet or manually input </Text>
                   <SelectDropdown
                                  data={savedPets}
                                  onSelect={(selectedPet, index) => {
                                      console.log(selectedPet,index)
                                      }}
                                      buttonTextAfterSelection={(selectedPet,index) => {
                                          return selectedCoat
                                      }}
                                      />
                  <Text>Pet Name </Text>
                  <TextInput
                   style={styles.input}
                     onChangeText={setPetName}
                     value={petName}
                  />

                <Text>Pet Breed </Text>
                                  <TextInput
                                   style={styles.input}
                                     onChangeText={setPetBreed}
                                     value={petBreed}
                                  />
                <Text> Coat Color </Text>
                <SelectDropdown
                data={coatColors}
                onSelect={(selectedCoat, index) => {
                    console.log(selectedCoat,index)
                    }}
                    buttonTextAfterSelection={(selectedCoat,index) => {
                        return selectedCoat
                    }}
                    />

                 <Text> Sex </Text>
                    <TextInput
                                   style={styles.input}
                                     onChangeText={setPetSex}
                                     value={petSex}
                                  />
            <Button onPress={showDatepicker} title="Select Date" />
                 <Button onPress={showTimepicker} title="Select Time" />
                  {show && (
                    <DateTimePicker style={{}}
                      testID="dateTimePicker"
                      value={date}
                      mode={mode}
                      is24Hour={true}
                      onChange={onChange}
                    />
                  )}
                  <Text>Selected Date: {date.toLocaleString()}</Text>



                <View style={{height: 20}}/>
            <Button title="Schedule Appointment" onPress={() => {}} />
          </ScrollView>
        </SafeAreaView>
    );
}

export default AnnualScreen;
