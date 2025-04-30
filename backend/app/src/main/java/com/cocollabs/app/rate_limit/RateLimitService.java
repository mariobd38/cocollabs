package com.cocollabs.app.rate_limit;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
public class RateLimitService {
    private final ConcurrentMap<String, Bucket> buckets = new ConcurrentHashMap<>();

    public Bucket resolveBucket(String key, long capacity, long refillTokens, long refillDuration) {
        return buckets.computeIfAbsent(key, k -> Bucket.builder()
                .addLimit(Bandwidth.builder()
                        .capacity(capacity)
                        .refillGreedy(refillTokens, Duration.ofMinutes(refillDuration))
                        .build())
                .build());
    }
}
