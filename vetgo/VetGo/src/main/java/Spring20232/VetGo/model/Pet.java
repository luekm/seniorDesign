package Spring20232.VetGo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.*;

@Entity
@Table(name = "pet")
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pid;

    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonIgnore
    private Owner owner;


    @OneToMany(mappedBy = "pet", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Appointment> appointments = new ArrayList<>();
    private String name;
    private PetType petType;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "history_id", referencedColumnName = "hid")
    private History history;

    private String petBreed;

    public enum PetType {
        DOG, CAT, BIRD, REPTILE, FISH, RODENT, OTHER
    }

    @ElementCollection
    private List<String> fileLink = new ArrayList<String>();
    @Column(columnDefinition = "TEXT")
    private String petImage;
    private Boolean isMale;
    private int age;
    private int weight;
    private int height;
    private String microchip_manufacturer;
    private String microchip_id;
    private Boolean isDeclawed;
    private Boolean isIndoor;
    private String birthMonth;
    private int birthDay;
    private int birthYear;

    

    public Pet() {
    }

    public Pet(Long pid, Owner owner, List<Appointment> appointments, History history, String name, PetType petType, String petBreed, List<String> fileLink, Boolean isMale, int age, int weight, int height, String microchip_man, String microchip_id, Boolean isDeclawed, Boolean isIndoor, String birthMonth, int birthDay, int birthYear) {
        this.pid = pid;
        this.owner = owner;
        this.appointments = appointments;
        this.history = history;
        this.name = name;
        this.petType = petType;
        this.petBreed = petBreed;
        this.isMale = isMale;
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.microchip_manufacturer = microchip_man;
        this.microchip_id = microchip_id;
        this.isDeclawed = isDeclawed;
        this.isIndoor = isIndoor;
        this.birthMonth = birthMonth;
        this.birthDay = birthDay;
        this.birthYear = birthYear;
    }

    public Long getPid() {
        return pid;
    }

    public void setPid(Long pid) {
        this.pid = pid;
    }

    public Owner getOwner() {
        return owner;
    }

    public void setOwner(Owner owner) {
        this.owner = owner;
    }

    public String getName() {
        return name;
    }

    public String getPetImage() {return petImage;}

    public void setPetImage(String petImage) {this.petImage = petImage;}

    public void setName(String name) {
        this.name = name;
    }

    public PetType getPetType() {
        return petType;
    }

    public void setPetType(PetType petType) {
        this.petType = petType;
    }

    public String getPetBreed() {
        return petBreed;
    }

    public void setPetBreed(String petBreed) {
        this.petBreed = petBreed;
    }

    @SuppressWarnings("NewApi")
    public Optional<List<String>> getFileLink() {
        return Optional.ofNullable(fileLink);
    }

    public void setFileLink(List<String> fileLink) {
        this.fileLink = fileLink;
    }

    public void addFileLink(String fileLink) {
        this.fileLink.add(fileLink);
    }

    public Boolean getMale() {
        return isMale;
    }

    public void setMale(Boolean male) {
        isMale = male;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void addAppointmentList(Appointment appointment) {
        appointments.add(appointment);
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    public History geHistory() {
        return history;
    }

    public void setHistory(History history) {
        this.history = history;
    }

    public String getMicroManufacturer() {
        return microchip_manufacturer;
    }

    public void setMicroManufacturer(String microchip_man) {
        this.microchip_manufacturer = microchip_man;
    }

    public String getMicrochipId() {
        return microchip_id;
    }

    public void setMicrochipId(String microchip_id) {
        this.microchip_id = microchip_id;
    }

    public Boolean getIsDeclawed() {
        return isDeclawed;
    }

    public void setIsDeclawed(Boolean isDeclawed) {
        this.isDeclawed = isDeclawed;
    }

    public Boolean getIsIndoor() {
        return isIndoor;
    }

    public void setIsIndoor(Boolean isIndoor) {
        this.isIndoor = isIndoor;
    }

    public String getBirthMonth() {
        return birthMonth;
    }

    public void setBirthMonth(String birthMonth) {
        this.birthMonth = birthMonth;
    }

    public int getBirthDay() {
        return birthDay;
    }

    public void setBirthDay(int birthDay) {
        this.birthDay = birthDay;
    }

    public int getBirthYear() {
        return birthYear;
    }

    public void setBirthYear(int birthYear) {
        this.birthYear = birthYear;
    }


    @Override 
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Pet pet = (Pet) o;
        return age == pet.age && weight == pet.weight && height == pet.height && Objects.equals(pid, pet.pid) && 
        Objects.equals(petBreed, pet.petBreed) && Objects.equals(owner, pet.owner) && 
        Objects.equals(appointments, pet.appointments) && Objects.equals(name, pet.name) && petType == pet.petType && 
        Objects.equals(fileLink, pet.fileLink) && Objects.equals(isMale, pet.isMale) && Objects.equals(microchip_manufacturer, pet.microchip_manufacturer) &&
        Objects.equals(microchip_id, pet.microchip_id) && Objects.equals(isDeclawed, pet.isDeclawed) && Objects.equals(isIndoor, pet.isIndoor) &&
        Objects.equals(birthMonth, pet.birthMonth) && Objects.equals(birthDay, pet.birthDay) && Objects.equals(birthYear, pet.birthYear);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(pid, owner, appointments, history, name, petType, petBreed, fileLink, isMale, age, weight, height, microchip_manufacturer, microchip_id, isDeclawed, isIndoor, birthMonth, birthDay, birthYear);
    }

}
