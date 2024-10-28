import React, { useEffect, useState, useRef } from 'react'
import {
  SafeAreaView,
  ScrollView,
  View,
  TouchableHighlight,
  Text
} from 'react-native'
import { useFocusEffect } from "@react-navigation/native"
import { Input, Select, SelectItem } from "@ui-kitten/components"
import { styles } from "../shared/Styles"
import { colors } from "../shared/Colors"
import { BASE_URL } from "../shared/Constants"
import { LocationInterface } from '../shared/Interfaces'
import { CreateReviewScreenParams } from '../CreateReview/CreateReviewScreen'

export interface VetAddChargesScreenParams {
  userId: string,
  userIsVet: boolean,
  location: LocationInterface,
  appointmentId: string,
  petId: string,
}
interface VetAddChargesForm {
  receipt: string,
  amount: number,
}
function VetAddChargesScreen(props: any) {

  const priceData = [
    ['Appointment', '8.00'],
    ['vaccine No.233', '30.00'],
    ['Sterilization', '99.00'],
    ['Euthanasia', '1145.14'],
    ['Birth help', '107.21'],
    ['Dental checkup', '11.22'],
    ['Sex reassignment surgery', '999.99'],
  ]
  let htmlPriceData: any = []
  addItemOptions(priceData)

  const params = props.route.params as VetAddChargesScreenParams

  const [form, setForm] = useState<VetAddChargesForm>({ receipt: "Empty", amount: 0 })
  const [groupDisplay, setGroupDisplay] = useState('')
  const [selectedIndex, setSelectedIndex] = useState<any[]>([])
  const isSubmittingRef = useRef<boolean>(false)

  const handleSubmit = async () => {
    console.log(form.amount)
    if (isSubmittingRef.current)
      return

    let isValid = validate()
    if (isValid) {
      submitVetAddChargesForm()

    }
  }


  useFocusEffect(
    React.useCallback(() => {
      return () => {
        setForm({ receipt: "Empty", amount: 0 })
        setGroupDisplay("")
      }
    }, [])
  )

  function inputChange(input: any) {
    let temp = input
    // limit 8 dig
    // temp = temp.replace( /\d{8}/,'')
    // if not num, replace to ''
    temp = temp.replace(/[^\d\.]/g, '')
    // make sure first input is num, not "."
    temp = temp.replace(/^\./g, '')
    // make sure only one "."
    temp = temp.replace(/\.{2,}/g, '.')
    // make sure 01 not appear
    temp = temp.replace(/^0\d[0-9]*/g, '')
    // make sure "." only appear once
    temp = temp.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.')
    // make sure only two des
    temp = temp.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3')
    return temp
  }

  function priceAndDisplayUpdate(input: any) {
    let tempPrice = 0
    let tempDisplay = ''
    let tempReceipt = ''
    for (let i = 0; i < input.length; i++) {
      tempPrice += parseFloat(priceData[input[i].row][1])
      tempDisplay += priceData[input[i].row][0] + ", "
      tempReceipt += priceData[input[i].row][0] + ",      $" + priceData[input[i].row][1] + "\n"
    }
    setForm({ receipt: tempReceipt, amount: parseFloat(inputChange(tempPrice.toString())) })
    setGroupDisplay(tempDisplay)

  }

  function addItemOptions(priceData: any) {
    // console.log(priceData)
    for (let i = 0; i < priceData.length; i++) {
      htmlPriceData.push(
        <SelectItem key={i} title={priceData[i][0] + "   $" + priceData[i][1]} />
      )
    }
  }

  function validate() {
    let isValid: boolean = true
    // if no need check validate, leave it empty
    return isValid
  }

  async function submitVetAddChargesForm() {
    isSubmittingRef.current = true

    // Get pet owner data
    let url = BASE_URL + "/pet/get/" + params.petId + "/owner"
    let petOwnerId: string = ""
    let petOwnerFirstName: string = ""
    let petOwnerLastName: string = ""
    let petOwnerAverageRating: number = 0
    await fetch(url)
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson) {
          console.log("DEBUGGGGG")
          console.log(responseJson)
          petOwnerId = responseJson.id
          petOwnerFirstName = responseJson.userAccount.firstName,
            petOwnerLastName = responseJson.userAccount.lastName
          petOwnerAverageRating = responseJson.userAccount.averageRating
        }
      })
      .catch(error => {
        console.error(error)
        console.log(error)
      })

    let contentBody = {
      tid: null,
      name: null,
      cardNumber: null,
      zip: null,
      receipt: form.receipt,
      amount: form.amount,
      transactionStatus: false,
    }
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contentBody)
    }
    url = BASE_URL + "/transaction/set/" + params.appointmentId

    console.log(url)
    let res = await fetch(url, requestOptions)
      .then((response) => response.json())
      .then(responseJson => {
        console.error("Payment set up successfully, \nDirecting to Review")
        console.log(responseJson)


        let createReviewParams: CreateReviewScreenParams = {
          ...params,
          reviewerId: params.userId,
          revieweeId: petOwnerId,
          revieweeFirstName: petOwnerFirstName,
          revieweeLastName: petOwnerLastName,
          revieweeAverageRating: petOwnerAverageRating
        }
        props.navigation.replace("CreateReview", createReviewParams)
      })
      .catch((error) => {
        console.error("Invalid payment setting")
        console.error(error)
      })


    isSubmittingRef.current = false

  }

  return (
    <SafeAreaView style={styles.background}>
      <View style={{ width: "80%", flex: 1 }}>

        <View>
          <Text style={{ ...styles.AmountText, marginTop: "15%" }}>Set Payment</Text>

          <Select
            multiSelect={true}
            placeholder='Select Items'
            value={groupDisplay}
            selectedIndex={selectedIndex}
            onSelect={(index: any) => {
              setSelectedIndex(index)
              priceAndDisplayUpdate(index)
            }}
          >
            {htmlPriceData}
          </Select>

          <Text style={{ ...styles.ReceiptTitleText, marginTop: "5%", marginBottom: 10 }}>Receipt Preview</Text>
          <ScrollView style={{ height: "20%" }}>

            <Text style={{ fontSize: 14 }}>{form.receipt}</Text>

          </ScrollView>
          <Text style={{ ...styles.AmountText, marginBottom: 20 }}>Total: $ {form.amount}</Text>

        </View>

        <View id={"buttonGroup"} style={styles.buttonGroup}>
          <TouchableHighlight style={{ ...styles.mainButton, backgroundColor: colors.black }}
            underlayColor={colors.black_underlay}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}> SUBMIT </Text>
          </TouchableHighlight>
        </View>
      </View>

    </SafeAreaView>

  )
}

export default VetAddChargesScreen