package com.example.inventory.service;

import com.example.inventory.dto.ForecastResponse;
import com.example.inventory.entity.Product;
import com.example.inventory.entity.PurchaseOrder;
import com.example.inventory.repository.ProductRepository;
import com.example.inventory.repository.PurchaseOrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class PurchaseOrderService {

    private final ForecastService forecastService;
    private final PurchaseOrderRepository poRepo;
    private final ProductRepository productRepo;

    public PurchaseOrderService(
            ForecastService forecastService,
            PurchaseOrderRepository poRepo,
            ProductRepository productRepo
    ) {
        this.forecastService = forecastService;
        this.poRepo = poRepo;
        this.productRepo = productRepo;
    }

    // 🔹 Generate Purchase Orders from CRITICAL forecast
    public List<PurchaseOrder> generateOrders() {

        List<ForecastResponse> forecast = forecastService.forecastLast7Days();
        List<PurchaseOrder> result = new ArrayList<>();

        for (ForecastResponse f : forecast) {
            if ("CRITICAL".equals(f.getStatus())) {

                boolean exists = poRepo.existsByProductNameAndStatus(
                        f.getProductName(), "OPEN"
                );

                if (exists) continue; // 🔴 prevent duplicates

                PurchaseOrder po = new PurchaseOrder();
                po.setProductName(f.getProductName());
                po.setCurrentStock(f.getOnHand());
                po.setReorderQuantity(f.getSuggestedReorderQty());
                po.setStatus("OPEN");
                po.setCreatedDate(LocalDate.now());

                result.add(poRepo.save(po));
            }
        }
        return result;
    }


    // 🔹 Get only OPEN orders
    public List<PurchaseOrder> getOpenOrders() {
        return poRepo.findByStatus("OPEN");
    }

    // 🔹 Get one order
    public PurchaseOrder getById(Long id) {
        return poRepo.findById(id).orElseThrow();
    }

    // 🔹 Complete order → update inventory
    @Transactional
    public void complete(Long id) {

        PurchaseOrder po = poRepo.findById(id).orElseThrow();

        Product product = productRepo
                .findByName(po.getProductName())
                .orElseThrow();

        // ✅ Add stock to inventory
        product.setOnHand(
                product.getOnHand() + po.getReorderQuantity()
        );
        productRepo.save(product);

        // ✅ Mark PO as completed
        po.setStatus("COMPLETED");
        poRepo.save(po);
    }
}
