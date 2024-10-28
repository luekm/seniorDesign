package Spring20232.VetGo.controller;

import Spring20232.VetGo.model.Appointment;
import Spring20232.VetGo.model.Owner;
import Spring20232.VetGo.model.Pet;
import Spring20232.VetGo.model.User;
import Spring20232.VetGo.repository.OwnerRepository;
import Spring20232.VetGo.repository.UserRepository;
import com.amazonaws.services.dynamodbv2.xspec.NULL;
import com.amazonaws.services.fms.model.App;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("owner")
public class OwnerController {
    @Autowired
    private OwnerRepository ownerRepository;
    @Autowired
    private UserRepository userRepository;

    //    @PreAuthorize("hasRole(@roles.ROLE_OWNER)")
    @GetMapping(value = "/all")
    public ResponseEntity<List<Owner>> getAllOwner() {
        List<Owner> owners = new ArrayList<>();
        ownerRepository.findAll().forEach(owners::add);
        return ResponseEntity.status(HttpStatus.OK).body(owners);
    }


    @GetMapping(value = "/userId/{uid}")
    public ResponseEntity<Owner> getOwnerByUserId(@PathVariable Long uid) {
        User user = userRepository.findById(uid).orElse(null);
        Owner owner = ownerRepository.findByUserAccount(user);
        return ResponseEntity.status(HttpStatus.OK).body(owner);
    }


    //    @PreAuthorize("hasRole(@roles.ROLE_OWNER)")
    @GetMapping(value = "/id/{oid}")
    public ResponseEntity<Owner> getOwner(@PathVariable Long oid) {
        return ResponseEntity.status(HttpStatus.OK).body(ownerRepository.findById(oid).orElse(null));
    }

    //    @PreAuthorize("hasRole(@roles.ROLE_OWNER)")
    @GetMapping(value = "/pet/{oid}")
    public ResponseEntity<List<Pet>> getPetList(@PathVariable Long oid) {
        return ResponseEntity.status(HttpStatus.OK).body(ownerRepository.findById(oid).orElse(null).getPetList());
    }

    //    @PreAuthorize("hasRole(@roles.ROLE_OWNER)")
    @PutMapping(value = "/update/{oid}")
    public ResponseEntity<?> updateOwner(@RequestBody Owner updatedOwner, @PathVariable("oid") Long oid) {

        if (ownerRepository.findById(oid).isEmpty())
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unable to find owner in database");

        ownerRepository.findById(oid)
                .map(owner -> {
                    owner.setUserAccount(updatedOwner.getUserAccount());
                    owner.setAddress(updatedOwner.getAddress());
                    owner.setFirstName(updatedOwner.getFirstName());
                    owner.setLastName(updatedOwner.getLastName());
                    owner.setTelephone(updatedOwner.getTelephone());
                    owner.setPetList(updatedOwner.getPetList());
                    return ownerRepository.save(owner);
                }).orElseGet(() -> {
                    return ownerRepository.save(updatedOwner);
                });

        return ResponseEntity.status(HttpStatus.OK).body(ownerRepository.findById(oid));
    }

    //    @PreAuthorize("hasRole(@roles.ROLE_OWNER)")
    @DeleteMapping(value = "/delete/all")
    public ResponseEntity<String> deleteAllOwner() {
        ownerRepository.deleteAll();
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Deleted all owners");
    }

    //    @PreAuthorize("hasRole(@roles.ROLE_OWNER)")
    @DeleteMapping(value = "/delete/{oid}")
    public ResponseEntity<String> deleteOwner(@PathVariable("oid") Long oid) {
        Owner owner = ownerRepository.findById(oid).orElse(null);
        if (owner == null)
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Unable to find owner in database");

        ownerRepository.delete(owner);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Deleted owner");
    }

    @GetMapping(value = "/getUser/id/{oid}")
    public ResponseEntity<User> getUserByOwnerId(@PathVariable Long oid) {
        Owner owner = ownerRepository.findById(oid).orElse(null);
        if (owner == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.status(HttpStatus.OK).body(owner.getUserAccount());
    }


}
