package com.stringwiz.app.util;

import org.junit.jupiter.api.Test;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class SpaceSlugGenerationTest {
    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("\\s+");
    private static final Pattern MULTIPLE_HYPHENS = Pattern.compile("-+");

    @Test
    void testSlugGeneration() {
        String input = "my name---2is -'  mario's";
        String nowhitespace = WHITESPACE.matcher(input.trim()).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String withoutNonLatin = NONLATIN.matcher(normalized).replaceAll("").toLowerCase(Locale.ENGLISH);
        String slug = MULTIPLE_HYPHENS.matcher(withoutNonLatin).replaceAll("-");
        slug = slug.replaceAll("^-|-$", "");
        assertEquals("my-name-2is-marios", slug);
    }

}
