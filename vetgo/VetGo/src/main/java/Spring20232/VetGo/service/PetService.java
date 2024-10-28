package Spring20232.VetGo.service;

import Spring20232.VetGo.filestore.FileStore;
import Spring20232.VetGo.model.Pet;
import Spring20232.VetGo.repository.PetRepository;
import org.apache.http.entity.ContentType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class PetService implements PetServiceInterface {
    private final PetRepository petRepository;
    private final FileStore fileStore;

    @Autowired
    public PetService(PetRepository petRepository, FileStore fileStore) {
        this.petRepository = petRepository;
        this.fileStore = fileStore;
    }
    @Value("${aws.s3.bucket}")
    private String bucketName;
    @Override
    public void uploadRecord(Long pid, MultipartFile file) {

        // Checks if file is empty
        isFileEmpty(file);

        // Search for the if pet exist
        Pet pet1 = getPetProfileOrElseThrow(pid);

        // Stores and maps out metadata of file uploaded
        Map<String, String> metadata = extractMetadata(file);

        // Store files in s3
        String path = String.format("%s/%s", bucketName, pet1.getPid());
        String filename = String.format("%s-%s", file.getName(), UUID.randomUUID());

        try {
            fileStore.save(path, filename, Optional.of(metadata), file.getInputStream());
            pet1.addFileLink(filename);
        } catch (IOException e) {
            throw new IllegalStateException(e);
        }

    }
    @Override
    public List<byte[]> getPetRecords(Long pid) {
        Pet pet = getPetProfileOrElseThrow(pid);
        String path = String.format("%s/%s/", bucketName, pet.getPid());
        List<String> fileList = pet.getFileLink().orElse(null);

        if (fileList == null) {
            return null;
        }

        return fileStore.download(path, fileList);
    }

    private Map<String, String> extractMetadata(MultipartFile file) {
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));
        return metadata;
    }

    private void isFileEmpty(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalStateException("Cannot upload empty file [ " + file.getSize() + "]");
        }
    }

    private Pet getPetProfileOrElseThrow(Long pid) {
        Pet pet1 = petRepository
                .findAll()
                .stream()
                .filter(pet -> pet.getOwner().getId().equals(pid))
                .findFirst()
                .orElseThrow(()-> new IllegalStateException(String.format("Pet profile %s not found", pid)));
        return pet1;
    }
}
