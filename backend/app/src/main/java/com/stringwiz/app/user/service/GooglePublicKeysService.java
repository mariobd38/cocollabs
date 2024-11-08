package com.stringwiz.app.user.service;

import kong.unirest.json.JSONArray;
import kong.unirest.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigInteger;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.PublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.RSAPublicKeySpec;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

/*
@Service
public class GooglePublicKeysService {
    @Value("${spring.security.oauth2.client.provider.google.jwk-set-uri}")
    private String GOOGLE_CERTS_URL;
    private final RestTemplate restTemplate;
    Map<String, PublicKey> publicKeysMap = new HashMap<>();

    public GooglePublicKeysService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public Map<String, PublicKey> getPublicKeys() {
        if (publicKeysMap.isEmpty()) {
            fetchGooglePublicKeys();
        }
        return publicKeysMap;
    }

    private void fetchGooglePublicKeys() {
        try {
            String response = restTemplate.getForObject(GOOGLE_CERTS_URL, String.class);

            JSONObject jsonResponse = new JSONObject(response);
            JSONArray keys2 = jsonResponse.getJSONArray("keys");
            for(int i = 0; i < keys2.length(); i++) {
                JSONObject key = keys2.getJSONObject(i);
                PublicKey publicKey = getPublicKeyFromNAndE(key);
                publicKeysMap.put(key.getString("kid"), publicKey);
            }
        } catch (Exception e) {
            throw new RuntimeException("Failed to fetch Google public keys", e);
        }
    }

    private PublicKey getPublicKeyFromNAndE(JSONObject key) throws NoSuchAlgorithmException, InvalidKeySpecException {
        byte[] nBytes = Base64.getUrlDecoder().decode(key.getString("n"));
        byte[] eBytes = Base64.getUrlDecoder().decode(key.getString("e"));
        BigInteger n = new BigInteger(1, nBytes);
        BigInteger e = new BigInteger(1, eBytes);

        RSAPublicKeySpec publicKeySpec = new RSAPublicKeySpec(n,e);
        KeyFactory keyFactory = KeyFactory.getInstance(key.getString("kty")); //kty will be "RSA"
        return keyFactory.generatePublic(publicKeySpec);
    }

}
*/