package com.stringwiz.app.auth.util;

//import com.stringwiz.app.services.GooglePublicKeysService;
import com.stringwiz.app.auth.controller.AuthController;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;

@Component
public class JwtUtil {
    private final Logger logger = LoggerFactory.getLogger(JwtUtil.class);
    private static final long ACCESS_TOKEN_VALIDITY = 24 * 60 * 60L; // 5 minutes
    private static final long REFRESH_TOKEN_VALIDITY = 7 * 24 * 60 * 60L; // 7 days
    private static final long JWT_TOKEN_VALIDITY = 30 * 24 * 60 * 60L;
    private static final String ISSUER = "cocollabs-app";
    private static final String TOKEN_TYPE = "JWT";
    private static final String AUDIENCE = "web-client";

    @Value("${JWT_SECRET_KEY}")
    private String SECRET_KEY;

//    //@Autowired
//    //private GooglePublicKeysService googlePublicKeysService;
//
//    public boolean validateToken(String token, UserDetails userDetails) {
//        String username = getUserEmailFromToken(token);
//        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
//    }
//
//    public boolean canTokenBeRefreshed(String token) {
//        return !isTokenExpired(token) || ignoreTokenExpiration(token);
//    }
//
//    private Claims extractAllClaims(String token) {
//        return Jwts.parser()
//                .verifyWith(getSignInKey())
//                .build()
//                .parseSignedClaims(token)
//                .getPayload();
//    }

    public String generateAccessToken(UserDetails userDetails) {
        return generateToken(userDetails, ACCESS_TOKEN_VALIDITY, TokenType.ACCESS);
    }

    public String generateRefreshToken(UserDetails userDetails) {
        return generateToken(userDetails, REFRESH_TOKEN_VALIDITY, TokenType.REFRESH);
    }

    private String generateToken(UserDetails userDetails, long validity, TokenType tokenType) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("type", tokenType.name());

        String tokenId = UUID.randomUUID().toString();

        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .id(tokenId) // JWT ID claim (jti)
                .issuer(ISSUER)
                .audience().add(AUDIENCE).and()
                .issuedAt(new Date())
                .notBefore(new Date())
                .expiration(new Date(System.currentTimeMillis() + (validity * 1000)))
                .signWith(getSignInKey(), Jwts.SIG.HS512)
                .header().type(TOKEN_TYPE).and()
                .compact();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        try {
            if (isTokenExpired(token)) {
                return false;
            }

            Claims claims = extractAllClaims(token);

            // Validate essential claims
            if (!claims.getIssuer().equals(ISSUER) ||
                    !claims.getAudience().contains(AUDIENCE) ||
                    !claims.getSubject().equals(userDetails.getUsername())) {
                return false;
            }

            // Validate token type
            String tokenType = claims.get("type", String.class);
            return tokenType != null && (tokenType.equals(TokenType.ACCESS.name()) ||
                    tokenType.equals(TokenType.REFRESH.name()));
        } catch (JwtException | IllegalArgumentException e) {
            logger.warn("Toke validation failed", e);
            return false;
        }
    }

    public String getUserEmailFromToken(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public long getAccessTokenValidityInSeconds() {
        return ACCESS_TOKEN_VALIDITY;
    }

    public long getRefreshTokenValidityInSeconds() {
        return REFRESH_TOKEN_VALIDITY;
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignInKey())
                .requireIssuer(ISSUER)
                .requireAudience(AUDIENCE)
                //.requireIssuedAt()
                //.requireNotBefore()
                //.requireExpiration()
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);

        if (keyBytes.length < 64) {
            throw new IllegalArgumentException("Secret key too short for HS512");
        }

        return Keys.hmacShaKeyFor(keyBytes);
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public long getTokenValidityInSeconds() {
        return JWT_TOKEN_VALIDITY;
    }

    public enum TokenType { ACCESS, REFRESH }
}
