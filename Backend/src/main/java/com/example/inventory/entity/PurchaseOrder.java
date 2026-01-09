package com.example.inventory.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Data
@Entity
@Table(name = "purchase_orders")
public class PurchaseOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;

    private int currentStock;

    private int reorderQuantity;

    private String status;   // OPEN / COMPLETED

    private LocalDate createdDate;
}
