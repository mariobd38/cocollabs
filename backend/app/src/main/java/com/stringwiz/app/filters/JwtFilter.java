package com.stringwiz.app.filters;

import com.stringwiz.app.utils.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired private UserDetailsService userDetailsService;
    @Value("${JWT_COOKIE_ATTRIBUTE_NAME}")
    private String JWT_COOKIE_NAME;
    //@Value("${OAUTH2_GOOGLE_CALLBACK_URI}")
    //private String OAUTH2_GOOGLE_CALLBACK;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        final String jwt;
        final String userEmail;

        String requestURI = request.getRequestURI();
        //if (requestURI.startsWith(OAUTH2_GOOGLE_CALLBACK)) {
        //    filterChain.doFilter(request, response);
        //    return;
        //}

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (JWT_COOKIE_NAME.equals(cookie.getName())) {
                    jwt = cookie.getValue();
                    userEmail = jwtUtil.getUserEmailFromToken(jwt);

                    if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                        UserDetails userDetails = this.userDetailsService.loadUserByUsername(userEmail);

                        if (jwtUtil.validateToken(jwt, userDetails)) {
                            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                            SecurityContextHolder.getContext().setAuthentication(authentication);
                        }
                    }
                    break;
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}
