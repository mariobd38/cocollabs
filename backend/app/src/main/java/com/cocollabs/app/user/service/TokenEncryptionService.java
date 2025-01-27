package com.cocollabs.app.user.service;
/*
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Arrays;
import java.util.Base64;

@Service
public class TokenEncryptionService {
    @Value("${OAUTH2_TOKEN_ENCRYPTION_ALGO}")
    private String ALGORITHM;

    @Value("${OAUTH2_TOKEN_ENCRYPTION_KEY}")
    private String encryptionKey;

    private Key getKey() {
        byte[] keyBytes = encryptionKey.getBytes(StandardCharsets.UTF_8);

        byte[] key = Arrays.copyOf(keyBytes, 16);
        return new SecretKeySpec(key, ALGORITHM);
    }

    public String encrypt(String plainText) {
        try {
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.ENCRYPT_MODE, getKey());
            byte[] encryptedBytes = cipher.doFinal(plainText.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(encryptedBytes);
        } catch (Exception e) {
            throw new RuntimeException("Error encrypting token", e);
        }
    }

    public String decrypt(String encryptedText) {
        try {
            Cipher cipher = Cipher.getInstance(ALGORITHM);
            cipher.init(Cipher.DECRYPT_MODE, getKey());
            byte[] decryptedBytes = cipher.doFinal(Base64.getDecoder().decode(encryptedText));
            return new String(decryptedBytes, StandardCharsets.UTF_8);
        } catch (Exception e) {
            throw new RuntimeException("Error decrypting token", e);
        }
    }
}
*/