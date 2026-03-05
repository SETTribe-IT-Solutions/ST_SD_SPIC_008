package com.phase.controller;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.phase.entity.Tender;
import com.phase.service.TenderService;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMethod;



@RestController
@RequestMapping("/api/tenders")

@RequiredArgsConstructor
public class TenderController {

    private final TenderService tenderService;

//    @PostMapping
//    public Tender create(@ModelAttribute Tender tender) {
//        return tenderService.saveTender(tender);
//    }

    @GetMapping
    public List<Tender> getAll() {
        return tenderService.getAllTenders();
    }

//    @PutMapping("/{id}")
//    public Tender update(@PathVariable Long id, @ModelAttribute Tender tender) {
//        return tenderService.updateTender(id, tender);
//    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        tenderService.deleteTender(id);
    }
    
    @PostMapping(consumes = "multipart/form-data")
    public Tender create(@ModelAttribute Tender tender) {
        return tenderService.saveTender(tender);
    }

    @PutMapping(value = "/{id}", consumes = "multipart/form-data")
    public Tender update(@PathVariable Long id, @ModelAttribute Tender tender) {
        return tenderService.updateTender(id, tender);
    }
    
    @GetMapping("/test")
    public String test() {
        return "API Working";
    }
}