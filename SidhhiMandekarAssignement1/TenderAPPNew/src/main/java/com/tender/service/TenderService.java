package com.tender.service;

import java.util.List;

import org.springframework.stereotype.Service;


import com.tender.User.Tender;
import com.tender.UserRepository.TenderRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TenderService {

    private final TenderRepository repository;

    public Tender saveTender(Tender tender) {
        return repository.save(tender);
    }

    public List<Tender> getAll() {
        return repository.findAll();
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Tender update(Long id, Tender tender) {
        Tender existing = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tender Not Found"));

        existing.setFullName(tender.getFullName());
        existing.setMobile(tender.getMobile());
        existing.setEmail(tender.getEmail());
        existing.setGoodsType(tender.getGoodsType());
        existing.setDemand(tender.getDemand());
        existing.setRate(tender.getRate());
        existing.setTotal(tender.getTotal());
        existing.setRemarks(tender.getRemarks());

        return repository.save(existing);
    }
}