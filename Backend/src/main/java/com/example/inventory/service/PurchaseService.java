package com.example.inventory.service;

import com.example.inventory.entity.Product;
import com.example.inventory.entity.Purchase;
import com.example.inventory.repository.ProductRepository;
import com.example.inventory.repository.PurchaseRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PurchaseService {

    private final ProductRepository productRepo;
    private final PurchaseRepository purchaseRepo;

    public PurchaseService(ProductRepository productRepo, PurchaseRepository purchaseRepo) {
        this.productRepo = productRepo;
        this.purchaseRepo = purchaseRepo;
    }

    @Transactional
    public Purchase buyProduct(Long productId,
                               int quantity,
                               LocalDate purchaseDate,
                               String customerEmail) {

        Product product = productRepo.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (quantity <= 0) {
            throw new RuntimeException("Quantity must be at least 1");
        }

        if (product.getOnHand() < quantity) {
            throw new RuntimeException("Insufficient stock");
        }

        // 🔻 Reduce stock
        product.setOnHand(product.getOnHand() - quantity);
        productRepo.save(product);

        // 🧾 Create purchase record
        Purchase purchase = new Purchase();
        purchase.setProductName(product.getName());
        purchase.setCategory(product.getCategory());
        purchase.setQuantity(quantity);
        purchase.setUnitPrice(product.getUnitPrice());
        purchase.setTotalPrice(product.getUnitPrice() * quantity);
        purchase.setCustomerEmail(customerEmail);
        purchase.setPurchaseDate(purchaseDate);
        return purchaseRepo.save(purchase);
    }

    public List<Purchase> getPurchases(String customerEmail) {
        return purchaseRepo.findByCustomerEmail(customerEmail);
    }
}
