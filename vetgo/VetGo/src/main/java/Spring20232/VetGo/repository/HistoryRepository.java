package Spring20232.VetGo.repository;

import Spring20232.VetGo.model.History;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface HistoryRepository extends JpaRepository<History, Long> {
    @Async
    public <S extends History> S save(S entity);
    History findByHid(String hid);
}
