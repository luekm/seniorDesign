package Spring20232.VetGo.controller;

import Spring20232.VetGo.model.Appointment;
import Spring20232.VetGo.model.Owner;
import Spring20232.VetGo.model.Pet;
import Spring20232.VetGo.repository.OwnerRepository;
import Spring20232.VetGo.repository.PetRepository;
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

import static Spring20232.VetGo.model.Appointment.AppointmentStatus.*;

@RestController
@RequestMapping("pet")
public class PetController {
    private final PetService petService;
    @Autowired
    private PetRepository petRepository;
    @Autowired
    private OwnerRepository ownerRepository;

    @Autowired
    public PetController(PetService petService) {
        this.petService = petService;
    }

    @SuppressWarnings("NewApi")
    @GetMapping(value = "/get/all")
    public ResponseEntity<List<Pet>> getAllPet() {
        List<Pet> petList = new ArrayList<>();
        petRepository.findAll().forEach(petList::add);
        return ResponseEntity.status(HttpStatus.OK).body(petList);
    }

    @SuppressWarnings("NewApi")
    @GetMapping(value = "/get/{pid}/owner")
    public ResponseEntity<Owner> getPetOwner(@PathVariable("pid") Long pid) {
        return ResponseEntity.status(HttpStatus.OK).body(petRepository.findById(pid).orElse(null).getOwner());
    }

    @SuppressWarnings("NewApi")
    @GetMapping(value = "/get/{pid}")
    public ResponseEntity<Pet> getPet(@PathVariable("pid") Long pid) {
        return ResponseEntity.status(HttpStatus.OK).body(petRepository.findById(pid).orElse(null));
    }

    // Returns list of appointment that pet has currently
    @GetMapping(value = "/appointmentList/{pid}")
    public ResponseEntity<?> getPetAppointmentList(@PathVariable("pid") Long pid) {
        Pet pet = petRepository.findById(pid).orElse(null);

        if (pet == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unable to find pet in database");

        return ResponseEntity.status(HttpStatus.OK).body(pet.getAppointments());
    }

    @GetMapping(value = "/appointment/{pid}")
    public ResponseEntity<?> getPetAppointment(@PathVariable("pid") Long pid) {
        Pet pet = petRepository.findById(pid).orElse(null);

        if (pet == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unable to find pet in database");

        List<Appointment> appointmentList = pet.getAppointments();
        Appointment petAppointment = null;

        for (Appointment a : appointmentList) {
            if (a.getPet().equals(pet)) {
                if (a.getStatus() == WAITING || a.getStatus() == ACCEPTED || a.getStatus() == PAYMENT) {
                    petAppointment = a;
                    return ResponseEntity.status(HttpStatus.OK).body(petAppointment);
                }
            }
        }
        return ResponseEntity.status(HttpStatus.OK).body(null);
    }

    @GetMapping(value = "/records/file/{petId}")
    public ResponseEntity<List<byte[]>> getPetRecord(@PathVariable("petId") Long pid) {
        return ResponseEntity.status(HttpStatus.OK).body(petService.getPetRecords(pid));
    }

    // To upload medical file
    @PostMapping(path = "/upload/{petId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public void uploadRecord(@PathVariable("petId") Long pid,
                             @RequestParam("file") MultipartFile file) {
        petService.uploadRecord(pid, file);
    }

    // To upload Image
    @PutMapping(path = "/upload/image/{petId}")
    public ResponseEntity<String> uploadImage(@RequestBody String petImage,@PathVariable("petId") Long pid) {
        Pet pet = petRepository.findById(pid).orElse(null);
        if (pet == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unable to find pet in database");
        pet.setPetImage(petImage);
        petRepository.save(pet);
        return ResponseEntity.status(HttpStatus.OK).body("Successfully able to upload the file");
    }

    // Post a new pet under the current user, returns profile of pet created, null if user doesn't exist
    @PostMapping(value = "/add/{oid}")
    public ResponseEntity<?> addPet(@RequestBody Pet pet,
                                    @PathVariable("oid") Long oid) {
        Owner owner = ownerRepository.findById(oid).orElse(null);

        if (owner == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unable to find user in database");

        Pet newPet = new Pet(null, null,null, null, pet.getName(), pet.getPetType(), pet.getPetBreed(),
                new ArrayList<>(), pet.getMale(), pet.getAge(), pet.getWeight(), pet.getHeight(), pet.getMicroManufacturer(), pet.getMicrochipId(), 
                pet.getIsDeclawed(), pet.getIsIndoor(), pet.getBirthMonth(), pet.getBirthDay(), pet.getBirthYear());

        newPet.setOwner(owner);
        petRepository.save(newPet);
        owner.addPetList(newPet);
//        ownerRepository.save(owner);

        return ResponseEntity.status(HttpStatus.OK).body(newPet);
    }

    @DeleteMapping(value = "/delete/{petId}")
    public ResponseEntity<String> deletePet(@PathVariable("petId") Long pid) {
        Pet pet = petRepository.findById(pid).orElse(null);
        if (pet == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unable to find pet in database");

        petRepository.delete(pet);
        return ResponseEntity.status(HttpStatus.OK).body("Deleted " + pid);
    }

    @PutMapping(value = "/update/{petId}")
    public ResponseEntity<?> updatePet(@RequestBody Pet updatedPet, @PathVariable("petId") Long pid) {

        @SuppressWarnings("NewApi") Pet currPet = petRepository.findById(pid).orElse(null);

        if (currPet == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unable to find pet in database");

        currPet.setName(updatedPet.getName());
        currPet.setPetType(updatedPet.getPetType());
        currPet.setPetBreed(updatedPet.getPetBreed());
        currPet.setMale(updatedPet.getMale());
        currPet.setAge(updatedPet.getAge());
        currPet.setWeight(updatedPet.getWeight());
        currPet.setHeight(updatedPet.getHeight());
        currPet.setMicroManufacturer(updatedPet.getMicroManufacturer());
        currPet.setMicrochipId(updatedPet.getMicrochipId());
        currPet.setIsDeclawed(updatedPet.getIsDeclawed());
        currPet.setIsIndoor(updatedPet.getIsIndoor());
        currPet.setBirthMonth(updatedPet.getBirthMonth());
        currPet.setBirthDay(updatedPet.getBirthDay());
        currPet.setBirthYear(updatedPet.getBirthYear());

        petRepository.save(currPet);

        return ResponseEntity.status(HttpStatus.OK).body(currPet);
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
