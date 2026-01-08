package com.example.inventory.dto;

import lombok.Data;

@Data
public class DashboardResponse {
    private long totalProducts;
    private long lowStockCount;
    private long salesLast7Days;
    private long pendingOrders;
}
