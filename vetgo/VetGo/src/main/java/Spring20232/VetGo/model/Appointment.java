package Spring20232.VetGo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;


import java.time.LocalDate;
import java.time.LocalDateTime;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long aid;
    private LocalDate time;

    @ManyToOne
    @JoinColumn(name = "vet_id")
//    @JsonIgnore
    private Vet vet;

    @ManyToOne
    @JoinColumn(name = "pet_id")
//    @JsonIgnore
    private Pet pet;

    private Double longitude;
    private Double latitude;
    private String description;
    @OneToOne
    @JoinColumn(name = "transaction_id")
    private Transaction transaction;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "additional_pet_information_id")
    private AdditionalPetInformation additionalPetInformation;
    private AppointmentStatus status;
    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL)
    private List<Review> reviews = new ArrayList<Review>();

    public enum AppointmentStatus {
        WAITING,
        ACCEPTED,
        PAYMENT,
        COMPLETED;
    }

    public AdditionalPetInformation getPetInformation() {
        return additionalPetInformation;
    }


    public Appointment() {
    }

    public Appointment(Long aid, LocalDate time, Vet vet, Pet pet, Double longitude, Double latitude, String description, Transaction transaction, AppointmentStatus status, AdditionalPetInformation petInformation) {
        this.aid = aid;
        this.time = time;
        this.vet = vet;
        this.pet = pet;
        this.longitude = longitude;
        this.latitude = latitude;
        this.description = description;
        this.transaction = transaction;
        this.status = status;
        this.additionalPetInformation = petInformation;
    }

    public Long getAid() {
        return aid;
    }

    public void setAid(Long aid) {
        this.aid = aid;
    }

    public LocalDate getTime() {
        return time;
    }

    public void setTime(LocalDate time) {
        this.time = time;
    }

    public Vet getVet() {
        return vet;
    }

    public void setPetInformation(AdditionalPetInformation petInformation) {
        this.additionalPetInformation = petInformation;
    }

    public void setVet(Vet vet) {
        this.vet = vet;
    }

    public Pet getPet() {
        return pet;
    }

    public void setPet(Pet pet) {
        this.pet = pet;
    }

    public Double getLongitude() {
        return longitude;
    }

    public void setLongitude(Double longitude) {
        this.longitude = longitude;
    }

    public Double getLatitude() {
        return latitude;
    }

    public void setLatitude(Double latitude) {
        this.latitude = latitude;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Transaction getTransaction() {
        return transaction;
    }

    public void setTransaction(Transaction transaction) {
        this.transaction = transaction;
    }

    public AppointmentStatus getStatus() {
        return status;
    }

    public void setStatus(AppointmentStatus status) {
        this.status = status;
    }

    public List<Review> getReviews() {
        return reviews;
    }

    public void setReviews(List<Review> reviews) {
        this.reviews = reviews;
    }

    public void addReview(Review review) {
        this.reviews.add(review);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Appointment that = (Appointment) o;
        return aid.equals(that.aid) && Objects.equals(time, that.time) && Objects.equals(vet, that.vet) && pet.equals(that.pet) && Objects.equals(longitude, that.longitude) && Objects.equals(latitude, that.latitude) && Objects.equals(description, that.description) && Objects.equals(transaction, that.transaction) && status == that.status && Objects.equals(reviews, that.reviews);
    }

    @Override
    public int hashCode() {
        return Objects.hash(aid, time, vet, pet, longitude, latitude, description, transaction, status, reviews);
    }
}
