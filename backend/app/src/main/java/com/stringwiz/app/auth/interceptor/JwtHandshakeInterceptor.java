package com.stringwiz.app.auth.interceptor;

import jakarta.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

import java.util.Map;

public class JwtHandshakeInterceptor extends HttpSessionHandshakeInterceptor {
    @Value("${APP_ACCESS_TOKEN_NAME}")
    private String JWT_COOKIE_NAME;

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response,
                                   WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        String jwt = null;
        if (request instanceof ServletServerHttpRequest) {
            Cookie[] cookies = ((ServletServerHttpRequest) request).getServletRequest().getCookies();
            for(Cookie c : cookies) {
                if (JWT_COOKIE_NAME.equals(c.getName())) {
                    jwt = c.getValue();
                }
            }
        }
        if (jwt != null) {
            attributes.put("jwt", jwt);
        }
        return super.beforeHandshake(request, response, wsHandler, attributes);
    }
}
