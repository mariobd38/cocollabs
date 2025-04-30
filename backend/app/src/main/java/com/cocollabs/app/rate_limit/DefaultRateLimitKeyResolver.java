package com.cocollabs.app.rate_limit;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

@Component
public class DefaultRateLimitKeyResolver implements RateLimitKeyResolver {
    //private final JwtUtil jwtUtil;
    //private final AppConfiguration appConfiguration;

//    public DefaultRateLimitKeyResolver(JwtUtil jwtUtil, AppConfiguration appConfiguration) {
//        this.jwtUtil = jwtUtil;
//        this.appConfiguration = appConfiguration;
//    }

    @Override
    public String resolveKey(HttpServletRequest request, String endpoint) {
        String ip = request.getRemoteAddr();

        if (endpoint.equals("auth")) { // has no refresh token
            return ip;
        }

//        String refreshToken = CookieUtil.getCookieValue(request, appConfiguration.getRefreshTokenLabel());
//        if (refreshToken != null) {
//            try {
//                return ip + ":" + jwtUtil.getEmailFromToken(refreshToken);
//            } catch (Exception e) {
//                throw new InvalidRefreshTokenException("Invalid refresh token");
//            }
//        }

        return ip;
    }
}
