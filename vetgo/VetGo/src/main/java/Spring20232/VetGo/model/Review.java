package Spring20232.VetGo.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

import java.util.Objects;
import java.util.UUID;

@Entity
public class Review extends BaseEntity{

    private Long reviewer;
    private Long reviewee;
    private String description;
    private Double rating;

    @ManyToOne
    @JoinColumn(name = "review_appointment")
    @JsonIgnore
    private Appointment appointment;
    @OneToOne
    @JoinColumn(name = "review_tags")
    private Tag tags;

    public Review() {
    }

    public Review(Long reviewer, Long reviewee, String description, Double rating, Appointment appointment, Tag tags) {
        this.reviewer = reviewer;
        this.reviewee = reviewee;
        this.description = description;
        this.rating = rating;
        this.appointment = appointment;
        this.tags = tags;
    }

    public Long getReviewer() {
        return reviewer;
    }

    public void setReviewer(Long reviewer) {
        this.reviewer = reviewer;
    }

    public Long getReviewee() {
        return reviewee;
    }

    public void setReviewee(Long reviewee) {
        this.reviewee = reviewee;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public Appointment getAppointment() {
        return appointment;
    }

    public void setAppointment(Appointment appointment) {
        this.appointment = appointment;
    }

    public Tag getTags() {
        return tags;
    }

    public void setTags(Tag tags) {
        this.tags = tags;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Review review = (Review) o;
        return reviewer.equals(review.reviewer) && reviewee.equals(review.reviewee) && Objects.equals(description, review.description) && Objects.equals(rating, review.rating) && appointment.equals(review.appointment) && Objects.equals(tags, review.tags);
    }

    @Override
    public int hashCode() {
        return Objects.hash(reviewer, reviewee, description, rating, appointment, tags);
    }
}
