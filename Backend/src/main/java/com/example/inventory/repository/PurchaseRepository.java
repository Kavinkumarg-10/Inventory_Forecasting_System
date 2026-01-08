package com.example.inventory.repository;

import com.example.inventory.entity.Purchase;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;

public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

    // 🔹 Customer purchases
    List<Purchase> findByCustomerEmail(String email);

    // 🔮 Forecasting (per product)
    @Query("""
        SELECT p.productName, SUM(p.quantity)
        FROM Purchase p
        WHERE p.purchaseDate >= :fromDate
        GROUP BY p.productName
    """)
    List<Object[]> findLast7DaysDemand(@Param("fromDate") LocalDate fromDate);

    // 📊 Dashboard (total sales)
    @Query("""
        SELECT COALESCE(SUM(p.quantity), 0)
        FROM Purchase p
        WHERE p.purchaseDate >= :fromDate
    """)
    Long getTotalSalesLast7Days(@Param("fromDate") LocalDate fromDate);
}
