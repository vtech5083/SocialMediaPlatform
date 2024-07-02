package com.Group10.SocialMediaPlatform.Controller;

import com.Group10.SocialMediaPlatform.model.User;
import com.Group10.SocialMediaPlatform.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            User loggedInUser = userService.login(user.getEmail(), user.getPassword());
            return ResponseEntity.ok(loggedInUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody User user) {
        try {
            User updatedUser = userService.resetPassword(user.getEmail(), user.getSecurityAnswer(), user.getPassword());
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public User getUserById(@PathVariable Integer userId) {
        return userService.getUserById(userId);
    }

    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    @PatchMapping("/{userId}")
    public User updateUser(@PathVariable Integer userId, @RequestBody User user) {
        user.setUserId(userId);
        return userService.updateUser(user);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable Integer userId) {
        userService.deleteUser(userId);
    }
}
