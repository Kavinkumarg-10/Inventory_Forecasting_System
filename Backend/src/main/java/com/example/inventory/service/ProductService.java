package com.example.inventory.service;

import com.example.inventory.entity.Product;
import com.example.inventory.repository.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    private final ProductRepository repo;

    public ProductService(ProductRepository repo) {
        this.repo = repo;
    }

    // ✅ ADD PRODUCT (ADD STOCK)
    @Transactional
    public Product add(Product incoming) {

        Optional<Product> optional = repo.findByName(incoming.getName());

        if (optional.isPresent()) {
            Product existing = optional.get();

            existing.setOnHand(existing.getOnHand() + incoming.getOnHand());
            existing.setUnitPrice(incoming.getUnitPrice());
            existing.setCategory(incoming.getCategory());
            existing.setReorderPoint(incoming.getReorderPoint());
            existing.setReorderQuantity(incoming.getReorderQuantity());

            return repo.save(existing);
        }

        return repo.save(incoming);
    }

    // ✅ UPDATE PRODUCT (REPLACE STOCK)
    @Transactional
    public Product update(Product incoming) {
        return repo.save(incoming);
    }

    public List<Product> getAll() {
        return repo.findAll();
    }

    public void delete(Long id) {
        repo.deleteById(id);
    }
}
