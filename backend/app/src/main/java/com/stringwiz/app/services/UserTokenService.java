package com.stringwiz.app.services;

/*
import com.stringwiz.app.models.UserToken;
import com.stringwiz.app.repositories.UserTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserTokenService {
    @Autowired private final TokenEncryptionService tokenEncryptionService;
    @Autowired private UserTokenRepository userTokenRepository;

    @Autowired
    public UserTokenService(TokenEncryptionService tokenEncryptionService) {
        this.tokenEncryptionService = tokenEncryptionService;
    }

    public UserToken saveUserToken(UserToken userToken) {
        userToken.setAccessToken(tokenEncryptionService.encrypt(userToken.getAccessToken()));
        userToken.setRefreshToken(tokenEncryptionService.encrypt(userToken.getRefreshToken()));
        return userTokenRepository.save(userToken);
    }

    public UserToken getUserToken(Long id) {
        UserToken userToken = userTokenRepository.findByUserId(id).orElseThrow();
        userToken.setAccessToken(tokenEncryptionService.decrypt(userToken.getAccessToken()));
        userToken.setRefreshToken(tokenEncryptionService.decrypt(userToken.getRefreshToken()));
        return userToken;
    }

    public void deleteUserToken(Long id) {
    }
}
*/