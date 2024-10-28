package Spring20232.VetGo.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;

public interface PetServiceInterface {
    void uploadRecord(Long pid, MultipartFile file);
    List<byte[]> getPetRecords(Long pid);
}
