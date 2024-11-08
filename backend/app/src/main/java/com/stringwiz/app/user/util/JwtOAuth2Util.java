package com.stringwiz.app.user.util;

/*
import com.stringwiz.app.services.GooglePublicKeysService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Locator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.security.PublicKey;
import java.util.Map;

@Component
public class JwtOAuth2Util implements Locator<Key> {
    @Autowired private GooglePublicKeysService googlePublicKeysService;

    public Map<String,String> getUserDataFromToken(String token) {
        Claims claims = extractAllClaims(token);
        return Map.of(
                "email",claims.get("email").toString(),
                "fullName",claims.get("name").toString(),
                "firstName",claims.get("given_name").toString(),
                "lastName",claims.get("family_name").toString(),
                "picture",claims.get("picture").toString()
        );
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
            .keyLocator(this)
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    @Override
    public Key locate(Header header) {
        String kid = header.get("kid").toString();
        if (kid == null) {
            throw new JwtException("Key ID (kid) not found in JWT header");
        }
        Map<String, PublicKey> jwk = googlePublicKeysService.getPublicKeys();
        PublicKey key = jwk.get(kid);
        if (key == null) {
            throw new JwtException("Public key not found for kid: " + kid);
        }
        return key;
    }
}*/
