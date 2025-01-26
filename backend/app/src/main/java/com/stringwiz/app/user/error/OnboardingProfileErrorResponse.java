package com.stringwiz.app.user.error;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OnboardingProfileErrorResponse {
    private String message;
    private String field;
}
