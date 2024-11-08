package com.stringwiz.app.user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOrigins("http://localhost:3000")
//                        .allowedMethods("*")
//                        .allowedHeaders("Content-Type", "Authorization", "X-Requested-With", "Origin", "Accept")
//                        .allowCredentials(true);
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:3000") // Allow requests from any origin
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow specific HTTP methods
                        .allowedHeaders("Content-Type", "Authorization", "X-Requested-With", "Origin", "Accept")
                        .allowCredentials(true);
            }
        };
    }
}