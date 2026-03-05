package com.phase.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Entity
@Table(name = "TENDERS")
@Data
public class Tender {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private String fullName;
    private String city;
    private String district;
    private String state;
    private String pincode;
    private String mobile;
    private String email;

    private String licenseAvailable;
    private String licenseNumber;

    private String gstAvailable;
    private String gstNumber;

    private String goodsType;
    private String goodsDemand;
    private String saleRate;

    @Transient
    private MultipartFile photo;

    @Transient
    private MultipartFile aadhar;

    @Transient
    private MultipartFile pan;

    @Transient
    private MultipartFile gstCert;

    @Transient
    private MultipartFile licenseCert;

    private String remarks;
}