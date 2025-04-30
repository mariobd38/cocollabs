package com.cocollabs.app.services;

import brevo.ApiClient;
import brevo.ApiException;
import brevo.Configuration;
import brevoApi.EmailCampaignsApi;
import brevoApi.TransactionalEmailsApi;
import brevoModel.CreateSmtpEmail;
import brevoModel.GetEmailCampaigns;
import brevoModel.GetSharedTemplateUrl;
import brevoModel.SendSmtpEmail;
import brevoModel.SendSmtpEmailSender;
import brevoModel.SendSmtpEmailTo;
import brevoModel.SendTestEmail;
import com.cocollabs.app.rate_limit.RateLimit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
public class EmailService {
    private final Logger log = LoggerFactory.getLogger(EmailService.class);
    @Value("${BREVO_API_KEY}")
    private String API_KEY;
    @Value("${BREVO_EMAIL_SENDER}")
    private String EMAIL_SENDER;

    public void sendEmail(String email) {
        ApiClient client = Configuration.getDefaultApiClient();
        client.setApiKey(API_KEY);

        TransactionalEmailsApi apiInstance = new TransactionalEmailsApi();

        SendSmtpEmailSender sender = new SendSmtpEmailSender()
                .name("Mario from Cocollabs")
                .email(EMAIL_SENDER);

        SendSmtpEmailTo to = new SendSmtpEmailTo()
                .email(email);

        Map<String, Object> params = new HashMap<>();
        params.put("email", email);

        SendSmtpEmail sendSmtpEmail = new SendSmtpEmail()
                .sender(sender)
                .to(Collections.singletonList(to))
                .templateId(1L)
                .params(params);

        try {
            apiInstance.sendTransacEmail(sendSmtpEmail);
            log.info("Email sent successfully to " + email);
        } catch (ApiException e) {
            log.error("Exception when calling Brevo API: " + e.getMessage());
        }

    }

}
