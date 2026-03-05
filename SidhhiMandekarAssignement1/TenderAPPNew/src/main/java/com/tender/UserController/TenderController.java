package com.tender.UserController;


import java.util.List;
import java.util.Optional;
import org.springframework.web.bind.annotation.*;
import com.tender.User.Tender;
import com.tender.UserRepository.TenderRepository;
import com.tender.service.TenderService;

@RestController //handles REST APIs
@RequestMapping("/api/tender") //Base URL
@CrossOrigin(origins = "http://localhost:3000")
public class TenderController {

	
	//Constructor injection
    private final TenderRepository repository;
    private final TenderService tenderService;

    // ✅ Constructor Injection 
    public TenderController(TenderRepository repository,
                            TenderService tenderService) {
        this.repository = repository;
        this.tenderService = tenderService;
    }

    
    
    @PostMapping("/save")
    public Tender saveTender(@RequestBody Tender tender) {

        if (tender.getRate() != null && tender.getDemand() != null) {
            tender.setTotal(tender.getRate() * tender.getDemand());
        }

        return repository.save(tender);
    }

    // ================= GET =================
    @GetMapping
    public List<Tender> getAllTenders() {
        return repository.findAll();
    }

    // ================= UPDATE =================
 // ✅ UPDATE METHOD
    @PutMapping("/{id}")
    public Tender update(Long id, Tender tender) {

        Optional<Tender> existing = repository.findById(id);

        if (existing.isPresent()) {

            Tender t = existing.get();

            t.setType(tender.getType());
            t.setFullName(tender.getFullName());
            t.setMobile(tender.getMobile());
            t.setEmail(tender.getEmail());
            t.setAddress(tender.getAddress());
            t.setState(tender.getState());
            t.setDistrict(tender.getDistrict());
            t.setPincode(tender.getPincode());
            t.setLicense(tender.getLicense());
            t.setGst(tender.getGst());
            t.setGoodsType(tender.getGoodsType());
            t.setDemand(tender.getDemand());
            t.setRate(tender.getRate());
            t.setTotal(tender.getDemand() * tender.getRate());
            t.setRemarks(tender.getRemarks());

            return repository.save(t);
        } else {
            throw new RuntimeException("Tender not found with id " + id);
        }
    }


    @DeleteMapping("/{id}")
    public String deleteTender(@PathVariable("id") Long id) {
        tenderService.delete(id);
        return "Deleted Successfully";
    }
}