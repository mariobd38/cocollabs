package com.stringwiz.app.auth.util;

//import com.stringwiz.app.services.GooglePublicKeysService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.function.Function;

@Component
public class JwtUtil {
    private static final long ACCESS_TOKEN_VALIDITY = 15 * 60L; // 15 minutes
    private static final long REFRESH_TOKEN_VALIDITY = 7 * 24 * 60 * 60L; // 7 days
    private static final long JWT_TOKEN_VALIDITY = 30 * 24 * 60 * 60L;
    private static final String ISSUER = "cocollabs-app";
    private static final String TOKEN_TYPE = "JWT";
    private static final String AUDIENCE = "web-client";

    @Value("${JWT_SECRET_KEY}")
    private String SECRET_KEY;
//
//
//    //@Autowired
//    //private GooglePublicKeysService googlePublicKeysService;
//
//
//    public String generateToken(UserDetails userDetails) {
//        return Jwts.builder()
//                .claims(new HashMap<>())
//                .subject(userDetails.getUsername())
//                .issuedAt(new Date(System.currentTimeMillis()))
//                .expiration(new Date(System.currentTimeMillis() + (JWT_TOKEN_VALIDITY * 1000))) // Convert to milliseconds
//                .signWith(getSignInKey())
//                .compact();
//    }
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
//    private boolean ignoreTokenExpiration(String token) {
//        return false;
//    }
//
//    private Claims extractAllClaims(String token) {
//        return Jwts.parser()
//                .verifyWith(getSignInKey())
//                .build()
//                .parseSignedClaims(token)
//                .getPayload();
//    }
//
//    private SecretKey getSignInKey() {
//        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(SECRET_KEY));
//    }
//
//    private boolean isTokenExpired(String token) {
//        return extractExpiration(token).before(new Date());
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

        // Validate key length for HS512
        if (keyBytes.length < 64) { // 512 bits
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
