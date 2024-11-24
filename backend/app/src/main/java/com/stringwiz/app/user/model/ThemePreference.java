package com.stringwiz.app.user.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import com.stringwiz.app.space.model.Visibility;

public enum ThemePreference {
    LIGHT, DARK;
    @JsonCreator
    public static ThemePreference fromString(String value) {
        return ThemePreference.valueOf(value.toUpperCase());
    }

    @JsonValue
    public String toValue() {
        return name().toLowerCase();
    }
}
