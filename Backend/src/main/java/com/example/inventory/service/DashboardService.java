package com.example.inventory.service;

import com.example.inventory.dto.DashboardResponse;
import com.example.inventory.repository.ProductRepository;
import com.example.inventory.repository.PurchaseRepository;
import com.example.inventory.repository.PurchaseOrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class DashboardService {

    private final ProductRepository productRepo;
    private final PurchaseRepository purchaseRepo;
    private final PurchaseOrderRepository poRepo;
    private final ForecastService forecastService;

    public DashboardService(ProductRepository productRepo,
                            PurchaseRepository purchaseRepo,
                            PurchaseOrderRepository poRepo,
                            ForecastService forecastService) {
        this.productRepo = productRepo;
        this.purchaseRepo = purchaseRepo;
        this.poRepo = poRepo;
        this.forecastService = forecastService;
    }

    public DashboardResponse getDashboardStats() {

        DashboardResponse res = new DashboardResponse();

        // 1️⃣ Total Products
        res.setTotalProducts(productRepo.count());

        // 2️⃣ Low Stock (CRITICAL + WARNING)
        long lowStock = forecastService.forecastLast7Days()
                .stream()
                .filter(f ->
                        "CRITICAL".equals(f.getStatus()) ||
                                "WARNING".equals(f.getStatus())
                )
                .count();
        res.setLowStockCount(lowStock);

        // 3️⃣ Sales last 7 days
        LocalDate fromDate = LocalDate.now().minusDays(7);
        Long sales = purchaseRepo.getTotalSalesLast7Days(fromDate);
        res.setSalesLast7Days(sales == null ? 0 : sales);

        // 4️⃣ Pending Purchase Orders
        res.setPendingOrders(poRepo.countByStatus("OPEN"));

        return res;
    }
}
