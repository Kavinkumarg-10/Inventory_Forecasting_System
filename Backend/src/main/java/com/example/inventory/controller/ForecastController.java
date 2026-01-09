package com.example.inventory.controller;

import com.example.inventory.dto.ForecastResponse;
import com.example.inventory.service.ForecastService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/forecast")
//@CrossOrigin(origins = "http://localhost:5173")
public class ForecastController {

    private final ForecastService service;

    public ForecastController(ForecastService service) {
        this.service = service;
    }

    @GetMapping
    public List<ForecastResponse> forecast() {
        return service.forecastLast7Days();
    }
}
