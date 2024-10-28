package Spring20232.VetGo.filestore;

import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.util.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
public class FileStore {

    private final AmazonS3 s3;

    @Autowired
    public FileStore(AmazonS3 s3) {
        this.s3 = s3;
    }

    public void save(String path,
                     String fileName,
                     Optional<Map<String, String>> optionalMetadata,
                     InputStream inputStream) {
        ObjectMetadata objectMetadata = new ObjectMetadata();
        optionalMetadata.ifPresent(map -> {
            if (!map.isEmpty()) {
                map.forEach((key, value) -> objectMetadata.addUserMetadata(key, value));
            }
        });

        try {
            s3.putObject(path, fileName, inputStream, objectMetadata);
        } catch (AmazonServiceException e) {
            throw new IllegalStateException("Failed to save file to bucket in S3", e);
        }
    }

    public List<byte[]> download(String path, List<String> fileLink) {
        List<byte[]> fileList = new ArrayList<>();
        try {
            for (String s : fileLink) {
                fileList.add(IOUtils.toByteArray(s3.getObject(path, s).getObjectContent()));
            }

            return fileList;

        } catch (AmazonServiceException | IOException e) {
            throw new IllegalStateException("Failed to download files from bucket in S3", e);
        }
    }
}
