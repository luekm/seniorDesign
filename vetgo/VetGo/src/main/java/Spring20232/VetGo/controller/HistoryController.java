package Spring20232.VetGo.controller;

import java.util.ArrayList;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import Spring20232.VetGo.model.Appointment;
import Spring20232.VetGo.model.Owner;
import Spring20232.VetGo.model.Pet;
import Spring20232.VetGo.model.History;
import Spring20232.VetGo.repository.OwnerRepository;
import Spring20232.VetGo.repository.PetRepository;
import Spring20232.VetGo.repository.HistoryRepository;
import Spring20232.VetGo.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import Spring20232.VetGo.model.Owner;
import Spring20232.VetGo.model.Pet;

@RestController
@RequestMapping("history")
public class HistoryController {
    private final PetService petService;
    @Autowired
    private PetRepository petRepository;
    @Autowired
    private OwnerRepository ownerRepository;
    @Autowired
    private HistoryRepository historyRepository;

    @Autowired
    public HistoryController(PetService petService) {
        this.petService = petService;
    }

    @PostMapping(value = "/add/{petId}") ///NOT CHANGED NOT ALL
    public ResponseEntity<?> addHistory(@RequestBody History history,
                                    @PathVariable("petId") Long pid) {
        //TODO: CHANGE ALL
        Pet pet = petRepository.findById(pid).orElse(null);

        if (pet == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unable to find pet in database");
        
        History newHistory = new History(null, null, history.getAgeAdoptFamily(), history.getHealth(), 
            history.getOtherPets(), history.getChildrenAges(), history.getVetFeelingsMuzzled(), history.getMedicalHistory(), history.getMedications(), history.getMedReactions(), history.getCurrentFood(), history.getShareImageAndStory());
        
        newHistory.setPet(pet);
        historyRepository.save(newHistory);
        pet.setHistory(newHistory);
//        petRepository.save(pet);

        return ResponseEntity.status(HttpStatus.OK).body(newHistory);
    }

    @GetMapping(value = "/get/{pid}")
    public ResponseEntity<History> getHistory(@PathVariable("pid") Long pid) {
        Pet pet = petRepository.findById(pid).orElse(null);

        if (pet == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unable to find pet in database");
        
        History history = pet.geHistory();
        return ResponseEntity.status(HttpStatus.OK).body(history);
    }

    @DeleteMapping(value = "/delete/{petId}")
    public ResponseEntity<String> deleteHistory(@PathVariable("petId") Long pid) {
        Pet pet = petRepository.findById(pid).orElse(null);
        if (pet == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unable to find pet in database");

        historyRepository.delete(pet.geHistory());
        return ResponseEntity.status(HttpStatus.OK).body("Deleted history " + pid);
    }

    @PutMapping(value = "/update/{petId}")
    public ResponseEntity<?> updateHistory(@RequestBody History updatedHistory, @PathVariable("petId") Long pid) {

        @SuppressWarnings("NewApi") Pet currPet = petRepository.findById(pid).orElse(null);

        if (currPet == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unable to find pet in database");

        currPet.geHistory().setAgeAdoptFamily(updatedHistory.getAgeAdoptFamily()); //does this do what i want it to do??
        currPet.geHistory().setHealth(updatedHistory.getHealth());
        currPet.geHistory().setOtherPets(updatedHistory.getOtherPets());
        currPet.geHistory().setChildrenAges(updatedHistory.getChildrenAges());
        currPet.geHistory().setVetFeelingsMuzzled(updatedHistory.getVetFeelingsMuzzled());
        currPet.geHistory().setMedicalHistory(updatedHistory.getMedicalHistory());
        currPet.geHistory().setMedications(updatedHistory.getMedications());
        currPet.geHistory().setMedReactions(updatedHistory.getMedReactions());
        currPet.geHistory().setCurrentFood(updatedHistory.getCurrentFood());
        currPet.geHistory().setShareImageAndStory(updatedHistory.getShareImageAndStory());


        petRepository.save(currPet);
        historyRepository.save(currPet.geHistory());

        return ResponseEntity.status(HttpStatus.OK).body(currPet.geHistory());
//        if(petRepository.findById(pid) == null) {
//            return "Pet doesn't exist.";
//        }
//
//        petRepository.findById(pid)
//                .map(petProfile -> {
//                    petProfile.setName(updatedPet.getName());
//                    petProfile.setAge(updatedPet.getAge());
//                    petProfile.setHeight(updatedPet.getHeight());
//                    petProfile.setWeight(updatedPet.getWeight());
//                    petProfile.setMale(updatedPet.getMale());
//                    return petRepository.save(petProfile);
//                }).orElseGet(() -> {
//                    return petRepository.save(updatedPet);
//                });
//
//        return "Successfully updated pet profile";
    }
}
