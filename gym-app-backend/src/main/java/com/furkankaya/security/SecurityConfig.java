package com.furkankaya.security;

import com.furkankaya.config.ApplicationConfig;
import com.furkankaya.model.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

        private final ApplicationConfig applicationConfig;
        private final JwtAuthFilter jwtAuthFilter;

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                return http
                                .cors(Customizer.withDefaults())
                                .csrf(AbstractHttpConfigurer::disable)
                                .formLogin(AbstractHttpConfigurer::disable)
                                .authorizeHttpRequests(x -> x
                                                .requestMatchers(
                                                                "/api/v1/generateToken",
                                                                "/api/v1/refreshToken",
                                                                "/api/v1/changePassword",
                                                                "/api/v1/isAllowedToPass",
                                                                "/api/v1/prices",
                                                                "/api/v1/sendEmail")
                                                .permitAll()
                                                .requestMatchers(
                                                                "/api/v1/auth/**",
                                                                "/v2/api-docs",
                                                                "/v3/api-docs",
                                                                "/v3/api-docs/**",
                                                                "/swagger-resources",
                                                                "/swagger-resources/**",
                                                                "/configuration/ui",
                                                                "/configuration/security",
                                                                "/swagger-ui/**",
                                                                "/webjars/**",
                                                                "/swagger-ui.html")
                                                .permitAll()

                                )
                                .authorizeHttpRequests(x -> x
                                                .requestMatchers("/api/v1/updateDate")
                                                .hasRole(Role.ROLE_ADMIN.getValue())
                                                .requestMatchers("/api/v1/days")
                                                .hasRole(Role.ROLE_USER.getValue())
                                                .requestMatchers("/api/v1/insides")
                                                .hasRole(Role.ROLE_ADMIN.getValue())
                                                .requestMatchers("/api/v1/priceUpdate")
                                                .hasRole(Role.ROLE_ADMIN.getValue())
                                                .requestMatchers("/api/v1/measurements")
                                                .hasRole(Role.ROLE_USER.getValue())
                                                .requestMatchers("/api/v1/measurementCreate")
                                                .hasRole(Role.ROLE_ADMIN.getValue())
                                                .requestMatchers("/api/v1/saveUser")
                                                .hasRole(Role.ROLE_ADMIN.getValue())
                                                .requestMatchers("/api/v1/hello")
                                                .hasAnyRole(Role.ROLE_ADMIN.getValue(), Role.ROLE_USER.getValue())
                                                .requestMatchers("/api/v1/ping/**")
                                                .hasAnyRole(Role.ROLE_ADMIN.getValue(), Role.ROLE_USER.getValue())
                                                .requestMatchers("/api/v1/**")
                                                .hasRole(Role.ROLE_ADMIN.getValue())
                                                .requestMatchers("/api/v1/saveAdmin/**")
                                                .hasRole(Role.ROLE_ADMIN.getValue()))
                                .authorizeHttpRequests(x -> x.anyRequest().authenticated())
                                .sessionManagement(x -> x.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authenticationProvider(applicationConfig.authenticationProvider())
                                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class)
                                .build();
        }

        @Configuration(proxyBeanMethods = false)
        public class WebConfig implements WebMvcConfigurer {
                @Override
                public void addCorsMappings(CorsRegistry registry) {
                        registry.addMapping("/**");
                }
        }

}
