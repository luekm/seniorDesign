package Spring20232.VetGo.repository;

import Spring20232.VetGo.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    // Takes in user longitude and latitude and returns appointments that matches their preferred distance in miles
    // 6371 for km, 3959 for miles
    @Query(value = "SELECT *, " +
            "(3959 * acos(cos(radians(:userLatitude)) * " +
            "cos(radians(latitude)) * cos(radians(longitude) - " +
            "radians(:userLongitude)) + sin(radians(:userLatitude)) * " +
            "sin(radians(latitude)))) " +
            "AS distance FROM appointment HAVING distance < :radius ORDER BY distance LIMIT 0, 20;", nativeQuery = true)
    List<Appointment> findNearbyAppointment(@Param("userLongitude") Double longitude, @Param("userLatitude") Double latitude, @Param("radius") Double radius);
}
