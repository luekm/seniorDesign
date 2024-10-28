package Spring20232.VetGo.repository;

import Spring20232.VetGo.model.Owner;
import Spring20232.VetGo.model.User;
import Spring20232.VetGo.model.Vet;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface VetRepository extends JpaRepository<Vet, Long> {
    Vet findByVetLicense(String vetLicense) throws DataAccessException;
    Vet findByUserAccount(User userAccount) throws DataAccessException;
}
