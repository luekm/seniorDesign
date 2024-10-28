package Spring20232.VetGo.service;

import Spring20232.VetGo.model.Role;
import Spring20232.VetGo.model.User;
import Spring20232.VetGo.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserServiceInterface {

    @Autowired
    private UserRepository userRepository;

    @Override
    @Transactional
    public void saveUser(User user) {

        if (user.getUserRoles() == null || user.getUserRoles().isEmpty())
            throw new IllegalArgumentException("User must have at least one role");

        for (Role role : user.getUserRoles()) {
            if (!role.getName().startsWith("ROLE_")) {
                role.setName("ROLE_" + role.getName());
            }
        }

        userRepository.save(user);
    }

    @Transactional
    public Boolean setPassword(Long uid, String newPassword) {
        User user = userRepository.findById(uid).orElse(null);

        if (user == null)
            return false;

        BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
        String encodedPassword = bcrypt.encode(newPassword);
        System.out.println(bcrypt.matches("123456", encodedPassword));
        System.out.println(bcrypt.matches(newPassword, encodedPassword));
        System.out.println(encodedPassword);
        System.out.println("Before password: " + user.getPassword());
        System.out.println("Before password: " + user.getPassword());
        user.setPassword(encodedPassword);
        System.out.println("After password: " + user.getPassword());
        System.out.println("After password 2: " + user.getPassword());
//        userRepository.save(user);
        user = userRepository.findById(uid).orElse(null);
        System.out.println("After password 3: " + (user.getPassword()));
        return true;
    }

}
