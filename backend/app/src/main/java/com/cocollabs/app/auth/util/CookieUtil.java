package com.cocollabs.app.auth.util;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;

import java.util.Arrays;

public final class CookieUtil {
    private static final Logger logger = LoggerFactory.getLogger(CookieUtil.class);

    private CookieUtil() {
        throw new AssertionError("CookieUtil class should not be instantiated");
    }

    public static String getCookieValue(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            return Arrays.stream(cookies)
                    .filter(cookie -> cookie.getName().equals(name))
                    .map(Cookie::getValue)
                    .findFirst()
                    .orElseGet(() -> {
                        logger.debug("Cookie not found: {}", name);
                        return null;
                    });
        }
        logger.debug("No cookies found in the request");
        return null;
    }

    public static void addCookie(HttpServletResponse response, String name, String value, long maxAge) {
        ResponseCookie jwtCookie = editCookie(name, value, maxAge);
        response.addHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());
    }

    public static void deleteCookie(HttpServletResponse response, String name) {
        ResponseCookie deletedCookie = editCookie(name, "", 0L);
        response.addHeader(HttpHeaders.SET_COOKIE, deletedCookie.toString());
    }

    public static void deleteAllCookies(HttpServletRequest request, HttpServletResponse response) {
        String cookiesHeader = request.getHeader(HttpHeaders.COOKIE);
        if (cookiesHeader != null) {
            String[] cookiePairs = cookiesHeader.split(";\\s*");

            for (String cookiePair : cookiePairs) {
                String cookieName = cookiePair.split("=")[0];
                ResponseCookie deletedCookie = editCookie(cookieName, "", 0L);

                response.addHeader(HttpHeaders.SET_COOKIE, deletedCookie.toString());
            }
        }
    }

    private static ResponseCookie editCookie(String key, String value, Long maxAge) {
        return ResponseCookie.from(key, value)
                .httpOnly(true)
                .secure(false)
                .sameSite("Strict")
                .maxAge(maxAge)
                .path("/")
                .build();
    }
}