package Spring20232.VetGo.repository;

import Spring20232.VetGo.model.Owner;
import Spring20232.VetGo.model.User;
import org.springframework.dao.DataAccessException;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface OwnerRepository extends JpaRepository<Owner, Long> {
    Owner findByUserAccount(User userAccount) throws DataAccessException;
}
