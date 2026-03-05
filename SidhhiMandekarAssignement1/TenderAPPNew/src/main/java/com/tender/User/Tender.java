package com.tender.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Table(name = "TENDER")
@Data
public class Tender {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tender_seq_gen")
    @SequenceGenerator(
            name = "tender_seq_gen",
            sequenceName = "TENDER_SEQ",
            allocationSize = 1
    )
    private Long id;

    private String type;
    private String fullName;
    private String mobile;
    private String email;
    private String address;
    private String state;
    private String district;
    private String pincode;
    private String license;
    private String gst;
    private String goodsType;
    private Double demand;
    private Double rate;
    private Double total;
    private String remarks;

    @Lob
    @Column(columnDefinition = "CLOB")
    private String photo;

    @Lob
    @Column(columnDefinition = "CLOB")
    private String aadhar;

    @Lob
    @Column(columnDefinition = "CLOB")
    private String pan;

    @Lob
    @Column(columnDefinition = "CLOB")
    private String gstFile;

    @Lob
    @Column(columnDefinition = "CLOB")
    private String licenseFile;
}