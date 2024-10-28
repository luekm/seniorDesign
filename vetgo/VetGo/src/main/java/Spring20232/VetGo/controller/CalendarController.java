package Spring20232.VetGo.controller;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.auth.oauth2.TokenResponse;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.client.util.DateTime;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.calendar.Calendar;
import com.google.api.services.calendar.CalendarScopes;
import com.google.api.services.calendar.model.Event;
import com.google.api.services.calendar.model.Events;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import Spring20232.VetGo.controller.AuthController;
import Spring20232.VetGo.model.AuthMessage;

import java.io.*;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/* class to demonstrate use of Calendar events list API */
@RestController
@RequestMapping("calendar")
public class CalendarController {

    private static SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    public void setSimpMessagingTemplate(SimpMessagingTemplate s) {
        CalendarController.simpMessagingTemplate = s;
    }

    /**
     * Application name.
     */
    private static final String APPLICATION_NAME = "Google Calendar API for VetGo";
    /**
     * Global instance of the JSON factory.
     */
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    /**
     * Directory to store authorization tokens for this application.
     */
    private static final String TOKENS_DIRECTORY_PATH = "tokens";

    private static final String CREDENTIALS_FILE_PATH = "../../../../../resources/cli_creds.json";

    /**
     * Global instance of the scopes required by this quickstart.
     * If modifying these scopes, delete your previously saved tokens/ folder.
     */
    private static final List<String> SCOPES =
            Collections.singletonList(CalendarScopes.CALENDAR_READONLY);
    @GetMapping(value="/credentialExists/{userId}")
    public static ResponseEntity<String> credentialExists(@PathVariable String userId)
            throws IOException {
        Credential credential = null;
        try {
            NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();

            // Load client secrets.
            InputStream in = new FileInputStream(CREDENTIALS_FILE_PATH);
            if (in == null) {
                throw new FileNotFoundException("Resource not found: " + CREDENTIALS_FILE_PATH);
            }
            GoogleClientSecrets clientSecrets =
                    GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

            // Build flow and trigger user authorization request.
            GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                    HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                    .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                    .setAccessType("offline")
                    .build();

            Credential preExistingCredential = flow.loadCredential(userId);
            if (preExistingCredential != null && (preExistingCredential.getRefreshToken() != null)) {
                //Credential var11 = credential;
                // We already have a credential for this user! let them know
                System.out.println("found an authorized credential for user" + userId);
//                simpMessagingTemplate.convertAndSend("/topic/messages", userId + " authed");
                return ResponseEntity.status(200).body("True");
            }

        }
        catch(GeneralSecurityException e){
            return ResponseEntity.status(401).body(e.getMessage());
        }
//        if(credential == null) {
        return ResponseEntity.status(404).body("False");
//        }
//        return ResponseEntity.status(420).body("Failed to create credential");
    }
    @GetMapping(value="/addCredential/{userId}")
    public static ResponseEntity<String> addCredentials( @PathVariable String userId)
            throws IOException {
        Credential credential = null;
        try {
            NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();

            // Load client secrets.
            InputStream in = new FileInputStream(CREDENTIALS_FILE_PATH);
            if (in == null) {
                throw new FileNotFoundException("Resource not found: " + CREDENTIALS_FILE_PATH);
            }
            GoogleClientSecrets clientSecrets =
                    GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

            // Build flow and trigger user authorization request.
            GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                    HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                    .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                    .setAccessType("offline")
                    .build();

            Credential preExistingCredential = flow.loadCredential(userId);
            if (preExistingCredential != null && (preExistingCredential.getRefreshToken() != null)) {
                //Credential var11 = credential;
                // We already have a credential for this user! let them know
                System.out.println("found an authorized credential for user" + userId);
                simpMessagingTemplate.convertAndSend("/topic/messages", userId + " authed");
                return ResponseEntity.status(200).body("Credential already present");
            }

            // Make sure the port is the same as an authorized uri redirect in your GAPI oauth2 credential
            LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(7777).build();
            //Credential credential = new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
            String redirectUri = receiver.getRedirectUri();
            System.out.println(redirectUri);
            String thing = flow.newAuthorizationUrl()
                    .setAccessType("offline")
                    .setClientId(clientSecrets.getDetails().getClientId())
                    .setRedirectUri(redirectUri)
                    .toString();
//
            System.out.println("credentialized " + thing);
//            AuthMessage msg = new AuthMessage();
//            msg.setContent(thing);
//            msg.setHeaders("Auth");
            simpMessagingTemplate.convertAndSend("/topic/messages", thing);

            String code = receiver.waitForCode();
            TokenResponse response = flow.newTokenRequest(code).setRedirectUri(redirectUri).execute();
            credential = flow.createAndStoreCredential(response, userId);
            AuthMessage newCredResponse = new AuthMessage();
            newCredResponse.setHeaders(userId);
            newCredResponse.setContent(userId + " authed");
            simpMessagingTemplate.convertAndSend("/topic/messages", newCredResponse);
            receiver.stop();
        }
        catch(GeneralSecurityException e){
            return ResponseEntity.status(401).body(e.getMessage());
        }
//        if(credential == null) {
            return ResponseEntity.status(200).body("Credential now present");
//        }
//        return ResponseEntity.status(420).body("Failed to create credential");
    }
    /**
     * Creates an authorized Credential object.
     *
     * @param HTTP_TRANSPORT The network HTTP Transport.
     * @return An authorized Credential object.
     * @throws IOException If the credentials.json file cannot be found.
     */
    private static Credential getCredentials(final NetHttpTransport HTTP_TRANSPORT, String userId)
            throws IOException {
        // Load client secrets.
        InputStream in = new FileInputStream(CREDENTIALS_FILE_PATH);
        if (in == null) {
            throw new FileNotFoundException("Resource not found: " + CREDENTIALS_FILE_PATH);
        }
        GoogleClientSecrets clientSecrets =
                GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));

        // Build flow and trigger user authorization request.
        GoogleAuthorizationCodeFlow flow = new GoogleAuthorizationCodeFlow.Builder(
                HTTP_TRANSPORT, JSON_FACTORY, clientSecrets, SCOPES)
                .setDataStoreFactory(new FileDataStoreFactory(new java.io.File(TOKENS_DIRECTORY_PATH)))
                .setAccessType("offline")
                .build();
        // Make sure the port is the same as an authorized uri redirect in your GAPI oauth2 credential
        LocalServerReceiver receiver = new LocalServerReceiver.Builder().setPort(7777).build();
        //Credential credential = new AuthorizationCodeInstalledApp(flow, receiver).authorize("user");
        String redirectUri = receiver.getRedirectUri();
        System.out.println(redirectUri);
//        String thing = flow.newAuthorizationUrl()
//                .setAccessType("offline")
//                .setClientId(clientSecrets.getDetails().getClientId())
//                .setRedirectUri(redirectUri)
//                .toString();
//        System.out.println("credentialized " + thing);
//        AuthMessage msg = new AuthMessage();
//        msg.setContent(thing);
//        msg.setHeaders("Auth");
//        simpMessagingTemplate.convertAndSend("/topic/messages", thing);
//
//        String code = receiver.waitForCode();
//        TokenResponse response = flow.newTokenRequest(code).setRedirectUri(redirectUri).execute();
//        Credential credential = flow.createAndStoreCredential(response, "user");

        //returns an authorized Credential object.
        Credential credential = new AuthorizationCodeInstalledApp(flow, receiver).authorize(userId);
        receiver.stop();

        return credential;
    }

//    private sendMessage(AuthMessage authMessage){}

    @GetMapping(value="/getEvents/{userId}/{year}/{month}/{day}")
    public ResponseEntity<Object> getEvents(@PathVariable String userId,
                                           @PathVariable String year,
                                           @PathVariable String month,
                                           @PathVariable String day) throws IOException, GeneralSecurityException{

        // Build a new authorized API client service.
        try {
            final NetHttpTransport HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
            Calendar service =
                    new Calendar.Builder(HTTP_TRANSPORT, JSON_FACTORY, getCredentials(HTTP_TRANSPORT, userId))
                            .setApplicationName(APPLICATION_NAME)
                            .build();
            System.out.println("User: " + userId);
            // List the next 10 events from the primary calendar.
            String zeroHour = "T00:00:00.000"; // TODO this only works for central time :'(
            String dayFormat = day.length() == 2 ? "" + Integer.parseInt(day) : "0" + Integer.parseInt(day);
            String monthFormat = month.length() == 2 ? "" + Integer.parseInt(month) : "0" + Integer.parseInt(month);
            String today = year + "-" + monthFormat + "-" + dayFormat + zeroHour;
            String altDay = day.length() == 2 ? "" + (Integer.parseInt(day) + 1) : "0" + (Integer.parseInt(day) + 1);
            String altMonth = month.length() == 2 ? "" + Integer.parseInt(month): "0" + (Integer.parseInt(month) + 1);
            String tomorrow = year + "-" + altMonth + "-" + altDay + zeroHour;
            System.out.println(today);
            System.out.println(tomorrow);
            DateTime timeMin = new DateTime(today);
            DateTime timeMax = new DateTime(tomorrow);
            System.out.println(timeMin.toString());
            System.out.println(timeMax.toString());
            Events events = service.events().list("primary")
                    .setTimeMin(timeMin)
                    .setTimeMax(timeMax)
                    .setOrderBy("startTime")
                    .setSingleEvents(true)
                    .execute();
            List<Event> items = events.getItems();
            List<String> returnable = new ArrayList<>();
            //JsonArray eventsJson = new JsonArray();
            JsonObject thisEvent = new JsonObject();
            if (items.isEmpty()) {
                System.out.println("No upcoming events found.");

            } else {
                System.out.println("Upcoming events");
                for (Event event : items) {
                    DateTime start = event.getStart().getDateTime();
                    DateTime end = event.getEnd().getDateTime();
                    if (start == null) {
                        start = event.getStart().getDate();
                    }
                    if (end == null) {
                        end = event.getEnd().getDate();
                    }
                    //String[] thisEvent = {event.getSummary(), start.toString(), end.toString()};
                    returnable.add(event.getSummary());
                    returnable.add(start.toString());
                    returnable.add(end.toString());
//                    String startStr = start.toString();
//                    String endStr = end.toString();
////                    String jsonStr = "{\"name\": \""+event.getSummary()+"\", \"start\": \""+startStr+"\", \"end\": \""+endStr+"\"}"
//                    thisEvent.addProperty("name", event.getSummary());
//                    thisEvent.addProperty("start", startStr);
//                    thisEvent.addProperty("end", endStr);
//                    //thisEvent.addProperty();
//                    //eventsJson.add(thisEvent.toString());
//                    System.out.printf(thisEvent.toString());
//                    returnable.add(thisEvent);
                }
            }
            //System.out.println(eventsJson);
            System.out.println(returnable.toString());
            return ResponseEntity.status(HttpStatus.OK).body(returnable.toString());
        }
        catch(IOException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
        catch(GeneralSecurityException e) {
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }
}
