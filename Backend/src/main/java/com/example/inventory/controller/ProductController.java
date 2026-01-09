package com.example.inventory.controller;

import com.example.inventory.entity.Product;
import com.example.inventory.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
//@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService service;

    public ProductController(ProductService service) {
        this.service = service;
    }

    // ✅ CREATE (ADD MODE)
    @PostMapping
    public Product add(@RequestBody Product product) {
        return service.add(product);
    }

    // ✅ UPDATE (EDIT MODE)
    @PutMapping("/{id}")
    public Product update(@PathVariable Long id, @RequestBody Product product) {
        product.setId(id);
        return service.update(product);
    }

    @GetMapping
    public List<Product> getAll() {
        return service.getAll();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}
