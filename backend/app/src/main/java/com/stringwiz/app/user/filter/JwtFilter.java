package com.stringwiz.app.user.filter;

import com.stringwiz.app.auth.util.JwtUtil;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.Optional;

@Component
public class JwtFilter extends OncePerRequestFilter {
    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;
    private final String jwtCookieName;
    //@Value("${OAUTH2_GOOGLE_CALLBACK_URI}")
    //private String OAUTH2_GOOGLE_CALLBACK;

    public JwtFilter(
            JwtUtil jwtUtil,
            UserDetailsService userDetailsService,
            @Value("${JWT_COOKIE_ATTRIBUTE_NAME}") String jwtCookieName) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
        this.jwtCookieName = jwtCookieName;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {

        //String requestURI = request.getRequestURI();
        //if (requestURI.startsWith(OAUTH2_GOOGLE_CALLBACK)) {
        //    filterChain.doFilter(request, response);
        //    return;
        //}

        try {
            Optional<Cookie> jwtCookie = extractJwtCookie(request);

            if (jwtCookie.isPresent() && SecurityContextHolder.getContext().getAuthentication() == null) {
                String jwt = jwtCookie.get().getValue();
                processJwtToken(jwt, request);
            }
        } catch (ExpiredJwtException e) {
            response.setStatus(HttpStatus.UNAUTHORIZED.value());
            response.getWriter().write("Token expired");
            return;
        } catch (Exception e) {
            response.setStatus(HttpStatus.NOT_FOUND.value());
            response.getWriter().write("Cannot set user authentication");
        }

        filterChain.doFilter(request, response);
    }

    private Optional<Cookie> extractJwtCookie(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            return Arrays.stream(cookies)
                    .filter(cookie -> jwtCookieName.equals(cookie.getName()))
                    .findFirst();
        }
        return Optional.empty();
    }

    private void processJwtToken(String jwt, HttpServletRequest request) {
        String userEmail = jwtUtil.getUserEmailFromToken(jwt);

        if (userEmail != null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(userEmail);

            if (jwtUtil.validateToken(jwt, userDetails)) {
                UsernamePasswordAuthenticationToken authentication = createAuthentication(userDetails, request);
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }
    }

    private UsernamePasswordAuthenticationToken createAuthentication(UserDetails userDetails, HttpServletRequest request) {
        UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                userDetails,
                null,
                userDetails.getAuthorities()
        );
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        return authentication;
    }
}
