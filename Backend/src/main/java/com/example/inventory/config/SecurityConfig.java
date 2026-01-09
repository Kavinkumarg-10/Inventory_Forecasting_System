package com.example.inventory.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    // 🔐 MAIN SECURITY RULES
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth

                        // 🔓 Auth APIs
                        .requestMatchers("/api/auth/**").permitAll()

                        // 🔐 Admin APIs
                        .requestMatchers("/api/admin/**").hasRole("ADMIN")

                        // 🔐 Customer APIs
                        .requestMatchers("/api/purchases/**").hasRole("CUSTOMER")

                        // 🔐 Products require login
                        .requestMatchers("/api/products/**").authenticated()

                        // 🔒 Everything else requires login
                        .anyRequest().authenticated()
                )

                .formLogin(form -> form.disable())   // REST login
                .httpBasic(basic -> basic.disable());

        return http.build();
    }

    // 🔑 REQUIRED for manual authentication in AuthController
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }
}
