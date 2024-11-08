package com.stringwiz.app.space.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Visibility {
    PERSONAL,
    PUBLIC,

    PRIVATE;

    @JsonCreator
    public static Visibility fromString(String value) {
        return Visibility.valueOf(value.toUpperCase());
    }

    @JsonValue
    public String toValue() {
        return name().toLowerCase(); // Optional: if you want to serialize it as lowercase
    }
}
