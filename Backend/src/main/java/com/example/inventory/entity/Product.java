package com.example.inventory.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;

    @Column(name = "unit_price", nullable = false)
    private int unitPrice;

    @Column(name = "on_hand", nullable = false)
    private int onHand;

    @Column(name = "reorder_point", nullable = false)
    private int reorderPoint;

    @Column(name = "reorder_quantity", nullable = false)
    private int reorderQuantity;

    // getters & setters

}

