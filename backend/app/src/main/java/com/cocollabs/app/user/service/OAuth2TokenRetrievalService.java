package com.cocollabs.app.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.endpoint.OAuth2AccessTokenResponseClient;
import org.springframework.security.oauth2.client.endpoint.OAuth2AuthorizationCodeGrantRequest;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AccessTokenResponse;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationExchange;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationResponse;
import org.springframework.stereotype.Component;

import java.util.Map;

/*
@Component
public class OAuth2TokenRetrievalService {
    private final ClientRegistration clientRegistration;
    private final OAuth2AccessTokenResponseClient<OAuth2AuthorizationCodeGrantRequest> accessTokenResponseClient;

    /*
    @Autowired
    public OAuth2TokenRetrievalService(ClientRegistrationRepository clientRegistrationRepository,
                                       OAuth2AccessTokenResponseClient<OAuth2AuthorizationCodeGrantRequest> accessTokenResponseClient) {
        this.clientRegistration = clientRegistrationRepository.findByRegistrationId("google");
        this.accessTokenResponseClient = accessTokenResponseClient;
    }
    public Map<String, String> getTokens(String authorizationCode) {
        OAuth2AccessTokenResponse tokenResponse = getTokenResponse(authorizationCode,clientRegistration);

        String accessToken = tokenResponse.getAccessToken().getTokenValue();
        String refreshToken = tokenResponse.getRefreshToken() != null ?
                tokenResponse.getRefreshToken().getTokenValue() : null;
        String jwt = tokenResponse.getAdditionalParameters().get("id_token").toString();

        assert refreshToken != null;
        return Map.of(
                "accessToken", accessToken,
                "refreshToken", refreshToken,
                "jwt", jwt
        );
    }

    private OAuth2AccessTokenResponse getTokenResponse(String authorizationCode, ClientRegistration clientRegistration) {
        OAuth2AuthorizationRequest authorizationRequest = getAuthorizationRequest(clientRegistration);

        OAuth2AuthorizationResponse authorizationResponse = getAuthorizationResponse(authorizationCode,clientRegistration);

        OAuth2AuthorizationExchange authorizationExchange = new OAuth2AuthorizationExchange(authorizationRequest, authorizationResponse);

        OAuth2AuthorizationCodeGrantRequest grantRequest = new OAuth2AuthorizationCodeGrantRequest(clientRegistration, authorizationExchange);
        return accessTokenResponseClient.getTokenResponse(grantRequest);
    }

    private OAuth2AuthorizationRequest getAuthorizationRequest(ClientRegistration clientRegistration) {
        return OAuth2AuthorizationRequest.authorizationCode()
            .clientId(clientRegistration.getClientId())
            .authorizationUri(clientRegistration.getProviderDetails().getAuthorizationUri())
            .redirectUri(clientRegistration.getRedirectUri())
            .scopes(clientRegistration.getScopes())
            .build();
    }

    private OAuth2AuthorizationResponse getAuthorizationResponse(String authorizationCode, ClientRegistration clientRegistration) {
        return OAuth2AuthorizationResponse.success(authorizationCode)
            .redirectUri(clientRegistration.getRedirectUri())
            .build();
    }
}*/