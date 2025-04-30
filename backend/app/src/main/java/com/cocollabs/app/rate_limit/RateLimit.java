package com.cocollabs.app.rate_limit;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface RateLimit {
    String endpoint() default "app";
    long capacity();
    long refillTokens();
    long refillDuration() default 1; // in minutes
}
