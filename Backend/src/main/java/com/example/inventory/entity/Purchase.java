package com.example.inventory.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "purchases")
public class Purchase {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;
    private String category;

    private int quantity;
    private int unitPrice;
    private int totalPrice;

    private String customerEmail;

    // ✅ NEW FIELD
    private LocalDate purchaseDate;
}

