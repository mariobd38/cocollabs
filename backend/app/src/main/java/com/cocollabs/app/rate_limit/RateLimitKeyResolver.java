package com.cocollabs.app.rate_limit;

import jakarta.servlet.http.HttpServletRequest;

public interface RateLimitKeyResolver {
    String resolveKey(HttpServletRequest request, String endpoint);
}
