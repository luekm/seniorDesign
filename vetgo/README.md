# VetGo

#### The Uber App For Vets

&emsp;&emsp;VetGo is an app designed to function like Uber for veterinarians. Through this app, clients are able to post their pet details and create appointments for the vets in the area to choose to take. The goal of this app is to make a quick easy to use guide for owners to get help for their pets, and for vets to find work.
<br><br/>

### Development Tools:

#### FrontEnd

&emsp;React Native  
&emsp;&emsp;UI Kitten  
&emsp;Expo

#### BackEnd

&emsp;MySQL  
&emsp;Spring boot

#### plug-in

&emsp;Stripe  
&emsp;Amazon Web Services  
&emsp;Google Maps Platform
<br><br/>

### Group Members:

&emsp;Michael Moore, mamoore@iastate.edu  
&emsp;Daniel Acevedo, acevedan@iastate.edu  
&emsp;Steven Marlowe, smarlowe@iastate.edu  
&emsp;Lucas Metcalf, lmetcalf@iastate.edu  
&emsp;Grace Brickey, gbrickey@iastate.edu
<br><br/>

### How to run our VetGo project

- **Step 1:** Download our project, and make sure schema `vetgo_db` is in your Mysql DB.  
  ![db][db]  
- **Step 2:** Go to [VetGo/src/main/resources/application.properties](VetGo/src/main/resources/application.properties). At lines 13 and 14, update your Mysql connection user name and password  
  ![UandP][UandP]  

- **Step 3:** Run [VetGo/src/main/java/Spring20232/VetGo/VetGoApplication.java](VetGo/src/main/java/Spring20232/VetGo/VetGoApplication.java)(our team uses _IntelliJ IDEA_ to run the backend). If your Mysql connection username and password are correct, you should be able to run the backend .

- **Step 4:** Go to folder [VetGo/src/main/frontend](VetGo/src/main/frontend) and type `npm install` to install the required components

- **Step 5:** At the same [dir](VetGo/src/main/frontend), type `npm start` to run Expo. You will see your address (at red box location in the screenshot below)(If you run into issues, just run "expo start")  
  ![expo][expo]  

- **Step 6:** Go to [VetGo/src/main/frontend/app/screens/shared/Constants.js](VetGo/src/main/frontend/app/screens/shared/Constants.js). Update `BASE_URL` to ensure the red box area in the screenshot below matches the red box area shown at the step 5.  
  ![baseUrl][baseUrl]  

- **Step 7:** Ctrl+C to exit Expo and retype `npm start` to restart it. You should be able to open frontend and connect to the backend
  <br><br/>

**Note 1:** You can use the mobile app _Expo Go_ to scan the QR code and launch the VetGo.

**Note 2:** You can install _Android Studio_ (using Windows as an example), and in _Android Studio_, set up Android emulator, then back to system and set up your system Environment Variables. In _system variable_, add _ANDROID_HOME_ as follows:  
![AH][AH]  
At _system variable\path_, add following:  
![AHpath][AHpath]  
Then you should be able to run VetGo in Android emulator.

**Note 3:** After start the backend, You can use _http://localhost:8080/api/user/demo_ in your browser to add the test users into DB. All test users’ password is `123456`  
![testUsers][testUsers]  

<br><br/>

### How to run the backend

- **Step 1:** In springboot, run as maven build

- **Step 2:** In the mavin build configuration, type into the Goal section "package", then apply and run

- **Step 3:** When it builds successfully a jar file is created, switch over to Filezilla (or application of your choice)

- **Step 4:** In Filezilla, go into the target folder for the jar file

- **Step 5:** Once in the target folder, do a quick connect

**Note:** If you haven't connected before you will have to fill in Host, Username, Password and Port
** The Host can be found in the application.properties file under spring.datasource.url. Only include coms<...>.edu
** The Username and Password are your iastate username and password
** The Port is always 22

- **Step 6:** Drag the jar file to the remote side (this puts it into the server directly)

- **Step 7:** In a terminal ssh into the server

- **Step 8:** run the line $java -jar <Jar File Name>

<br></br>

## &emsp;Enjoy!

---

[db]: /pic/db.png 'dbpic'
[UandP]: /pic/UandP.png 'UandPpic'
[expo]: /pic/expo.png 'expopic'
[baseUrl]: /pic/baseUrl.png 'baseUrlpic'
[AH]: /pic/AH.png 'AHpic'
[AHpath]: /pic/AHpath.png 'AHpathpic'
[testUsers]: /pic/testUsers.png 'testUserspic'
