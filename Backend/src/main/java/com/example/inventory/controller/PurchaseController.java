package com.example.inventory.controller;

import com.example.inventory.entity.Purchase;
import com.example.inventory.service.PurchaseService;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/purchases")
//@CrossOrigin(origins = "http://localhost:5173")
public class PurchaseController {

    private final PurchaseService service;

    public PurchaseController(PurchaseService service) {
        this.service = service;
    }

    // ===================== BUY PRODUCT =====================
    @PostMapping
    public Purchase buy(@RequestBody Map<String, String> body, Principal principal) {

        if (principal == null) {
            throw new RuntimeException("User not authenticated");
        }

        Long productId = Long.valueOf(body.get("productId"));
        int quantity = Integer.parseInt(body.get("quantity"));
        LocalDate purchaseDate = LocalDate.parse(body.get("purchaseDate"));

        return service.buyProduct(
                productId,
                quantity,
                purchaseDate,
                principal.getName()
        );
    }


    // ===================== VIEW MY PURCHASES =====================
    @GetMapping
    public List<Purchase> myPurchases(Principal principal) {

        // ✅ No login yet → return empty list
        if (principal == null) {
            return List.of();
        }

        return service.getPurchases(principal.getName());
    }
}
