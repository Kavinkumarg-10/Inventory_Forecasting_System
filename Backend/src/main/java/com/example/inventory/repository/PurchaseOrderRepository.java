package com.example.inventory.repository;

import com.example.inventory.entity.PurchaseOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PurchaseOrderRepository
        extends JpaRepository<PurchaseOrder, Long> {

    List<PurchaseOrder> findByStatus(String status);
    Optional<PurchaseOrder> findByProductNameAndStatus(String productName, String status);
    boolean existsByProductNameAndStatus(String productName, String status);
    long countByStatus(String status);


}
