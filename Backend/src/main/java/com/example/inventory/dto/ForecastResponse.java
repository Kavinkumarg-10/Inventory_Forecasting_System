package com.example.inventory.dto;

import lombok.Data;

@Data
public class ForecastResponse {

    private String productName;
    private int onHand;
    private double avgDailyDemand;
    private double daysToStockOut;
    private int suggestedReorderQty;
    private String status;


    // getters & setters
}
