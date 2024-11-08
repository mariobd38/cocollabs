package com.stringwiz.app.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import org.hibernate.validator.constraints.Length;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRegistrationDto {
    @NonNull
    private String fullName;
    @NonNull
    private String email;
    @NonNull
    @Length(min = 8)
    private String password;
}
