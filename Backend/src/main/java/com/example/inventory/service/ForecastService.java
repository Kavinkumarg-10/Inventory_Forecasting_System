package com.example.inventory.service;

import com.example.inventory.dto.ForecastResponse;
import com.example.inventory.entity.Product;
import com.example.inventory.repository.ProductRepository;
import com.example.inventory.repository.PurchaseRepository;
import lombok.Data;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
@Data
@Service
public class ForecastService {

    private final PurchaseRepository purchaseRepo;
    private final ProductRepository productRepo;

    public ForecastService(PurchaseRepository purchaseRepo,
                           ProductRepository productRepo) {
        this.purchaseRepo = purchaseRepo;
        this.productRepo = productRepo;
    }

    public List<ForecastResponse> forecastLast7Days() {

        LocalDate fromDate = LocalDate.now().minusDays(7);
        List<Object[]> sales = purchaseRepo.findLast7DaysDemand(fromDate);

        Map<String, Integer> demandMap = new HashMap<>();
        for (Object[] row : sales) {
            demandMap.put((String) row[0], ((Long) row[1]).intValue());
        }

        List<ForecastResponse> result = new ArrayList<>();

        for (Product product : productRepo.findAll()) {

            int total7Days = demandMap.getOrDefault(product.getName(), 0);
            double avgDaily = total7Days / 7.0;

            double daysLeft = avgDaily == 0
                    ? 999.0
                    : Math.round((product.getOnHand() / avgDaily) * 100.0) / 100.0;


            ForecastResponse fr = new ForecastResponse();
            fr.setProductName(product.getName());
            fr.setOnHand(product.getOnHand());
            fr.setAvgDailyDemand(avgDaily);
            fr.setDaysToStockOut(daysLeft);

            if (daysLeft <= 3) {
                fr.setStatus("CRITICAL");
                fr.setSuggestedReorderQty(product.getReorderQuantity());
            } else if (daysLeft <= 7) {
                fr.setStatus("WARNING");
                fr.setSuggestedReorderQty(product.getReorderQuantity() / 2);
            } else {
                fr.setStatus("SAFE");
                fr.setSuggestedReorderQty(0);
            }

            result.add(fr);
        }

        return result;
    }
}
