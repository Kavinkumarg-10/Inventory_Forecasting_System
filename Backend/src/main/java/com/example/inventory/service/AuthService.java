package com.example.inventory.service;

import com.example.inventory.entity.User;
import com.example.inventory.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder;

    public AuthService(UserRepository repo, BCryptPasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    // CUSTOMER SIGNUP
    public User signup(User user) {

        if (repo.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Customer already exists");
        }
        user.setRole("CUSTOMER");
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    // ADMIN + CUSTOMER LOGIN
    public String login(String email, String password) {

        User user = repo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!encoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // ROLE LOGIC
        if (email.equals("admin@gmail.com")) {
            return "ADMIN";
        } else {
            return "CUSTOMER";
        }
    }
}
