package com.furkankaya.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "prices")
@Getter
@Setter
public class Price {

    @Id
    private Long id = 100L;

    @Column(name = "one_months")
    private Long oneMonths;

    @Column(name = "three_months")
    private Long threeMonths;

    @Column(name = "six_months")
    private Long sixMonths;

    @Column(name = "twelve_months")
    private Long twelveMonths;

}
