package com.furkankaya.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "measurements")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Measurement {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    @JsonBackReference
    private User user;

    private Integer height;
    private Integer weight;
    private Integer chest;
    private Integer waist;
    private Integer hip;

    @Column(name = "created_date", updatable = false)
    private LocalDate createdDate;

    @PrePersist
    protected void onCreate() {
        this.createdDate = LocalDate.now();
    }
}
