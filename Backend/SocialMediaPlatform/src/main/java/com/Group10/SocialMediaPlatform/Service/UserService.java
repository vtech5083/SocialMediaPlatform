package com.Group10.SocialMediaPlatform.Service;

import com.Group10.SocialMediaPlatform.model.User;
import com.Group10.SocialMediaPlatform.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }
    public User login(String email, String password) {
        Optional<User> user = userRepository.findByEmail(email);


        if (!user.get().getPassword().equals(password)) {
            return null;
        }

        return user.orElse(null);
    }

    public User resetPassword(String email, String securityAnswer, String newPassword) {
        Optional<User> user = userRepository.findByEmail(email);

        if (!user.get().getSecurityAnswer().equals(securityAnswer)) {
            throw new IllegalArgumentException("Security answer is incorrect.");
        }

        user.get().setPassword(newPassword);

        User savedUser = userRepository.save(user.get());
        return savedUser;
    }
    public User getUserById(Integer userId) {
        return userRepository.findById(userId).orElse(null);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUser(User user) {
        user.setPassword(userRepository.findByEmail(user.getEmail()).get().getPassword());
        return userRepository.save(user);
    }

    public void deleteUser(Integer userId) {
        userRepository.deleteById(userId);
    }
}
