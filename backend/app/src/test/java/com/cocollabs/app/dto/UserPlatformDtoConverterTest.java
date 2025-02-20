package com.cocollabs.app.dto;

import com.cocollabs.app.user.model.User;
import com.cocollabs.app.user.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(MockitoExtension.class)
//@SpringBootTest
public class UserPlatformDtoConverterTest {
    private final String email = "test@example.com";
    @Mock
    private UserRepository userRepository;

    @Test
    void testUserSpaceSize() {
//        User mockUser = User.builder()
//                        .id(1L)
//                        .email(DTO_CONVERTER_TEST_EMAIL)
//                        .spaces(new LinkedHashSet<>())
//                        .build();
//
//        Mockito.when(userRepository.findByEmail(DTO_CONVERTER_TEST_EMAIL))
//                .thenReturn(Optional.of(mockUser));
//
//        Optional<User> user = userRepository.findByEmail(DTO_CONVERTER_TEST_EMAIL);
//        user.ifPresent(userEntity -> {
//            assertTrue(userEntity.getSpaces().size() >= 2);
//        });
    }
    @Test
    void testGetUserByEmail() {
        // Given
        User mockUser = User.builder()
                .id(1L)
                .email(email)
                .spaces(new LinkedHashSet<>())
                .build();

        Mockito.when(userRepository.findByEmail(email))
                .thenReturn(Optional.of(mockUser));

        // When
        Optional<User> foundUser = userRepository.findByEmail(email);
        foundUser.ifPresent(userEntity -> {
            assertEquals(email, userEntity.getEmail());
        });

    }
}
