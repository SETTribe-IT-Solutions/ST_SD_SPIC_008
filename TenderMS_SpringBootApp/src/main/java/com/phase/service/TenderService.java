package com.phase.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.phase.entity.Tender;
import com.phase.repo.TenderRepo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TenderService {

    private final TenderRepo tenderRepository;

    public Tender saveTender(Tender tender) {
        return tenderRepository.save(tender);
    }

    public List<Tender> getAllTenders() {
        return tenderRepository.findAll();
    }

    public Tender updateTender(Long id, Tender tender) {
        tender.setId(id);
        return tenderRepository.save(tender);
    }

    public void deleteTender(Long id) {
        tenderRepository.deleteById(id);
    }
}
