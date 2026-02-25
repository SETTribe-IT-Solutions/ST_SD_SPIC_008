package com.entity;

import jakarta.persistence.*;
import lombok.Data;
@Data
@Entity
@Table(name = "tender")
public class Tender {

    @Id
    @GeneratedValue(
        strategy = GenerationType.SEQUENCE,
        generator = "tender_seq"
    )
    @SequenceGenerator(
        name = "tender_seq",
        sequenceName = "TENDER_SEQ",
        allocationSize = 1
    )
    private Long id;

    private String type;
    private String fullName;
    private String address;
    private String city;
    private String district;
    private String state;
    private String pincode;
    private String mobile;
    private String email;
    private String license;
    private String gst;
    private String goodsType;
    private String goodsDemand;
    private String saleRate;
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
    private String gstCert;

    @Lob
    @Column(columnDefinition = "CLOB")
    private String licenseCert;
}