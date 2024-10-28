package Spring20232.VetGo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.Cascade;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;

@Entity
@Table(name = "users")
public class User extends BaseEntity {
    private String username;
    private String email;
    private String password;
    private double averageRating;
    private int numReviewed;
    private Double longitude;
    private Double latitude;
    @OneToOne
    @JoinColumn(name = "user_tags")
    private Tag tags;
    @ManyToMany
    @JoinTable(name = "user_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    @JsonIgnore
    private Set<Role> userRoles = new HashSet<Role>();

    public User() {
    }

    public User(String username, String email, String password, Double latitude, Double longitude) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getUserRoles() {
        return userRoles;
    }

    public void setUserRoles(Set<Role> userRoles) {
        this.userRoles = userRoles;
    }

    public void addUserRoles(Role role) {
        this.userRoles.add(role);
    }

    public double getAverageRating() {
        return averageRating;
    }

    public void setAverageRating(double averageRating) {
        this.averageRating = averageRating;
    }

    public int getNumReviewed() {
        return numReviewed;
    }

    public void setNumReviewed(int numReviewed) {
        this.numReviewed = numReviewed;
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

    public Tag getTags() {
        if (tags == null) {
            this.tags = new Tag();
        }
        return this.tags;
    }

    public void setTags(Tag tags) {
        this.tags = tags;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Double.compare(user.averageRating, averageRating) == 0 && numReviewed == user.numReviewed && username.equals(user.username) && email.equals(user.email) && password.equals(user.password) && Objects.equals(tags, user.tags) && Objects.equals(userRoles, user.userRoles);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, email, password, averageRating, numReviewed, tags, userRoles);
    }
}
