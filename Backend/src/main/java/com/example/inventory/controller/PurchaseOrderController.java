package com.example.inventory.controller;

import com.example.inventory.entity.PurchaseOrder;
import com.example.inventory.service.PurchaseOrderService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/purchase-orders")
//@CrossOrigin(origins = "http://localhost:5173")
public class PurchaseOrderController {

    private final PurchaseOrderService service;

    public PurchaseOrderController(PurchaseOrderService service) {
        this.service = service;
    }

    // 🔹 View open orders
    @GetMapping
    public List<PurchaseOrder> getOrders() {
        return service.getOpenOrders();
    }

    // 🔹 Generate from forecast
    @PostMapping("/generate")
    public List<PurchaseOrder> generate() {
        return service.generateOrders();
    }

    // 🔹 Get one order
    @GetMapping("/{id}")
    public PurchaseOrder getOne(@PathVariable Long id) {
        return service.getById(id);
    }

    // 🔹 Complete order
    @PostMapping("/{id}/complete")
    public void complete(@PathVariable Long id) {
        service.complete(id);
    }
}
