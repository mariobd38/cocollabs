package com.cocollabs.app.aws;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "aws.s3.bucket")
public class S3Buckets {
    private String client;
}
