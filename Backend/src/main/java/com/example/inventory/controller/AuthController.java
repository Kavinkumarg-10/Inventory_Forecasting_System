package com.example.inventory.controller;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import com.example.inventory.entity.User;
import com.example.inventory.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AuthController {

    private final AuthService service;
    private final AuthenticationManager authManager;

    public AuthController(AuthService service, AuthenticationManager authManager) {
        this.service = service;
        this.authManager = authManager;
    }

    // ===================== SIGNUP =====================
    @PostMapping("/signup")
    public User signup(@Valid @RequestBody User user) {
        return service.signup(user);
    }

    // ===================== LOGIN (REAL AUTH) =====================
    @PostMapping("/login")
    public Map<String, String> login(
            @RequestBody User user,
            HttpServletRequest request
    ) {

        // 1️⃣ Authenticate credentials
        Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        user.getPassword()
                )
        );

        // 2️⃣ Store authentication in SecurityContext
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(authentication);
        SecurityContextHolder.setContext(securityContext);

        // 3️⃣ Store SecurityContext in HTTP Session  🔥 THIS IS THE KEY
        request.getSession(true).setAttribute(
                HttpSessionSecurityContextRepository.SPRING_SECURITY_CONTEXT_KEY,
                securityContext
        );

        // 4️⃣ Role logic (your existing logic)
        String role = service.login(user.getEmail(), user.getPassword());

        return Map.of(
                "role", role,
                "email", authentication.getName()
        );
    }
    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {

        var session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }

        SecurityContextHolder.clearContext();

        // 🔥 OPTIONAL: remove JSESSIONID cookie
        Cookie cookie = new Cookie("JSESSIONID", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");
        cookie.setHttpOnly(true);
        response.addCookie(cookie);
    }



}
