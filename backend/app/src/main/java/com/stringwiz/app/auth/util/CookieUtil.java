package com.stringwiz.app.auth.util;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;

import java.time.Duration;
import java.util.Optional;

public class CookieUtil {

    public static Optional<Cookie> getCookie(HttpServletRequest request, String name) {
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals(name)) {
                    return Optional.of(cookie);
                }
            }
        }

        return Optional.empty();
    }

    public static void addCookie(HttpServletResponse response, String name, String value, long maxAge) {
        ResponseCookie jwtCookie = ResponseCookie.from(name, value)
                .httpOnly(true)
                .secure(false)
                .sameSite("Strict")
                .maxAge(Duration.ofSeconds(maxAge))
                .path("/")
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, jwtCookie.toString());

    }

    public static void deleteCookie(HttpServletResponse response, String name) {
        ResponseCookie deletedCookie = ResponseCookie.from(name, "")
                .httpOnly(true)
                .secure(false)
                .sameSite("Strict")
                .maxAge(0)
                .path("/")
                .build();

        response.addHeader(HttpHeaders.SET_COOKIE, deletedCookie.toString());
    }

    public static void deleteAllCookies(HttpServletRequest request, HttpServletResponse response) {
        String cookiesHeader = request.getHeader(HttpHeaders.COOKIE);
        if (cookiesHeader != null) {
            String[] cookiePairs = cookiesHeader.split(";\\s*");

            for (String cookiePair : cookiePairs) {
                String cookieName = cookiePair.split("=")[0];
                ResponseCookie deletedCookie = ResponseCookie.from(cookieName, "")
                        .httpOnly(true)
                        .secure(false)
                        .sameSite("Strict")
                        .maxAge(0)
                        .path("/")
                        .build();

                response.addHeader(HttpHeaders.SET_COOKIE, deletedCookie.toString());
            }
        }
    }


}