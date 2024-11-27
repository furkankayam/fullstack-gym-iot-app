package com.furkankaya.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonManagedReference
    private Set<Measurement> measurements;

    private String password;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(unique = true)
    private String email;

    private boolean accountNonExpired = true;
    private boolean isEnabled = true;
    private boolean accountNonLocked = true;
    private boolean credentialsNonExpired = true;

    @ElementCollection(targetClass = Role.class, fetch = FetchType.EAGER)
    @JoinTable(name = "authorities", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "role", nullable = false)
    @Enumerated(EnumType.STRING)
    private Set<Role> authorities;

    private boolean inside;

    @Column(unique = true)
    private String uuid;

    @Column(name = "created_date", updatable = false)
    private LocalDate createdDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @PrePersist
    protected void onCreate() {
        this.createdDate = LocalDate.now();
    }

    @Override
    public String getUsername() {
        return this.email;
    }
}
