package com.cocollabs.app.space.util;

import com.cocollabs.app.space.model.SpaceIcon;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.DeserializationFeature;

import java.io.IOException;

@Converter
public class SpaceIconConverter implements AttributeConverter<SpaceIcon, String> {

    private static final ObjectMapper objectMapper = new ObjectMapper();

    static {
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    @Override
    public String convertToDatabaseColumn(SpaceIcon spaceIcon) {
        if (spaceIcon == null) {
            return null;
        }
        try {
            return objectMapper.writeValueAsString(spaceIcon);
        } catch (Exception e) {
            throw new RuntimeException("Error converting SpaceIcon to JSON", e);
        }
    }

    @Override
    public SpaceIcon convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty()) {
            return null;
        }
        try {
            return objectMapper.readValue(dbData, SpaceIcon.class);
        } catch (IOException e) {
            throw new RuntimeException("Error converting JSON to SpaceIcon", e);
        }
    }
}