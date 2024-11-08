package com.stringwiz.app.role.util;

import com.stringwiz.app.role.model.RoleNames;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Component
public class RoleSelectorUtil {
    public List<RoleNames> getRolesFromEmail(String email) {
        String domain = email.substring(email.indexOf("@") + 1,email.indexOf("."));
        List<RoleNames> roles = new ArrayList<>();
        if (domain.equalsIgnoreCase("cocollabs")) {
            roles.addAll(Arrays.asList(RoleNames.USER, RoleNames.ADMIN));
        } else {
            roles.add(RoleNames.USER);
        }
        return roles;
//        return domain.equals("stringwiz") ? "ROLE_ADMIN" : "ROLE_IND_USER";
    }



}
