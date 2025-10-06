package com.book.vault.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://127.0.0.1:5500") // Allows the front access to the API
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Methods allow
                        .allowedHeaders("*")  // Headers, like auth and content types
                        .allowCredentials(true); // Cookies or tokens allow
            }
        };
    }
}
