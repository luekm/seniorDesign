package Spring20232.VetGo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.*;

@Entity
@Table(name = "history")
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long hid;

    @OneToOne(mappedBy = "history")
    private Pet pet;

    private String ageAdoptFamily;
    private String health;
    private String otherPets;
    private String childrenAges;
    private String vetFeelingsMuzzled;
    private String medicalHistory;
    private String medications;
    private String medReactions;
    private String currentFood;
    private Boolean shareImageAndStory;

    public History() {
    }

    public History(Long hid, Pet pet, String aaf, String health, String op, String ca, String vfm, String mh, String meds, String mr, String cf, Boolean sis) {
        this.hid = hid;
        this.pet = pet;
        this.ageAdoptFamily = aaf;
        this.health = health;
        this.otherPets = op;
        this.childrenAges = ca;
        this.vetFeelingsMuzzled = vfm;
        this.medicalHistory = mh;
        this.medications = meds;
        this.medReactions = mr;
        this.currentFood = cf;
        this.shareImageAndStory = sis;
    }

    public Long getHid() {
        return hid;
    }
    public void setHid(Long hid) {
        this.hid = hid;
    }

    public Pet getPet() {
        return pet;
    }
    public void setPet(Pet pet) {
        this.pet = pet;
    }

    public String getAgeAdoptFamily() {
        return ageAdoptFamily;
    }
    public void setAgeAdoptFamily(String aaf) {
        this.ageAdoptFamily = aaf;
    }

    public String getHealth() {
        return health;
    }
    public void setHealth(String health) {
        this.health = health;
    }

    public String getOtherPets() {
        return otherPets;
    }
    public void setOtherPets(String op) {
        this.otherPets = op;
    }

    public String getChildrenAges() {
        return childrenAges;
    }
    public void setChildrenAges(String childrenAges) {
        this.childrenAges = childrenAges;
    }

    public String getVetFeelingsMuzzled() {
        return vetFeelingsMuzzled;
    }
    public void setVetFeelingsMuzzled(String vetFeelingsMuzzled) {
        this.vetFeelingsMuzzled = vetFeelingsMuzzled;
    }

    public String getMedicalHistory() {
        return medicalHistory;
    }
    public void setMedicalHistory(String medicalHistory) {
        this.medicalHistory = medicalHistory;
    }

    public String getMedications() {
        return medications;
    }
    public void setMedications(String medications) {
        this.medications = medications;
    }

    public String getMedReactions() {
        return medReactions;
    }
    public void setMedReactions(String medReactions) {
        this.medReactions = medReactions;
    }

    public String getCurrentFood() {
        return currentFood;
    }
    public void setCurrentFood(String currentFood) {
        this.currentFood = currentFood;
    }

    public Boolean getShareImageAndStory() {
        return shareImageAndStory;
    }
    public void setShareImageAndStory(Boolean shareImageAndStory) {
        this.shareImageAndStory = shareImageAndStory;
    }

}
