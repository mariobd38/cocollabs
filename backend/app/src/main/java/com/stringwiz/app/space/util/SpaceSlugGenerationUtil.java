package com.stringwiz.app.space.util;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

public class SpaceSlugGenerationUtil {
    private static final Pattern NONLATIN = Pattern.compile("[^\\w-]");
    private static final Pattern WHITESPACE = Pattern.compile("\\s+");
    private static final Pattern MULTIPLE_HYPHENS = Pattern.compile("-+");

    public static String generateSlug(String name) {
        String nowhitespace = WHITESPACE.matcher(name.trim()).replaceAll("-");
        String normalized = Normalizer.normalize(nowhitespace, Normalizer.Form.NFD);
        String withoutNonLatin = NONLATIN.matcher(normalized).replaceAll("").toLowerCase(Locale.ENGLISH);
        String slug = MULTIPLE_HYPHENS.matcher(withoutNonLatin).replaceAll("-");
        return slug.replaceAll("^-|-$", "");
    }

}
