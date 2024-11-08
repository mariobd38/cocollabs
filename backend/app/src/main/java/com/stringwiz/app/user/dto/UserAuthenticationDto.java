package com.stringwiz.app.user.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserAuthenticationDto {
    private String email;

    @NonNull
    String password;
}
