package com.seed.bean;

import jakarta.persistence.*;
import lombok.Data;
@Data
@Entity
@Table(name = "TENDORS")
public class Tendor {

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
    private String fullname;
    private String address;
    private String city;
    private String district;
    private String state;
    private String pincode;
    private String mobile;
    private String email;
    private String license;
    private String gst;
    private String goodstype;
    private String goodsdemand;
    private String salerate;
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
    private String gstcert;

    @Lob
    @Column(columnDefinition = "CLOB")
    private String licensecert;
}