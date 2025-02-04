package com.cocollabs.app.space.util;

import java.security.SecureRandom;

public class SpaceSlugGenerationUtil {
    private static final SecureRandom RANDOM = new SecureRandom();
    private static final int SLUG_LENGTH = 10;

    public static String generateSlug() {
        StringBuilder sb = new StringBuilder(SLUG_LENGTH);
        for (int i = 0; i < SLUG_LENGTH; i++) {
            sb.append(RANDOM.nextInt(10)); // Generates a random digit (0-9)
        }
        return sb.toString();
    }
}
