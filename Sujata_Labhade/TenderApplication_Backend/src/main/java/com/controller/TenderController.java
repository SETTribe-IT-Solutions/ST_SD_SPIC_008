package com.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.entity.Tender;
import com.repository.TenderRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/tender")
public class TenderController {

    @Autowired
    private TenderRepository repo;

    // ADD / UPDATE
    @PostMapping
    public Tender saveTender(@RequestBody Tender tender) {
        return repo.save(tender);
    }

    // GET ALL (REPORT)
    @GetMapping
    public List<Tender> getAll() {
        return repo.findAll();
    }

    // GET BY ID (EDIT – MUST)
    @GetMapping("/{id}")
    public Tender getById(@PathVariable Long id) {
        return repo.findById(id).orElse(null);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}