package Spring20232.VetGo.repository;

import Spring20232.VetGo.model.AdditionalPetInformation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface AdditionalPetInformationRepository extends JpaRepository<AdditionalPetInformation, Long> {
}
