import React, { useEffect, useMemo, useRef, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TextInput, Pressable, Alert } from "react-native"
import { BASE_URL } from "../shared/Constants"
import { styles } from "../shared/Styles"
import { colors } from "../shared/Colors"
import { IndexPath, Input, Select, SelectItem, Button, CheckBox, Radio, Layout } from "@ui-kitten/components"
import { EditPetScreenNavigationProp, EditPetScreenRouteProp } from '../../utils/props'
import { UserDetailsParams, UserDetails_Location, UserDetails_User } from '../../utils/params'
import { HistoryFormScreenParams } from '../CreatePet/CreateHistoryFormScreen'
import Textfield from '../../components/Textfield'
import { Buffer } from 'buffer'
import { LocationInterface } from '../shared/Interfaces'
import { HomeScreenParams } from '../Home/HomeScreen'
import ClientNavbar from '../../components/ClientNavbar'
import { FontAwesome5 } from '@expo/vector-icons'


export interface EditPetScreenParams {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface,
    petId: string
}

interface EditPetForm {
    name: string, age: number, weight: number, height: number, type: string, sex: boolean, breed: string, microchip_manufacturer: string, microchip_id: string, declawed: boolean, inOrOutdoor: boolean, birthMonth: string, birthDay: string, birthYear: string
}
interface EditPetErrors {
    name: string, age: string, weight: string, height: string, type: string, sex: string, breed: string, microchip_manufacturer: string, microchip_id: string, declawed: string, inOrOutdoor: string, birthDay: string, birthYear: string
}

function EditPetScreen(props: { route: EditPetScreenRouteProp, navigation: EditPetScreenNavigationProp }) {

    const params: EditPetScreenParams = props.route.params as EditPetScreenParams
    const titles = ['DOG', 'CAT', 'BIRD', 'REPTILE', 'FISH', 'RODENT', 'OTHER']
    const birthMonthOptions = ['January', 'February', 'March', 'April','May','June','July','August','September','October','November','December']
    const birthDayOptions = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','23','24','25','26','27','28','29','30','31']
    const birthYearOptions = ['1980','1981','1982','1983','1984','1985','1986','1987','1988','1989','1990','1991','1992','1993','1994','1995','1996','1997','1998','1999','2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016','2017','2018','2019','2020','2021','2022','2023','2024']
    const [petForm, setPetForm] = useState<EditPetForm>({ name: "", age: 0, weight: 0, height: 0, type: titles[0], sex: true, breed: "", microchip_manufacturer: "", microchip_id: "", declawed: true, inOrOutdoor: true, birthMonth: birthMonthOptions[0], birthDay: birthDayOptions[0], birthYear: birthYearOptions[0] })
    const [errors, setErrors] = useState<EditPetErrors>({ name: "", age: "", weight: "", height: "", type: "", sex: "", breed: "", microchip_manufacturer: "", microchip_id: "", declawed: "", inOrOutdoor: "", birthDay: "", birthYear: "" })
    const isSubmittingRef = useRef<boolean>(false)

    const [selectedIndex, setSelectedIndex] = useState<IndexPath>(new IndexPath(0))
    const [selectedDeclawedIndex, setSelectedDeclawedIndex] = useState<IndexPath>(new IndexPath(0))
    const [selectedInOrOutIndex, setSelectedInOrOutIndex] = useState<IndexPath>(new IndexPath(0))
    const [selectedMonthIndex, setSelectedMonthIndex] = useState<IndexPath>(new IndexPath(0))
    const [selectedDayIndex, setSelectedDayIndex] = useState<IndexPath>(new IndexPath(0))
    const [selectedYearIndex, setSelectedYearIndex] = useState<IndexPath>(new IndexPath(0))

    //     let curPet = params.petID
    //     const [pets, setPets] = useState<any[]>(params.pets)
    //
    //     const [errors, setError] = useState<any>({})
    //     const [newPet, setNewPet] = useState(false)

    useEffect(() => {
        fetchAndHydratePetData()
    }, [])


    const fetchAndHydratePetData = async () => {
        let url = BASE_URL + "/pet/get/" + params.petId
        let petData = await (await fetch(url)).json()
        setPetForm({
            name: petData.name,
            age: petData.age,
            weight: petData.weight,
            height: petData.height,
            type: petData.petType,
            sex: petData.male,
            breed: petData.petBreed,
            microchip_id: petData.microchip_id,
            microchip_manufacturer: petData.microchip_manufacturer,
            declawed: petData.declawed,
            inOrOutdoor: petData.indoor,
            birthMonth: petData.birthMonth,
            birthDay: petData.birthDay,
            birthYear: petData.birthYear
        })
        console.log(petData.male)
        setSelectedIndex(new IndexPath(titles.indexOf(petData.petType) == -1 ? 0 : titles.indexOf(petData.petType)))
        setSelectedMonthIndex(new IndexPath(birthMonthOptions.indexOf(petData.birthMonth) == -1 ? 0 : birthMonthOptions.indexOf(petData.birthMonth)))
        setSelectedDayIndex(new IndexPath(birthDayOptions.indexOf(petData.birthDay) == -1 ? 0 : birthDayOptions.indexOf(petData.birthDay)))
        setSelectedYearIndex(new IndexPath(birthYearOptions.indexOf(petData.birthYear) == -1 ? 0 : birthYearOptions.indexOf(petData.birthYear)))
    }

    //     if (curPet == -1) {
    //         pets.push({
    //             age: 0, height: 0, is_male: 1, name: "", pet_type: 0, pet_breed: 'Labrador Retreiver', pid: Buffer.from([0]), weight: 0,
    //             owner_id: Buffer.from([0]),
    //             allergies: null,
    //             changes_in_behavior: null,
    //             diet: null,
    //             medications: null,
    //             previous_medical_history: null,
    //             vaccination_records: null
    //         })
    //         curPet = pets.length - 1
    //         params.petID = curPet
    //         setNewPet(true)
    //     }
    // console.log(curPet)
    //     const [name, setName] = useState<string>(pets[curPet].name)
    //     const [age, setAge] = useState<number>(pets[curPet].age)
    //     const [weight, setWeight] = useState<number>(pets[curPet].weight)
    //     const [height, setHeight] = useState<number>(pets[curPet].height)
    //     const [type, setType] = useState(pets[curPet]['petType'] ?? titles[0])
    //     const [breed, setBreed] = useState<string>(pets[curPet]['petBreed'])
    //
    //     const [sex, setSex] = useState<boolean>(Boolean(pets[curPet].is_male ?? true))
    //     const [isSubmit, setSubmit] = useState(false)


    //     const handleSubmit = async (event) => {
    //         // event.preventDefault();
    //         let isValid = validate()
    //         setError(!!isValid)
    //         setSubmit(true)
    //     }
    const handleSubmit = async () => {
        console.log(errors)
        if (isSubmittingRef.current)
            return

        let isValid: boolean = validate()
        if (isValid) {
            submitEditPet()
        }
    }

    async function editHistory() {
        let historyFormParams: HistoryFormScreenParams = {
            ...params
        }
        props.navigation.navigate("HistoryForm", historyFormParams)
    }

    //     useEffect(() => {
    //         if (isSubmit) {
    //             checkInfoIsValid()
    //         }
    //     }, [errors])

    // TODO: check if number is valid
    function validate(): boolean {
        setErrors({ name: "", age: "", weight: "", height: "", type: "", sex: "", breed: "", microchip_manufacturer: "", microchip_id: "", declawed: "", inOrOutdoor: "", birthMonth: "", birthDay: "", birthYear: "" })
        // let errors: any = {};
        let isValid = true
        if (!petForm.name) {
            setErrors((prevState: EditPetErrors) => ({ ...prevState, name: "Pet name is required!" }))
            isValid = false
            // errors.name = "Pet name is required!";
        }
        if (!petForm.type) {
            setErrors((prevState: EditPetErrors) => ({ ...prevState, type: "Pet type is required!" }))
            isValid = false
            // errors.type = "Pet type is required!";
        }
        if (petForm.age == 0) {
            setErrors((prevState: EditPetErrors) => ({ ...prevState, age: "Pet age is required!" }))
            isValid = false
            // errors.age = "Pet age is required!";
        } else {
            // try {
            //     Number.parseInt(petForm.age, 10)
            // } catch (error) {
            //     setErrors((prevState: EditPetErrors) => ({ ...prevState, age: "Please enter a valid age." }))
            //     isValid = false
            //     // errors.age = "Please enter a valid age.";
            // }
        }
        if (petForm.weight == 0) {
            setErrors((prevState: EditPetErrors) => ({ ...prevState, weight: "Pet weight is required!" }))
            isValid = false
            // errors.weight = "Pet weight is required!";
        } else {
            // try {
            //     Number.parseInt(petForm.weight, 10)
            // } catch (error) {
            //     setErrors((prevState: EditPetErrors) => ({ ...prevState, weight: "Please enter a valid weight." }))
            //     isValid = false
            //     // errors.weight = "Please enter a valid weight.";
            // }
        }
        if (petForm.height == 0) {
            setErrors((prevState: EditPetErrors) => ({ ...prevState, height: "Pet height is required!" }))
            isValid = false
            // errors.height = "Pet height is required!";
        } else {
            // try {
            //     Number.parseInt(petForm.height, 10)
            // } catch (error) {
            //     setErrors((prevState: EditPetForm) => ({ ...prevState, height: "Please enter a valid height." }))
            //     isValid = false
            //     // errors.height = "Please enter a valid height.";
            // }
        }
        if (!petForm.microchip_manufacturer) {
            setErrors((prevState: EditPetErrors) => ({ ...prevState, microchip_manufacturer: "Microchip manufacturer is required, if not chipped write 'N/A'"}))
            isValid = false
        }
        else if (petForm.microchip_manufacturer == "N/A") {
            // email doctor to get a chip
        }
        else {

        }
        if (!petForm.microchip_id) {
            setErrors((prevState: EditPetErrors) => ({ ...prevState, microchip_id: "Microchip ID is required, if not chipped write 'N/A'"}))
            isValid = false
        }
        else {

        }
        if (Number(petForm.birthYear) == 0) {
            setErrors((prevState: EditPetErrors) => ({ ...prevState, birthYear: "Birth year is required!"}))
            isValid = false
        }
        else if (Number(petForm.birthYear) > 2024) {
            setErrors((prevState: EditPetErrors) => ({ ...prevState, birthYear: "Valid birth year is required!"}))
            isValid = false
        }
        else {

        }
        if (Number(petForm.birthDay) == 0) {
            setErrors((prevState: EditPetErrors) => ({ ...prevState, birthDay: "Birth day is required!"}))
            isValid = false
        }
        else if (Number(petForm.birthDay) > 29 && petForm.birthMonth == "February" && (Number(petForm.birthYear) % 4 != 0)) {
            setErrors((prevState: EditPetErrors) => ({ ...prevState, birthDay: "Valid birth day is required!"}))
            isValid = false
        }
        else if (Number(petForm.birthDay) > 28 && petForm.birthMonth == "February") {
            setErrors((prevState: EditPetErrors) => ({ ...prevState, birthDay: "Valid birth day is required!"}))
            isValid = false
        }
        else if (Number(petForm.birthDay) > 30 && (petForm.birthMonth == "April" || petForm.birthMonth == "June" || petForm.birthMonth == "September" || petForm.birthMonth == "November")) {
            setErrors((prevState: EditPetErrors) => ({ ...prevState, birthDay: "Valid birth day is required"}))
            isValid = false
        }
        else if (Number(petForm.birthDay) > 31) {
            setErrors((prevState: EditPetErrors) => ({ ...prevState, birthDay: "Valid birth day is required"}))
            isValid = false
        }
        else {
            
        }

        return isValid
    }

    async function submitEditPet() {
        //         if (Object.keys(errors).length < 1 && isSubmit) {
        //             if (newPet) {
        //                 let url = BASE_URL + "/pet/add/" + params.user.id
        //
        //                 let res = await fetch(url, {
        //                     method: 'POST',
        //                     headers: {
        //                         'Accept': 'application/json',
        //                         'Content-Type': 'application/json'
        //                     },
        //                     body: JSON.stringify({
        //                         "age": age,
        //                         "height": height,
        //                         "isMale": Number(sex),
        //                         "name": name,
        //                         "owner": params.user.id,
        //                         "petType": titles.indexOf(type),
        //                         "petBreed": breed,
        //                         "weight": weight,
        //                         "pid": null,
        //                         "appointments": null
        //                     }),
        //                 })
        //                 console.log(" " + name + type + breed + age + height + weight + sex)
        //             } else {
        let url = BASE_URL + "/pet/update/" + params.petId

        let res = await fetch(url, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "age": petForm.age,
                "height": petForm.height,
                "isMale": Number(petForm.sex),
                "name": petForm.name,
                "owner": params.userId,
                "petType": titles.indexOf(petForm.type),
                "petBreed": petForm.breed,
                "weight": petForm.weight,
                "microchip_manufacturer": petForm.microchip_manufacturer,
                "microchip_id": petForm.microchip_id,
                "isDeclawed": Number(petForm.declawed),
                "isIndoor": Number(petForm.inOrOutdoor),
                "birthMonth": petForm.birthMonth,
                "birthDay": (birthDayOptions.indexOf(petForm.birthDay) + 1),
                "birthYear": (birthYearOptions.indexOf(petForm.birthYear) + 1980),
                "pid": params.petId,
                "appointments": null
            }),
        })
        //         }
        props.navigation.navigate("Home", { ...params } as HomeScreenParams)
        //         props.navigation.navigate("ClientHome", { user: params.user, location: params.location })
        //         }
    }

    function back() {
        // pets.pop()
        let homeScreenParams: HomeScreenParams = {
            ...params
        }
        props.navigation.navigate("Home", homeScreenParams)
    }


    const displayValue = (index: IndexPath) => {
        // convert titles[index.row] to title case
        return titles[index.row].charAt(0).toUpperCase() + titles[index.row].slice(1).toLowerCase()
    }

    const updatePetType = (index: IndexPath) => {
        setPetForm((prevState: EditPetForm) => ({ ...prevState, type: titles[index.row] }))
        // setType(titles[index.row])
        setSelectedIndex(index)
    }

    const displayMonthValue = (index: IndexPath) => {
        // convert declawed[index.row] to title case
        return birthMonthOptions[index.row].charAt(0).toUpperCase() + birthMonthOptions[index.row].slice(1).toLowerCase()
    }

    const updateMonth = (index: IndexPath) => {
        setPetForm((prevState: EditPetForm) => ({ ...prevState, type: birthMonthOptions[index.row] }))
        // setType(titles[index.row])
        setSelectedMonthIndex(index)
    }

    const displayDayValue = (index: IndexPath) => {
        // convert declawed[index.row] to title case
        return birthDayOptions[index.row]
    }

    const updateDay = (index: IndexPath) => {
        setPetForm((prevState: EditPetForm) => ({ ...prevState, type: birthDayOptions[index.row] }))
        // setType(titles[index.row])
        setSelectedDayIndex(index)
    }

    const displayYearValue = (index: IndexPath) => {
        // convert declawed[index.row] to title case
        return birthYearOptions[index.row]
    }

    const updateYear = (index: IndexPath) => {
        setPetForm((prevState: EditPetForm) => ({ ...prevState, type: birthYearOptions[index.row] }))
        // setType(titles[index.row])
        setSelectedYearIndex(index)
    }

    return (
        <ScrollView>
        <SafeAreaView style={styles.background}>
            <View style={{ width: "80%" }}>

                <Text style={styles.header}> Edit Pet </Text>
                <View>

                    <Text> Name </Text>
                    <Textfield
                        value={petForm.name!}
                        placeholder={petForm.name!}
                        onChangeText={(newName: string) => {
                            setPetForm((prevState: EditPetForm) => ({ ...prevState, name: newName }))
                            //                             setName(name)
                        }}
                    />
                    <Text style={styles.errorText}>{errors.name}</Text>
                    <Text> Birthday </Text>
                    <Layout
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}
                            level='1'
                    >
                            <Select
                                selectedIndex={selectedMonthIndex}
                                onSelect={index => index instanceof IndexPath ? updateMonth(index) : null}
                                value={displayMonthValue(selectedMonthIndex)}
                                style={{ width: "40%" }}
                            >
                                <SelectItem title='Jan'/>
                                <SelectItem title='Feb'/>
                                <SelectItem title='Mar'/>
                                <SelectItem title='April'/>
                                <SelectItem title='May'/>
                                <SelectItem title='June'/>
                                <SelectItem title='July'/>
                                <SelectItem title='Aug'/>
                                <SelectItem title='Sept'/>
                                <SelectItem title='Oct'/>
                                <SelectItem title='Nov'/>
                                <SelectItem title='Dec'/>   
                            </Select>
                            
                            <Select
                                selectedIndex={selectedDayIndex}
                                onSelect={index => index instanceof IndexPath ? updateDay(index) : null}
                                value={displayDayValue(selectedDayIndex)}
                                style={{ width: "30%" }}
                            >
                                <SelectItem title='1'/>
                                <SelectItem title='2'/>
                                <SelectItem title='3'/>
                                <SelectItem title='4'/>
                                <SelectItem title='5'/>
                                <SelectItem title='6'/>
                                <SelectItem title='7'/>
                                <SelectItem title='8'/>
                                <SelectItem title='9'/>
                                <SelectItem title='10'/>
                                <SelectItem title='11'/>
                                <SelectItem title='12'/>
                                <SelectItem title='13'/>
                                <SelectItem title='14'/>
                                <SelectItem title='15'/>
                                <SelectItem title='16'/>
                                <SelectItem title='17'/>
                                <SelectItem title='18'/>
                                <SelectItem title='19'/>
                                <SelectItem title='20'/>
                                <SelectItem title='21'/>
                                <SelectItem title='22'/>
                                <SelectItem title='23'/>
                                <SelectItem title='24'/>
                                <SelectItem title='25'/>
                                <SelectItem title='26'/>
                                <SelectItem title='27'/>
                                <SelectItem title='28'/>
                                <SelectItem title='29'/>
                                <SelectItem title='30'/>
                                <SelectItem title='31'/>
                            </Select>

                            <Select
                                selectedIndex={selectedYearIndex}
                                onSelect={index => index instanceof IndexPath ? updateYear(index) : null}
                                value={displayYearValue(selectedYearIndex)}
                                style={{ width: "30%" }}
                            >
                                <SelectItem title='1980'/>
                                <SelectItem title='1981'/>
                                <SelectItem title='1982'/>
                                <SelectItem title='1983'/>
                                <SelectItem title='1984'/>
                                <SelectItem title='1985'/>
                                <SelectItem title='1986'/>
                                <SelectItem title='1987'/>
                                <SelectItem title='1988'/>
                                <SelectItem title='1989'/>
                                <SelectItem title='1990'/>
                                <SelectItem title='1991'/>
                                <SelectItem title='1992'/>
                                <SelectItem title='1993'/>
                                <SelectItem title='1994'/>
                                <SelectItem title='1995'/>
                                <SelectItem title='1996'/>
                                <SelectItem title='1997'/>
                                <SelectItem title='1998'/>
                                <SelectItem title='1999'/>
                                <SelectItem title='2000'/>
                                <SelectItem title='2001'/>
                                <SelectItem title='2002'/>
                                <SelectItem title='2003'/>
                                <SelectItem title='2004'/>
                                <SelectItem title='2005'/>
                                <SelectItem title='2006'/>
                                <SelectItem title='2007'/>
                                <SelectItem title='2008'/>
                                <SelectItem title='2009'/>
                                <SelectItem title='2010'/>
                                <SelectItem title='2011'/>
                                <SelectItem title='2012'/>
                                <SelectItem title='2013'/>
                                <SelectItem title='2014'/>
                                <SelectItem title='2015'/>
                                <SelectItem title='2016'/>
                                <SelectItem title='2017'/>
                                <SelectItem title='2018'/>
                                <SelectItem title='2019'/>
                                <SelectItem title='2020'/>
                                <SelectItem title='2021'/>
                                <SelectItem title='2022'/>
                                <SelectItem title='2023'/>
                                <SelectItem title='2024'/>
                                <SelectItem title='2025'/>
                            </Select>

                        </Layout>
                        <Text style={styles.errorText}>{errors.birthMonth}</Text>
                        <Text style={styles.errorText}>{errors.birthDay}</Text>
                        <Text style={styles.errorText}>{errors.birthYear}</Text>
                    <View style={{ marginBottom: 20 }}>
                        <Text> Animal Type </Text>
                        <Select
                            selectedIndex={selectedIndex}
                            onSelect={index => index instanceof IndexPath ? updatePetType(index) : null}
                            value={displayValue(selectedIndex)}
                            style={{ width: "100%" }}
                        >
                            <SelectItem title='Dog' />
                            <SelectItem title='Cat' />
                            <SelectItem title='Bird' />
                            <SelectItem title='Reptile (Snake, Iguana, etc.)' />
                            <SelectItem title='Fish' />
                            <SelectItem title='Rodent (Hamster, Guinea Pig, etc.)' />
                            <SelectItem title='Other' />
                        </Select>
                    </View>
                    <Text> Breed </Text>
                    <Textfield
                        value={petForm.breed!}
                        placeholder={petForm.breed!}
                        onChangeText={(newBreed: string) => {
                            setPetForm((prevState: EditPetForm) => ({ ...prevState, breed: newBreed }))
                            //                             setBreed(breed)
                        }}
                    />
                    <Text style={styles.errorText}>{errors.type}</Text>

                    <View>
                        <Text> Declawed? </Text>
                        <Layout
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}
                            level='1'
                        >
                            <Radio
                                style={{ margin: 2 }}
                                checked={petForm.declawed}
                                onChange={(nextChecked) => {

                                    setPetForm((prevState: EditPetForm) => ({ ...prevState, declawed: true }))
                                    //                                 setDeclawed(true)
                                }
                                }
                            >
                                Yes
                            </Radio>
                            <Radio
                                style={{ margin: 2 }}
                                checked={!petForm.declawed}
                                onChange={nextChecked => {

                                    setPetForm((prevState: EditPetForm) => ({ ...prevState, declawed: false }))
                                    //                             setDeclawed(false)
                                }}
                            >
                                No
                            </Radio>
                        </Layout>
                    </View>
                    <Text style={styles.errorText}>{errors.declawed}</Text>
                    <View>
                        <Text> Indoor or Outdoor Pet</Text>
                        <Layout
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}
                            level='1'
                        >
                            <Radio
                                style={{ margin: 2 }}
                                checked={petForm.inOrOutdoor}
                                onChange={(nextChecked) => {

                                    setPetForm((prevState: EditPetForm) => ({ ...prevState, inOrOutdoor: true }))
                                    //                                 setIndoorOrOutdoor(true)
                                }
                                }
                            >
                                Indoor
                            </Radio>
                            <Radio
                                style={{ margin: 2 }}
                                checked={!petForm.inOrOutdoor}
                                onChange={nextChecked => {

                                    setPetForm((prevState: EditPetForm) => ({ ...prevState, inOrOutdoor: false }))
                                    //                             setIndoorOrOutdoor(false)
                                }}
                            >
                                Outdoor
                            </Radio>
                        </Layout>
                    </View>
                    <Text style={styles.errorText}>{errors.type}</Text>
                    
                    <Text> Age (years) </Text>
                    <Textfield
                        value={petForm.age.toString()}
                        placeholder={petForm.age.toString()}
                        onChangeText={(newAge: number) => {
                            setPetForm((prevState: EditPetForm) => ({ ...prevState, age: newAge }))
                            //                             setAge(Number(age))
                        }}
                    />
                    <Text style={styles.errorText}>{errors.age}</Text>

                    <Text> Approximate Weight (lb) </Text>
                    <Textfield
                        value={petForm.weight.toString()}
                        placeholder={petForm.weight.toString()}
                        onChangeText={(newWeight: number) => {
                            setPetForm((prevState: EditPetForm) => ({ ...prevState, weight: newWeight }))
                            //                             setWeight(Number(weight))
                        }}
                    />
                    <Text style={styles.errorText}>{errors.weight}</Text>

                    <Text> Approximate Height (in) </Text>
                    <Textfield
                        value={petForm.height.toString()}
                        placeholder={petForm.height.toString()}
                        onChangeText={(newHeight: number) => {
                            setPetForm((prevState: EditPetForm) => ({ ...prevState, height: newHeight }))
                            //                             setHeight(Number(height))
                        }}
                    />
                    <Text style={styles.errorText}>{errors.height}</Text>
                    <View style={{ marginLeft: 5 }}>
                        <Text style={{ marginBottom: 10, marginTop: -20 }}>Sex</Text>
                        <Layout
                            style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                            }}
                            level='1'
                        >
                            <Radio
                                style={{ margin: 2 }}
                                checked={petForm.sex}
                                onChange={(nextChecked) => {

                                    setPetForm((prevState: EditPetForm) => ({ ...prevState, sex: true }))
                                    //                                 setSex(true)
                                }
                                }
                            >
                                Male
                            </Radio>
                            <Radio
                                style={{ margin: 2 }}
                                checked={!petForm.sex}
                                onChange={nextChecked => {

                                    setPetForm((prevState: EditPetForm) => ({ ...prevState, sex: false }))
                                    //                             setSex(false)
                                }}
                            >
                                Female
                            </Radio>

                        </Layout>
                    </View>
                    <Text></Text>
                    <Text> Microchip Manufacturer </Text>
                    <Textfield
                        value={petForm.microchip_manufacturer}
                        placeholder={petForm.microchip_manufacturer}
                        onChangeText={(newManufacturer: string) => {
                            setPetForm((prevState: EditPetForm) => ({ ...prevState, microchip_manufacturer: newManufacturer}))
                        }}
                    />
                    <Text style={styles.errorText}>{errors.microchip_manufacturer}</Text>
                    <Text> Microchip ID </Text>
                    <Textfield
                        value={petForm.microchip_id}
                        placeholder={petForm.microchip_id}
                        onChangeText={(newMicroId: string) => {
                            setPetForm((prevState: EditPetForm) => ({ ...prevState, microchip_id: newMicroId}))
                        }}
                    />
                    <Text style={styles.errorText}>{errors.microchip_id}</Text>
                </View>
                <Button onPress={() => editHistory()}>
                        <FontAwesome5 name='plus' color={colors.blue} size={24}> Edit history form</FontAwesome5>
                    </Button>
                <View style={styles.buttonGroup}>
                    <Button style={{ ...styles.mainButton, backgroundColor: colors.green, borderColor: colors.green }} onPress={handleSubmit}>
                        <Text> Save Changes </Text>
                    </Button>
                </View>
            </View>

            <ClientNavbar navigation={props.navigation} {...params} />
        </SafeAreaView>
        </ScrollView>
    )
}

export default EditPetScreen
