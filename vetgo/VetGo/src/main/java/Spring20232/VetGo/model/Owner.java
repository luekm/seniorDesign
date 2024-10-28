package Spring20232.VetGo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "owners")
public class Owner extends Person {

    @OneToOne
    @JoinColumn(name = "owner_user")
    private User userAccount;
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL)
    private List<Pet> petList = new ArrayList<Pet>();

    public Owner() {
    }

    public Owner(String firstName, String lastName, String telephone, Address address, User userAccount, List<Pet> petList, Double latitude, Double longitude) {
        super(firstName, lastName, telephone, address);
        this.userAccount = userAccount;
        this.petList = petList;
    }

    public User getUserAccount() {
        return userAccount;
    }

    public void setUserAccount(User userAccount) {
        this.userAccount = userAccount;
    }

    public List<Pet> getPetList() {
        return petList;
    }

    public void setPetList(List<Pet> petList) {
        this.petList = petList;
    }

    public void addPetList(Pet pet) {
        this.petList.add(pet);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Owner owner = (Owner) o;
        return userAccount.equals(owner.userAccount) && Objects.equals(petList, owner.petList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), userAccount, petList);
    }
}
