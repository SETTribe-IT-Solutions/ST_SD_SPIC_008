package com.seed.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.seed.bean.Tendor;
import com.seed.repository.TendorRepository;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/tendors")
public class TendorController {

    @Autowired
    private TendorRepository repo;

    // ADD / UPDATE
    @PostMapping
    public Tendor saveTender(@RequestBody Tendor tender) {
        return repo.save(tender);
    }

    // GET ALL (REPORT)
    @GetMapping
    public List<Tendor> getAll() {
        return repo.findAll();
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Tendor> updateTendor(
            @PathVariable Long id,
            @RequestBody Tendor tendorDetails) {

        Tendor tendor = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Tendor not found"));

        // Update fields
        tendor.setType(tendorDetails.getType());
        tendor.setFullname(tendorDetails.getFullname());
        tendor.setAddress(tendorDetails.getAddress());
        tendor.setCity(tendorDetails.getCity());
        tendor.setDistrict(tendorDetails.getDistrict());
        tendor.setState(tendorDetails.getState());
        tendor.setPincode(tendorDetails.getPincode());
        tendor.setMobile(tendorDetails.getMobile());
        tendor.setEmail(tendorDetails.getEmail());
        tendor.setLicense(tendorDetails.getLicense());
        tendor.setGst(tendorDetails.getGst());
        tendor.setGoodstype(tendorDetails.getGoodstype());
        tendor.setGoodsdemand(tendorDetails.getGoodsdemand());
        tendor.setSalerate(tendorDetails.getSalerate());
        tendor.setRemarks(tendorDetails.getRemarks());
        tendor.setPhoto(tendorDetails.getPhoto());
        tendor.setAadhar(tendorDetails.getAadhar());
        tendor.setPan(tendorDetails.getPan());
        tendor.setGstcert(tendorDetails.getGstcert());
        tendor.setLicensecert(tendorDetails.getLicensecert());

        Tendor updatedTendor = repo.save(tendor);

        return ResponseEntity.ok(updatedTendor);
    }
}


