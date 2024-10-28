package Spring20232.VetGo.repository;

import Spring20232.VetGo.model.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    @Async
    public <S extends Pet> S save(S entity);
    Pet findByName(String name);
}
