package com.cocollabs.app.dto;

import com.cocollabs.app.user.model.User;
import com.cocollabs.app.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.hibernate.Hibernate;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class UserPlatformDtoConverterTest {
    @Value("${DTO_CONVERTER_TEST_EMAIL}")
    private String DTO_CONVERTER_TEST_EMAIL;
    @Autowired
    private UserRepository userRepository;

    @Transactional
    @Test
    void testUserSpaceSize() {
        Optional<User> user = userRepository.findByEmail(DTO_CONVERTER_TEST_EMAIL);

        user.ifPresent(userEntity -> {
            Hibernate.initialize(userEntity.getSpaces());
            assertTrue(userEntity.getSpaces().size() >= 2);
        });
    }
}
