package com.cocollabs.app.rate_limit;

import io.github.bucket4j.Bucket;
import jakarta.servlet.http.HttpServletRequest;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class RateLimitAspect {
//    private final RateLimitService rateLimitService;
//    private final RateLimitKeyResolver keyResolver;
//
//    public RateLimitAspect(final RateLimitService rateLimitService,
//                           final RateLimitKeyResolver keyResolver) {
//        this.rateLimitService = rateLimitService;
//        this.keyResolver = keyResolver;
//    }
//
//    @Around("@annotation(rateLimit)")
//    public Object checkRateLimit(ProceedingJoinPoint joinPoint, RateLimit rateLimit) throws Throwable {
//        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.currentRequestAttributes()).getRequest();
//        String key = keyResolver.resolveKey(request, rateLimit.endpoint());
//
//        Bucket bucket = rateLimitService.resolveBucket(
//                key,
//                rateLimit.capacity(),
//                rateLimit.refillTokens(),
//                rateLimit.refillDuration());
//
//        if (!bucket.tryConsume(1)) {
//            throw new RateLimitExceededException();
//        }
//
//        return joinPoint.proceed();
//    }
}