package com.cocollabs.app.services;

import com.clerk.backend_api.Clerk;
import com.clerk.backend_api.models.operations.CreateWaitlistEntryRequestBody;
import com.clerk.backend_api.models.operations.CreateWaitlistEntryResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;


@Service
public class WaitlistService {
    @Value("${CLERK_API_KEY}")
    private String clerkApiKey;


    public void addToWaitlist(String email) throws Exception {
        Clerk sdk = Clerk.builder()
                .bearerAuth(clerkApiKey)
                .build();

        CreateWaitlistEntryRequestBody req = CreateWaitlistEntryRequestBody.builder()
                .emailAddress(email)
                .build();

        CreateWaitlistEntryResponse res = sdk.waitlistEntries().create()
                .request(req)
                .call();

        if (res.waitlistEntry().isPresent()) {
            System.out.println("User added to the waitlist!");
        }
    }
}
