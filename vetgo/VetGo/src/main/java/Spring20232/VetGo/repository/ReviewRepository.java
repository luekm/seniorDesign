package Spring20232.VetGo.repository;

import Spring20232.VetGo.model.Review;
import Spring20232.VetGo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByReviewee(UUID reviewee);
}
