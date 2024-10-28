package Spring20232.VetGo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

@SpringBootApplication (exclude = {SecurityAutoConfiguration.class})
@EntityScan
public class VetGoApplication {

	public static void main(String[] args) {
		SpringApplication.run(VetGoApplication.class, args);
	}

}
