package com.example.inventory.controller;

import com.example.inventory.dto.DashboardResponse;
import com.example.inventory.service.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/dashboard")
//@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final DashboardService service;

    public DashboardController(DashboardService service) {
        this.service = service;
    }

    @GetMapping
    public DashboardResponse dashboard() {
        return service.getDashboardStats();
    }
}
