package Spring20232.VetGo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;

import java.util.Objects;
@Entity
@Table(name = "address")
public class Address extends BaseEntity {
    @Column(name = "unitNumber")
    private String unitNumber;
    @Column(name = "streetAddress")
    @NotNull
    private String streetAddress;
    @Column(name = "city")
    @NotNull
    private String city;
    @Column(name = "state")
    @NotNull
    private String state;
    @Column(name = "zip")
    @NotNull
    private String zip;

    public Address() {
    }
    public Address(String unitNumber, String streetAddress, String city, String state, String zip) {
        this.unitNumber = unitNumber;
        this.streetAddress = streetAddress;
        this.city = city;
        this.state = state;
        this.zip = zip;
    }

    public String getUnitNumber() {
        return unitNumber;
    }

    public void setUnitNumber(String unitNumber) {
        this.unitNumber = unitNumber;
    }

    public String getStreetAddress() {
        return streetAddress;
    }

    public void setStreetAddress(String streetAddress) {
        this.streetAddress = streetAddress;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getZip() {
        return zip;
    }

    public void setZip(String zipCode) {
        this.zip = zipCode;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Address address = (Address) o;
        return Objects.equals(unitNumber, address.unitNumber) && Objects.equals(streetAddress, address.streetAddress) && Objects.equals(city, address.city) && Objects.equals(state, address.state) && Objects.equals(zip, address.zip);
    }

    @Override
    public int hashCode() {
        return Objects.hash(unitNumber, streetAddress, city, state, zip);
    }
}
