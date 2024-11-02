package com.stringwiz.app.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum ProfileType {
    COLOR,
    IMAGE;

    @JsonCreator
    public static ProfileType fromString(String value) {
        return ProfileType.valueOf(value.toUpperCase());
    }

    @JsonValue
    public String toValue() {
        return name().toLowerCase(); // Optional: if you want to serialize it as lowercase
    }
}
