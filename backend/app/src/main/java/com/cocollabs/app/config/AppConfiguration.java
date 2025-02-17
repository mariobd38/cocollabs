package com.cocollabs.app.config;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
public class AppConfiguration {
    @Value("${APP_ACCESS_TOKEN_LABEL}")
    private String accessTokenLabel;

    @Value("${APP_REFRESH_TOKEN_LABEL}")
    private String refreshTokenLabel;

}
