import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native"
import { IndexPath, Input, Select, SelectItem, Button, CheckBox, Radio, Layout } from "@ui-kitten/components"
import { BASE_URL } from "../shared/Constants"
import { styles } from "../shared/Styles"
import { LocationInterface } from '../shared/Interfaces'
import { CheckupSummaryScreenParams } from './CheckupSummaryScreen'
import ClientNavbar from '../../components/ClientNavbar'
import { CheckupExamScreenNavigationProp, CheckupExamScreenRouteProp } from '../../utils/props'
import Textfield from '../../components/Textfield'

interface CheckEyeListItem {
    id: number;
    name: string;
    isChecked: boolean;
}

interface CheckCoatListItem {
    id: number;
    name: string;
    isChecked: boolean;
}

interface CheckSkinListItem {
    id: number;
    name: string;
    isChecked: boolean;
}

interface CheckEarListItem {
    id: number;
    name: string;
    isChecked: boolean;
}

interface CheckNoseListItem {
    id: number;
    name: string;
    isChecked: boolean;
}

interface CheckMouthAndTeethListItem {
    id: number;
    name: string;
    isChecked: boolean;
}

interface CheckHeartListItem {
    id: number;
    name: string;
    isChecked: boolean;
}

interface CheckGaitAndPostureListItem {
    id: number;
    name: string;
    isChecked: boolean;
}

export interface CheckupExamScreenParams {
    userId: string,
    userIsVet: boolean,
    location: LocationInterface,
    appointmentId: string,
    petId: string,
    heartRate: string, 
    heartItems: string, 
    heartNotes: string, 
    lungSounds: string, 
    lungNotes: string, 
    eyeItems: string, 
    tearProduction: string, 
    eyePressure: string, 
    eyelidExamination: string, 
    irisExamination: string, 
    lensExamination: string, 
    retinaExamination: string, 
    opticNerveExamination: string, 
    coatItems: string, 
    coatNotes: string, 
    skinItems: string, 
    skinNotes: string, 
    earItems: string, 
    earNotes: string, 
    noseItems: string, 
    noseNotes: string, 
    mouthAndTeethItems: string, 
    mouthNotes:string, 
    teethNotes: string, 
    gaitAndPostureItems: string, 
    gaitNotes: string, 
    postureNotes: string, 
    feetNotes: string, 
    weight: number, 
    weightMessurement: string, 
    weightAnalysis: string, 
    muscleStructureNotes: string, 
    temperature: number, 
    dietNotes: string, 
    habitNotes: string, 
    behaviorNotes: string, 
    shots: string

}

function eyeListToString(lst: CheckEyeListItem[]): string {
    const arr: string[] = [];
    for (var item of lst) {
        arr.concat(item.name);
    }
    const str = arr.join(", ");
    return str;
}

function coatListToString(lst: CheckCoatListItem[]): string {
    const arr: string[] = [];
    for (var item of lst) {
        arr.concat(item.name);
    }
    const str = arr.join(", ");
    return str;
}

function skinListToString(lst: CheckSkinListItem[]): string {
    const arr: string[] = [];
    for (var item of lst) {
        arr.concat(item.name);
    }
    const str = arr.join(", ");
    return str;
}

function earListToString(lst: CheckEarListItem[]): string {
    const arr: string[] = [];
    for (var item of lst) {
        arr.concat(item.name);
    }
    const str = arr.join(", ");
    return str;
}

function noseListToString(lst: CheckNoseListItem[]): string {
    const arr: string[] = [];
    for (var item of lst) {
        arr.concat(item.name);
    }
    const str = arr.join(", ");
    return str;
}

function mouthAndTeethListToString(lst: CheckMouthAndTeethListItem[]): string {
    const arr: string[] = [];
    for (var item of lst) {
        arr.concat(item.name);
    }
    const str = arr.join(", ");
    return str;
}

function heartListToString(lst: CheckHeartListItem[]): string {
    const arr: string[] = [];
    for (var item of lst) {
        arr.concat(item.name);
    }
    const str = arr.join(", ");
    return str;
}

function gaitAndPostureListToString(lst: CheckGaitAndPostureListItem[]): string {
    const arr: string[] = [];
    for (var item of lst) {
        arr.concat(item.name);
    }
    const str = arr.join(", ");
    return str;
}


interface CreateExamForm {
    heartRate: string, heartItems: CheckHeartListItem[], heartNotes: string, lungSounds: string, lungNotes: string, eyeItems: CheckEyeListItem[], tearProduction: string, eyePressure: string, eyelidExamination: string, irisExamination: string, lensExamination: string, retinaExamination: string, opticNerveExamination: string, coatItems: CheckCoatListItem[], coatNotes: string, skinItems: CheckSkinListItem[], skinNotes: string, earItems: CheckEarListItem[], earNotes: string, noseItems: CheckNoseListItem[], noseNotes: string, mouthAndTeethItems: CheckMouthAndTeethListItem[], mouthNotes:string, teethNotes: string, gaitAndPostureItems: CheckGaitAndPostureListItem[], gaitNotes: string, postureNotes: string, feetNotes: string, weight: number, weightMessurement: string, weightAnalysis: string, muscleStructureNotes: string, temperature: number, dietNotes: string, habitNotes: string, behaviorNotes: string, shots: string
}
interface ItemForm {
    heartItems: string, eyeItems: string, coatItems: string, skinItems: string, earItems: string, noseItems: string, mouthAndTeethItems: string, gaitAndPostureItems: string, weightAnalysis: string
}


function CheckupExamScreen(props: {route: CheckupExamScreenRouteProp, navigation: CheckupExamScreenNavigationProp}) {


    const params = props.route.params as CheckupExamScreenParams
    const weightMessurement = ['lbs', 'oz']
    const weightAnalysis = ['Obese', 'Moderately overweight', 'Slightly overweight', 'Normal weight', 'Slightly underweight', 'Moderately underweight', 'Extremely underweight']
    const [checkupExamForm, setCheckupExamForm] = useState<CreateExamForm>({heartRate: "", heartItems:[], heartNotes: "", lungSounds: "", lungNotes:"", eyeItems:[], tearProduction:"", eyePressure:"", eyelidExamination:"", irisExamination:"", lensExamination:"", retinaExamination:"", opticNerveExamination:"", coatItems:[], coatNotes:"", skinItems:[], skinNotes:"", earItems:[], earNotes:"", noseItems:[], noseNotes:"", mouthAndTeethItems:[], mouthNotes:"", teethNotes:"", gaitAndPostureItems:[], gaitNotes:"", postureNotes:"", feetNotes:"", weight:0, weightMessurement:"", weightAnalysis:"", muscleStructureNotes:"", temperature:0, dietNotes:"", habitNotes: "", behaviorNotes: "", shots: ""})
    const [itemForm, setItemForm] = useState<ItemForm>({heartItems: "", eyeItems: "", coatItems: "", skinItems: "", earItems: "", noseItems: "", mouthAndTeethItems: "", gaitAndPostureItems: "", weightAnalysis: ""})

    const [selectedWeightMessurement, setSelectedWeightMessurementIndex] = useState<IndexPath>(new IndexPath(0))
    const [selectedWeightAnalysis, setSelectedWeightAnalysisIndex] = useState<IndexPath>(new IndexPath(0))
    const [eyeList, setEyeList] = useState<CheckEyeListItem[]>([
        {id: 1, name: 'Redness', isChecked: false},
        {id: 2, name: 'Discharge', isChecked: false},
        {id: 3, name: 'Excessive tearing', isChecked: false},
        {id: 4, name: 'Abnormal bumps or lumps', isChecked: false},
        {id: 5, name: 'Cloudiness', isChecked: false},
        {id: 6, name: 'Swollen', isChecked: false},
        {id: 7, name: 'Dull', isChecked: false},
        {id: 8, name: 'Sunken in', isChecked: false},
        {id: 9, name: 'Dry', isChecked: false},
        {id: 10, name: 'One eye not centered', isChecked: false},
        {id: 11, name: 'Two eyes not centered', isChecked: false},
        {id: 12, name: 'Pupils are unequal in size', isChecked: false},
        {id: 13, name: 'Abnormal color', isChecked: false},
        {id: 14, name: 'Pupils fail to respond with BRIGHT light', isChecked: false},
        {id: 15, name: 'Pupils fail to respond to DARK', isChecked: false},
        {id: 16, name: 'Bright', isChecked: false},
        {id: 17, name: 'Moist', isChecked: false},
        {id: 18, name: 'Clear', isChecked: false},
        {id: 19, name: 'Centered between the eyelids', isChecked: false},
        {id: 20, name: 'Few visible blood vessels', isChecked: false},
        {id: 21, name: 'Pupils shrink equally', isChecked: false},
        {id: 22, name: 'Pupils enlarge equally', isChecked: false},

    ]);

    const [coatList, setCoatList] = useState<CheckCoatListItem[]>([
        {id: 1, name: 'Excessive dryness', isChecked: false},
        {id: 2, name: 'Excessive oiliness', isChecked: false},
        {id: 3, name: 'Evidence of dandruff', isChecked: false},
        {id: 4, name: 'Excessive shedding', isChecked: false},
        {id: 5, name: 'Abnormal hair loss', isChecked: false},
    ]);

    const [skinList, setSkinList] = useState<CheckSkinListItem[]>([
        {id: 1, name: 'Dryness', isChecked: false},
        {id: 2, name: 'Oiliness', isChecked: false},
        {id: 3, name: 'Dandruff', isChecked: false},
        {id: 4, name: 'Lumps or dumps', isChecked: false},
        {id: 5, name: 'Areas of abnormal thickening', isChecked: false},
        {id: 6, name: 'Areas of abnormal thinning', isChecked: false},
    ]);

    const [earList, setEarList] = useState<CheckEarListItem[]>([
        {id: 1, name: 'Debris in ear canal', isChecked: false},
        {id: 2, name: 'Wax in ear canal', isChecked: false},
        {id: 3, name: 'Thickening', isChecked: false},
        {id: 4, name: 'Hair loss', isChecked: false},
    ]);

    const [noseList, setNoseList] = useState<CheckNoseListItem[]>([
        {id: 1, name: 'Dry', isChecked: false},
        {id: 2, name: 'Cracked', isChecked: false},
        {id: 3, name: 'Nasal discharge', isChecked: false},
        {id: 4, name: 'Bleeding', isChecked: false},
    ]);

    const [mouthAndTeethList, setMouthAndTeethList] = useState<CheckMouthAndTeethListItem[]>([
        {id: 1, name: 'Tar buildup', isChecked: false},
        {id: 2, name: 'Gum disease', isChecked: false},
        {id: 3, name: 'Retained baby teeth', isChecked: false},
        {id: 4, name: 'Broken teeth', isChecked: false},
        {id: 5, name: 'Excessibe salivation', isChecked: false},
        {id: 6, name: 'Staining around the lips', isChecked: false},
        {id: 7, name: 'Ulcers in mouth', isChecked: false},
        {id: 8, name: 'Ulcers around mouth', isChecked: false},
    ]);

    const [heartList, setHeartList] = useState<CheckHeartListItem[]>([
        {id: 1, name: 'Skipped beats', isChecked: false},
        {id: 2, name: 'Extra beats', isChecked: false},
        {id: 3, name: 'Heart murmur', isChecked: false},
        {id: 4, name: 'Regular', isChecked: false},
    ]);

    const [gaitAndPostureList, setGaitAndPostureList] = useState<CheckGaitAndPostureListItem[]>([
        {id: 1, name: 'Limping', isChecked: false},
        {id: 2, name: 'Weakness', isChecked: false},
        {id: 3, name: 'Instability', isChecked: false},
    ]);


    const [petOwner, setPetOwner] = useState(null)
    const [isSubmit, setSubmit] = useState(false)

    // interface CheckupExamForm {
    //     heartRate: string, heartItems: CheckHeartListItem[], heartNotes: string, lungSounds: string, lungNotes: string, eyeItems: CheckEyeListItem[], tearProduction: string, eyePressure: string, eyelidExamination: string, irisExamination: string, lensExamination: string, retinaExamination: string, opticNerveExamination: string, coatItems: CheckCoatListItem[], coatNotes: string, skinItems: CheckSkinListItem[], skinNotes: string, earItems: CheckEarListItem[], earNotes: string, noseItems: CheckNoseListItem[], noseNotes: string, mouthAndTeethItems: CheckMouthAndTeethListItem[], mouthNotes:string, teethNotes: string, gaitAndPostureItems: CheckGaitAndPostureListItem[], gaitNotes: string, postureNotes: string, feetNotes: string, weight: number, weightMessurement: string, weightAnalysis: string, muscleStructureNotes: string, temperature: number, dietNotes: string, habitNotes: string, behaviorNotes: string, shots: string
    // }

    async function checkInfoIsValid() {
        params.behaviorNotes = checkupExamForm.behaviorNotes
        params.coatItems = itemForm.coatItems
        params.coatNotes = checkupExamForm.coatNotes
        params.dietNotes = checkupExamForm.dietNotes
        params.earItems = itemForm.earItems
        params.earNotes = checkupExamForm.earNotes
        params.eyeItems = itemForm.earItems
        params.eyePressure = checkupExamForm.eyePressure
        params.eyelidExamination = checkupExamForm.eyelidExamination
        params.feetNotes = checkupExamForm.feetNotes
        params.gaitAndPostureItems = itemForm.gaitAndPostureItems
        params.gaitNotes = checkupExamForm.gaitNotes
        params.habitNotes = checkupExamForm.habitNotes
        params.heartItems = itemForm.heartItems
        params.heartNotes = checkupExamForm.heartNotes
        params.heartRate = checkupExamForm.heartRate
        params.irisExamination = checkupExamForm.irisExamination
        params.lensExamination = checkupExamForm.lensExamination
        params.lungNotes = checkupExamForm.lungNotes
        params.lungSounds = checkupExamForm.lungSounds
        params.mouthAndTeethItems = itemForm.mouthAndTeethItems
        params.mouthNotes = checkupExamForm.mouthNotes
        params.muscleStructureNotes = checkupExamForm.muscleStructureNotes
        params.noseItems = itemForm.noseItems
        params.noseNotes = checkupExamForm.noseNotes
        params.opticNerveExamination = checkupExamForm.opticNerveExamination
        params.postureNotes = checkupExamForm.postureNotes
        params.retinaExamination = checkupExamForm.retinaExamination
        params.shots = checkupExamForm.shots
        params.skinItems = itemForm.skinItems
        params.skinNotes = checkupExamForm.skinNotes
        params.tearProduction = checkupExamForm.tearProduction
        params.teethNotes = checkupExamForm.teethNotes
        params.teethNotes = checkupExamForm.teethNotes
        params.temperature = checkupExamForm.temperature
        params.weight = checkupExamForm.weight
        params.weightAnalysis = checkupExamForm.weightAnalysis
        params.weightMessurement = checkupExamForm.weightMessurement
        props.navigation.navigate("CheckupSummary", { ...params } as CheckupSummaryScreenParams)
    }

    const handleSubmit = async () => {
        setSubmit(true)
        // postPetInformationToServer()
    }

    useEffect(() => {
        if (isSubmit) {
            checkInfoIsValid()
        }
    }, [isSubmit])

    useEffect(() => {
        if (!petOwner)
            getOwner()
    }, [petOwner])

    const getOwner = async () => {
        let url = BASE_URL + "/pet/get/" + params.petId + "/owner"
        await fetch(url)
            .then(response => response.json())
            .then(responseJson => {
                if (responseJson) {
                    console.log("PRINTING PET OWNER IN APPOINTMENT SCREEN" + JSON.stringify(responseJson))
                    setPetOwner(responseJson)
                }
            })
    }

    async function postPetInformationToServer() {
        const url = `${BASE_URL}/appointment/addPetInfo/${params.appointmentId}` // Update the URL as needed
        console.log(url)
        const requestBody = {
            heartRate: checkupExamForm.heartRate,
            // heartItems: checkupExamForm.heartItems,
            heartNotes: checkupExamForm.heartNotes,
            lungSounds: checkupExamForm.lungSounds,
            lungNotes: checkupExamForm.lungNotes,
            // eyeItems: checkupExamForm.eyeItems,
            tearProduction: checkupExamForm.tearProduction,
            eyePressure: checkupExamForm.eyePressure,
            eyelidExamination: checkupExamForm.eyelidExamination,
            irisExamination: checkupExamForm.irisExamination,
            lensExamination: checkupExamForm.lensExamination,
            retinaExamination: checkupExamForm.retinaExamination,
            opticNerveExamination: checkupExamForm.opticNerveExamination,
            // coatItems: checkupExamForm.coatItems,
            coatNotes: checkupExamForm.coatNotes,
            // skinItems: checkupExamForm.skinItems,
            skinNotes: checkupExamForm.skinNotes,
            // earItems: checkupExamForm.earItems,
            earNotes: checkupExamForm.earNotes,
            // mouthAndTeethItems: checkupExamForm.mouthAndTeethItems,
            mouthNotes: checkupExamForm.mouthNotes,
            teethNotes: checkupExamForm.teethNotes,
            // gaitAndPostureItems: checkupExamForm.gaitAndPostureItems,
            gaitNotes: checkupExamForm.gaitNotes,
            postureNotes: checkupExamForm.postureNotes,
            feetNotes: checkupExamForm.feetNotes,
            // noseItems: checkupExamForm.noseItems,
            noseNotes: checkupExamForm.noseNotes,
            weight: checkupExamForm.weight,
            weightMessurement: checkupExamForm.weightMessurement,
            weightAnalysis: checkupExamForm.weightAnalysis,
            muscleStructureNotes: checkupExamForm.muscleStructureNotes,
            temperature: checkupExamForm.temperature,
            dietNotes: checkupExamForm.dietNotes,
            habitNotes: checkupExamForm.habitNotes,
            behaviorNotes: checkupExamForm.behaviorNotes,
            shots: checkupExamForm.shots,
        }

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            })

            if (!response.ok) {
                console.error('Error posting pet information:', response.status)
                // Handle the error as needed
            } else {
                console.log('Pet information posted successfully')
                // Handle the success as needed
            }
        } catch (error) {
            console.error('Error posting pet information:', error)
            // Handle the error as needed
        }
    }


    const displayWeightMessurementValue = (index: IndexPath) => {
        // convert weightMessurement[index.row] to title case
        return weightMessurement[index.row].charAt(0).toLowerCase() + weightMessurement[index.row].slice(1).toLowerCase()
    }

    const updateWeightMessurement = (index: IndexPath) => {
        setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, type: weightMessurement[index.row] }))
        // setType(weightMessurement[index.row])
        setSelectedWeightMessurementIndex(index)
    }

    const displayWeightAnalysisValue = (index: IndexPath) => {
        // convert weightMessurement[index.row] to title case
        return weightAnalysis[index.row].charAt(0).toLowerCase() + weightAnalysis[index.row].slice(1).toLowerCase()
    }

    const updateWeightAnalysis = (index: IndexPath) => {
        setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, type: weightAnalysis[index.row] }))
        // setType(weightMessurement[index.row])
        setSelectedWeightAnalysisIndex(index)
    }

    const [isPhysicalVisible, setPhysicalVisible] = useState(false);

    const togglePhysicalVisibility = () => {
        setPhysicalVisible(!isPhysicalVisible);
    }

    const [isBehavioralVisible, setBehavioralVisible] = useState(false);

    const toggleBehavioralVisibility = () => {
        setBehavioralVisible(!isBehavioralVisible);
    }

    const [isTemperatureVisible, setTemperatureVisible] = useState(false);

    const toggleTemperatureVisibility = () => {
        setTemperatureVisible(!isTemperatureVisible);
    }


    const [isLungsVisible, setLungsVisible] = useState(false);

    const toggleLungsVisibility = () => {
        setLungsVisible(!isLungsVisible);
    }

    const [isHeartVisible, setHeartVisible] = useState(false);

    const toggleHeartVisibility = () => {
        setHeartVisible(!isHeartVisible);
    }

    const [isEyesVisible, setEyesVisible] = useState(false);

    const toggleEyesVisibility = () => {
        setEyesVisible(!isEyesVisible);
    }

    const [isCoatVisible, setCoatVisible] = useState(false);

    const toggleCoatVisibility = () => {
        setCoatVisible(!isCoatVisible);
    }

    const [isSkinVisible, setSkinVisible] = useState(false);

    const toggleSkinVisibility = () => {
        setSkinVisible(!isSkinVisible);
    }

    const [isFeetVisible, setFeetVisible] = useState(false);

    const toggleFeetVisibility = () => {
        setFeetVisible(!isFeetVisible);
    }

    const [isEarsVisible, setEarsVisible] = useState(false);

    const toggleEarsVisibility = () => {
        setEarsVisible(!isEarsVisible);
    }

    const [isNoseVisible, setNoseVisible] = useState(false);

    const toggleNoseVisibility = () => {
        setNoseVisible(!isNoseVisible);
    }

    const [isMouthAndTeethVisible, setMouthAndTeethVisible] = useState(false);

    const toggleMouthAndTeethVisibility = () => {
        setMouthAndTeethVisible(!isMouthAndTeethVisible);
    }

    const [isWeightManagementVisible, setWeightManagementVisible] = useState(false);

    const toggleWeightManagementVisibility = () => {
        setWeightManagementVisible(!isWeightManagementVisible);
    }

    const [isMuscleStructureVisible, setMuscleStructureVisible] = useState(false);

    const toggleMuscleStructureVisibility = () => {
        setMuscleStructureVisible(!isMuscleStructureVisible);
    }

    const [isGaitAndPostureVisible, setGaitAndPostureVisible] = useState(false);

    const toggleGaitAndPostureVisibility = () => {
        setGaitAndPostureVisible(!isGaitAndPostureVisible);
    }

    const handleEyeCheckboxChange = (id: number) => {
        const updatedEyeList = eyeList.map(eyeItem => {
            if (eyeItem.id === id) {
                return { ...eyeItem, isChecked: !eyeItem.isChecked };
            }
            return eyeItem;
        });
        setEyeList(updatedEyeList);
    };

    const saveSelectedEyeItems = () => {
        const selectedEyeItems = eyeList.filter(eyeItem => eyeItem.isChecked);
        const eye = eyeListToString(selectedEyeItems);
        setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, eyeItems: selectedEyeItems}));
        setItemForm((prevState: ItemForm) => ({ ...prevState, eyeItems: eye}));
        console.log('Selected eye items to save: ', eye);
    };

    const handleCoatCheckboxChange = (id: number) => {
        const updatedCoatList = coatList.map(coatItem => {
            if (coatItem.id === id) {
                return { ...coatItem, isChecked: !coatItem.isChecked };
            }
            return coatItem;
        });
        setCoatList(updatedCoatList);
    };

    const saveSelectedCoatItems = () => {
        const selectedCoatItems = coatList.filter(coatItem => coatItem.isChecked);
        const coat = coatListToString(selectedCoatItems);
        setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, coatItems: selectedCoatItems}));
        setItemForm((prevState: ItemForm) => ({ ...prevState, coatItems: coat}));
        console.log('Selected coat items to save: ', coat);
    };

    const handleSkinCheckboxChange = (id: number) => {
        const updatedSkinList = skinList.map(skinItem => {
            if (skinItem.id === id) {
                return { ...skinItem, isChecked: !skinItem.isChecked };
            }
            return skinItem;
        });
        setSkinList(updatedSkinList);
    };

    const saveSelectedSkinItems = () => {
        const selectedSkinItems = skinList.filter(skinItem => skinItem.isChecked);
        const skin = skinListToString(selectedSkinItems);
        setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, skinItems: selectedSkinItems}));
        setItemForm((prevState: ItemForm) => ({ ...prevState, skinItems: skin}));
        console.log('Selected skin items to save: ', skin);
    };

    const handleEarCheckboxChange = (id: number) => {
        const updatedEarList = earList.map(earItem => {
            if (earItem.id === id) {
                return { ...earItem, isChecked: !earItem.isChecked };
            }
            return earItem;
        });
        setEarList(updatedEarList);
    };

    const saveSelectedEarItems = () => {
        const selectedEarItems = earList.filter(earItem => earItem.isChecked);
        const ear = earListToString(selectedEarItems);
        setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, earItems: selectedEarItems}));
        setItemForm((prevState: ItemForm) => ({ ...prevState, earItems: ear}));
        console.log('Selected ear items to save: ', ear);
    };

    const handleNoseCheckboxChange = (id: number) => {
        const updatedNoseList = noseList.map(noseItems => {
            if (noseItems.id === id) {
                return { ...noseItems, isChecked: !noseItems.isChecked };
            }
            return noseItems;
        });
        setNoseList(updatedNoseList);
    };

    const saveSelectedNoseItems = () => {
        const selectedNoseItems = noseList.filter(noseItems => noseItems.isChecked);
        const nose = noseListToString(selectedNoseItems);
        setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, noseItems: selectedNoseItems}));
        setItemForm((prevState: ItemForm) => ({ ...prevState, noseItems: nose}));
        console.log('Selected nose items to save: ', nose);
    };

    const handleMouthAndTeethCheckboxChange = (id: number) => {
        const updatedMouthAndTeethList = mouthAndTeethList.map(mouthAndTeethItem => {
            if (mouthAndTeethItem.id === id) {
                return { ...mouthAndTeethItem, isChecked: !mouthAndTeethItem.isChecked };
            }
            return mouthAndTeethItem;
        });
        setMouthAndTeethList(updatedMouthAndTeethList);
    };

    const saveSelectedMouthAndTeethItems = () => {
        const selectedMouthAndTeethItems = mouthAndTeethList.filter(mouthAndTeethItem => mouthAndTeethItem.isChecked);
        const mouthAndTeeth = mouthAndTeethListToString(selectedMouthAndTeethItems);
        setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, mouthAndTeethItems: selectedMouthAndTeethItems}));
        setItemForm((prevState: ItemForm) => ({ ...prevState, mouthAndTeethItems: mouthAndTeeth}));
        console.log('Selected mouth and teeth items to save: ', mouthAndTeeth);
    };

    const handleHeartCheckboxChange = (id: number) => {
        const updatedHeartList = heartList.map(heartItem => {
            if (heartItem.id === id) {
                return { ...heartItem, isChecked: !heartItem.isChecked };
            }
            return heartItem;
        });
        setHeartList(updatedHeartList);
    };

    const saveSelectedHeartItems = () => {
        const selectedHeartItems = heartList.filter(heartItem => heartItem.isChecked);
        const heart = heartListToString(selectedHeartItems);
        setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, heartItems: selectedHeartItems}));
        setItemForm((prevState: ItemForm) => ({ ...prevState, heartItems: heart}));
        console.log('Selected heart items to save: ', heart);
    };

    const handleGaitAndPostureCheckboxChange = (id: number) => {
        const updatedGaitAndPostureList = gaitAndPostureList.map(gaitAndPostureItem => {
            if (gaitAndPostureItem.id === id) {
                return { ...gaitAndPostureItem, isChecked: !gaitAndPostureItem.isChecked };
            }
            return gaitAndPostureItem;
        });
        setGaitAndPostureList(updatedGaitAndPostureList);
    };

    const saveSelectedGaitAndPostureItems = () => {
        const selectedGaitAndPostureItems = gaitAndPostureList.filter(gaitAndPostureItem => gaitAndPostureItem.isChecked);
        const gaitAndPosture = gaitAndPostureListToString(selectedGaitAndPostureItems);
        setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, gaitAndPostureItem: selectedGaitAndPostureItems}));
        setItemForm((prevState: ItemForm) => ({ ...prevState, gaitAndPostureItems: gaitAndPosture}));
        console.log('Selected gait and posture items to save: ', selectedGaitAndPostureItems);
    };

    return (
        <SafeAreaView style={styles.background}>
            <ScrollView>
                <Text style={{ ...styles.boldText, fontSize: 30 }}>Examination</Text>

                <View>
                    <Button onPress={togglePhysicalVisibility}>Physical</Button>
                    {isPhysicalVisible && (
                        <>
                            <Button onPress={toggleTemperatureVisibility}>Temperature</Button>
                            {isTemperatureVisible && (
                                <>
                                <Text>Temperature (Farenheit)</Text>
                                <Textfield
                                    value={checkupExamForm.temperature}
                                    placeholder='Please provide the temperature in farenheit...'
                                    onChangeText={(text: number) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, temperature: text}))}}
                                />
                                </>
                            )}

                            <Button onPress={toggleLungsVisibility}>Lungs</Button>
                            {isLungsVisible && (
                                <>
                                <Text>Lung Sounds</Text>
                                <Textfield
                                    value={checkupExamForm.lungSounds}
                                    placeholder='Please provide sounds coming from the lungs...'
                                    onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, lungSounds: text}))}}
                                />
                                <Text>Lung Notes</Text>
                                <Textfield
                                    value={checkupExamForm.lungNotes}
                                    placeholder='Please provide notes on the lungs...'
                                    onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, lungNotes: text}))}}
                                />
                                </>
                            )}

                            <Button onPress={toggleHeartVisibility}>Heart</Button>
                            {isHeartVisible && (
                                <>
                                <Text>Heart Rate</Text>
                                <Textfield
                                    value={checkupExamForm.heartRate}
                                    placeholder='Please provide the pets heart rate in BPM...'
                                    onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, heartRate: text}))}}
                                />
                                <Text>Select all that apply about the heart</Text>
                                <Layout>
                                    {heartList.map(heartItem => (
                                        <View key={heartItem.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                            <CheckBox
                                                checked={heartItem.isChecked}
                                                onChange={() => handleHeartCheckboxChange(heartItem.id)}
                                            />
                                            <Text style={{ marginLeft: 8 }}>{heartItem.name}</Text>
                                        </View>
                                    ))}
                                    <Button onPress={saveSelectedHeartItems}>Save Heart Selection</Button>
                                </Layout>
                                <Text>Heart Notes</Text>
                                <Textfield
                                    value={checkupExamForm.heartNotes}
                                    placeholder='Please provide additional information on the heart...'
                                    onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, heartNotes: text}))}}
                                />
                                </>
                            )}

                            <Button onPress={toggleEyesVisibility}>Eyes</Button>
                            {isEyesVisible && (
                                <>
                                <Text>Select all that apply about the eyes</Text>
                                <Layout>
                                    {eyeList.map(eyeItem => (
                                        <View key={eyeItem.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                            <CheckBox
                                                checked={eyeItem.isChecked}
                                                onChange={() => handleEyeCheckboxChange(eyeItem.id)}
                                            />
                                            <Text style={{ marginLeft: 8 }}>{eyeItem.name}</Text>
                                        </View>
                                    ))}
                                    <Button onPress={saveSelectedEyeItems}>Save Eye Selection</Button>
                                </Layout>
                                <Text>Tear Production</Text>
                                <Textfield
                                    value={checkupExamForm.tearProduction}
                                    placeholder='Please provide the measurement of the tear production...'
                                    onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, tearProduction: text}))}}
                                />
                                <Text>Eye Pressure</Text>
                                <Textfield
                                    value={checkupExamForm.eyePressure}
                                    placeholder='Please provide the measurement of the eye pressure...'
                                    onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, eyePressure: text}))}}
                                />
                                <Text>Eyelid Examination</Text>
                                <Textfield
                                    value={checkupExamForm.eyelidExamination}
                                    placeholder='Please provide notes on the eyelids...'
                                    onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, eyelidExamination: text}))}}
                                />
                                <Text>Iris Examination</Text>
                                <Textfield
                                    value={checkupExamForm.irisExamination}
                                    placeholder='Please provide notes on the iris...'
                                    onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, irisExamination: text}))}}
                                />
                                <Text>Lens Examination</Text>
                                <Textfield
                                    value={checkupExamForm.lensExamination}
                                    placeholder='Please provide notes on the lens...'
                                    onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, lensExamination: text}))}}
                                />
                                <Text>Retina Examination</Text>
                                <Textfield
                                    value={checkupExamForm.retinaExamination}
                                    placeholder='Please provide notes on the retina...'
                                    onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, retinaExamination: text}))}}
                                />
                                <Text>Optic Nerve Examination</Text>
                                <Textfield
                                    value={checkupExamForm.opticNerveExamination}
                                    placeholder='Please provide notes on the optic nerve...'
                                    onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, opticNerveExamination: text}))}}
                                />
                                </>
                            )}

                            <Button onPress={toggleCoatVisibility}>Coat</Button>
                            {isCoatVisible && (
                                <>
                                <Text>Select all that apply about the coat</Text>
                                <Layout>
                                    {coatList.map(coatItem => (
                                        <View key={coatItem.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                            <CheckBox
                                                checked={coatItem.isChecked}
                                                onChange={() => handleCoatCheckboxChange(coatItem.id)}
                                            />
                                            <Text style={{ marginLeft: 8 }}>{coatItem.name}</Text>
                                        </View>
                                    ))}
                                    <Button onPress={saveSelectedCoatItems}>Save Coat Selection</Button>
                                </Layout>
                                <Text>Coat notes</Text>
                                <Textfield
                                    value={checkupExamForm.coatNotes}
                                    placeholder='Please provide notes on the coat...'
                                    onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, coatNotes: text}))}}
                                />
                                </>
                            )}

                            <Button onPress={toggleSkinVisibility}>Skin</Button>
                            {isSkinVisible && (
                                <>
                                <Text>Select all that apply about the skin</Text>
                                <Layout>
                                    {skinList.map(skinItem => (
                                        <View key={skinItem.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                            <CheckBox
                                                checked={skinItem.isChecked}
                                                onChange={() => handleSkinCheckboxChange(skinItem.id)}
                                            />
                                            <Text style={{ marginLeft: 8 }}>{skinItem.name}</Text>
                                        </View>
                                    ))}
                                    <Button onPress={saveSelectedSkinItems}>Save Skin Selection</Button>
                                </Layout>
                                <Text>Skin notes</Text>
                                <Textfield
                                    value={checkupExamForm.skinNotes}
                                    placeholder='Please provide notes on the skin...'
                                    onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, skinNotes: text}))}}
                                />
                                </>
                            )}

                            <Button onPress={toggleEarsVisibility}>Ears</Button>
                            {isEarsVisible && (
                                <>
                                <Text>Select all that apply about the ears</Text>
                                <Layout>
                                    {earList.map(earItem => (
                                        <View key={earItem.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                            <CheckBox
                                                checked={earItem.isChecked}
                                                onChange={() => handleEarCheckboxChange(earItem.id)}
                                            />
                                            <Text style={{ marginLeft: 8 }}>{earItem.name}</Text>
                                        </View>
                                    ))}
                                    <Button onPress={saveSelectedEarItems}>Save Ear Selection</Button>
                                </Layout>
                                <Text>Ear notes</Text>
                                <Textfield
                                    value={checkupExamForm.earNotes}
                                    placeholder='Please provide notes on the ear...'
                                    onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, earNotes: text}))}}
                                />
                                </>
                            )}

                            <Button onPress={toggleNoseVisibility}>Nose</Button>
                            {isNoseVisible && (
                                <>
                                <Text>Select all that apply about the nose</Text>
                                <Layout>
                                    {noseList.map(noseItems => (
                                        <View key={noseItems.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                            <CheckBox
                                                checked={noseItems.isChecked}
                                                onChange={() => handleNoseCheckboxChange(noseItems.id)}
                                            />
                                            <Text style={{ marginLeft: 8 }}>{noseItems.name}</Text>
                                        </View>
                                    ))}
                                    <Button onPress={saveSelectedNoseItems}>Save Nose Selection</Button>
                                </Layout>
                                <Text>Nose notes</Text>
                                <Textfield
                                    value={checkupExamForm.noseNotes}
                                    placeholder='Please provide notes on the nose...'
                                    onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, noseNotes: text}))}}
                                />
                                </>
                            )}

                            <Button onPress={toggleMouthAndTeethVisibility}>Mouth and Teeth</Button>
                            {isMouthAndTeethVisible && (
                                <>
                                <Text>Select all that apply about the mouth and teeth</Text>
                                <Layout>
                                    {mouthAndTeethList.map(mouthAndTeethItem => (
                                        <View key={mouthAndTeethItem.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                            <CheckBox
                                                checked={mouthAndTeethItem.isChecked}
                                                onChange={() => handleMouthAndTeethCheckboxChange(mouthAndTeethItem.id)}
                                            />
                                            <Text style={{ marginLeft: 8 }}>{mouthAndTeethItem.name}</Text>
                                        </View>
                                    ))}
                                    <Button onPress={saveSelectedMouthAndTeethItems}>Save Mouth and Teeth Selection</Button>
                                </Layout>
                                <Text>Mouth notes</Text>
                                <Textfield
                                    value={checkupExamForm.mouthNotes}
                                    placeholder='Please provide notes on the mouth...'
                                    onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, mouthNotes: text}))}}
                                />
                                <Text>Teeth notes</Text>
                                <Textfield
                                    value={checkupExamForm.teethNotes}
                                    placeholder='Please provide notes on the teeth...'
                                    onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, teethNotes: text}))}}
                                />
                                </>
                            )}

                            <Button onPress={toggleFeetVisibility}>Feet</Button>
                            {isFeetVisible && (
                                <>
                                <Text>Feet notes</Text>
                                <Textfield
                                    value={checkupExamForm.feetNotes}
                                    placeholder='Please provide notes on the feet...'
                                    onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, feetNotes: text}))}}
                                />
                                </>
                            )}

                            <Button onPress={toggleWeightManagementVisibility}>Weight Management</Button>
                            {isWeightManagementVisible && (
                                <>
                                <Text>Weight</Text>
                                <Textfield
                                    value={checkupExamForm.weight}
                                    placeholder='Weight'
                                    onChangeText={(text: number) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, weight: text}))}}
                                />
                                <Text>Weight Messurement (lbs: pounds, oz: ounces)</Text>
                                <Select
                                    selectedIndex={selectedWeightMessurement}
                                    onSelect={index => index instanceof IndexPath ? updateWeightMessurement(index) : null}
                                    value={displayWeightMessurementValue(selectedWeightMessurement)}
                                    style={{ width: "100%" }}
                                >
                                    <SelectItem title='lbs' />
                                    <SelectItem title='oz' />
                                </Select>
                                <Text>Weight Analysis</Text>
                                <Select
                                    selectedIndex={selectedWeightAnalysis}
                                    onSelect={index => index instanceof IndexPath ? updateWeightAnalysis(index) : null}
                                    value={displayWeightAnalysisValue(selectedWeightAnalysis)}
                                    style={{ width: "100%" }}
                                >
                                    <SelectItem title='Obese' />
                                    <SelectItem title='Moderately overweight' />
                                    <SelectItem title='Slihtly overweight' />
                                    <SelectItem title='Normal weight' />
                                    <SelectItem title='Slightly underweight' />
                                    <SelectItem title='Moderately underweight' />
                                    <SelectItem title='Extremely underweight' />
                                </Select>
                                </>
                            )}

                            <Button onPress={toggleMuscleStructureVisibility}>Muscle Structure</Button>
                            {isMuscleStructureVisible && (
                                <>
                                <Text>Muscle Structure notes</Text>
                                <Textfield
                                    value={checkupExamForm.muscleStructureNotes}
                                    placeholder='Please provide notes on the muscle structure...'
                                    onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, muscleStructureNotes: text}))}}
                                />
                                </>
                            )}

                            <Button onPress={toggleGaitAndPostureVisibility}>Gait and Posture</Button>
                            {isGaitAndPostureVisible && (
                                <>
                                <Text>Select all that apply about the gait and posture</Text>
                                <Layout>
                                    {gaitAndPostureList.map(gaitAndPostureItem => (
                                        <View key={gaitAndPostureItem.id} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                            <CheckBox
                                                checked={gaitAndPostureItem.isChecked}
                                                onChange={() => handleGaitAndPostureCheckboxChange(gaitAndPostureItem.id)}
                                            />
                                            <Text style={{ marginLeft: 8 }}>{gaitAndPostureItem.name}</Text>
                                        </View>
                                    ))}
                                    <Button onPress={saveSelectedGaitAndPostureItems}>Save Gait and Posture Selection</Button>
                                </Layout>
                                <Text>Gait notes</Text>
                                <Textfield
                                    value={checkupExamForm.gaitNotes}
                                    placeholder='Please provide notes on the gait...'
                                    onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, gaitNotes: text}))}}
                                />
                                <Text>Posture notes</Text>
                                <Textfield
                                    value={checkupExamForm.postureNotes}
                                    placeholder='Please provide notes on the posture...'
                                    onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, postureNotes: text}))}}
                                />
                                </>
                            )}

                        </> 
                    )}

                    <Button onPress={toggleBehavioralVisibility}>Behavioral</Button>
                    {isBehavioralVisible && (
                        <>
                        <Text>Diet Notes</Text>
                        <Textfield
                            value={checkupExamForm.dietNotes}
                            placeholder='Please provide notes on the diet...'
                            onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, dietNotes: text}))}}
                        />
                        <Text>Habit Notes</Text>
                        <Textfield
                            value={checkupExamForm.habitNotes}
                            placeholder='Please provide notes on the habits...'
                            onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, habitNotes: text}))}}
                        />
                        <Text>Behavior Notes</Text>
                        <Textfield
                            value={checkupExamForm.behaviorNotes}
                            placeholder='Please provide notes on the habits...'
                            onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, behaviorNotes: text}))}}
                        />
                        </>
                    )}
                    <Text style={styles.titleText}>Pet Shots</Text>
                    <Textfield
                        value={checkupExamForm.shots}
                        placeholder='Please provide the pets shots information...'
                        onChangeText={(text: string) => {setCheckupExamForm((prevState: CreateExamForm) => ({ ...prevState, shots: text}))}}
                    />
                </View>

                <Button style={styles.buttonGroup} onPress={handleSubmit}>
                    <Text> Next Step </Text>
                </Button>
            </ScrollView>

            <ClientNavbar navigation={props.navigation} {...params} />
        </SafeAreaView>
    )
}

export default CheckupExamScreen
