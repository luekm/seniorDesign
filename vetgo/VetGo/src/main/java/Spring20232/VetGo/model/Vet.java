package Spring20232.VetGo.model;

import com.amazonaws.services.fms.model.App;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.*;

@Entity
@Table(name = "vets")
public class Vet extends Person {
    @OneToOne
    @JoinColumn(name = "vet_user")
    private User userAccount;
    private String vetLicense;
    private Boolean status;
    @ManyToMany
    @JoinTable(name = "vet_specialties", joinColumns = @JoinColumn(name = "vet_id"),
            inverseJoinColumns = @JoinColumn(name = "specialty_id"))
    private Set<Specialty> specialties = new HashSet<Specialty>();
    @OneToMany(mappedBy = "vet", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Appointment> appointments = new ArrayList<>();

    public Vet() {
    }

    public Vet(String firstName, String lastName, String telephone, Address address, User userAccount, String vetLicense, Boolean status, Set<Specialty> specialties, List<Appointment> appointments) {
        super(firstName, lastName, telephone, address);
        this.userAccount = userAccount;
        this.vetLicense = vetLicense;
        this.status = status;
        this.specialties = specialties;
        this.appointments = appointments;
    }

    public User getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(User userAccount) {
        this.userAccount = userAccount;
    }

    public String getVetLicense() {
        return vetLicense;
    }

    public void setVetLicense(String vetLicense) {
        this.vetLicense = vetLicense;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public Set<Specialty> getSpecialties() {
        return specialties;
    }

    public void setSpecialties(Set<Specialty> specialties) {
        this.specialties = specialties;
    }

    public void addSpecialties(Specialty specialty) {
        this.specialties.add(specialty);
    }

    public List<Appointment> getAppointments() {
        return appointments;
    }

    public void setAppointments(List<Appointment> appointments) {
        this.appointments = appointments;
    }

    public void addAppointments(Appointment appointment) {
        this.appointments.add(appointment);
    }

    public void removeAppointments(Appointment appointment) {
        appointments.remove(appointment);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Vet vet = (Vet) o;
        return userAccount.equals(vet.userAccount) && Objects.equals(vetLicense, vet.vetLicense) && Objects.equals(status, vet.status) && Objects.equals(specialties, vet.specialties) && Objects.equals(appointments, vet.appointments);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), userAccount, vetLicense, status, specialties, appointments);
    }
}
