package com.cocollabs.app.user.dto;

import com.cocollabs.app.user.model.ThemePreference;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPreferenceDto {
    @Enumerated(EnumType.STRING)
    private ThemePreference theme;
}