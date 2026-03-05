package com.tender.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)//next filter
            throws ServletException, IOException {

        String authHeader = request.getHeader("Authorization");//this reads the token

        if (authHeader != null && authHeader.startsWith("Bearer ")) {

            String token = authHeader.substring(7);//Bearer 7 characters

            if (jwtUtil.validateToken(token)) {

                String username = jwtUtil.extractUsername(token);

                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                username,
                                null,
                                Collections.emptyList()
                        );

                SecurityContextHolder.getContext()
                        .setAuthentication(authentication);//tells spring user is logged in Allow access
            }
        }

        // IMPORTANT: Always continue filter chain
        filterChain.doFilter(request, response);
    }
}

//1. JwtFilter runs
//2. Reads Authorization header
//3. Extracts token
//4. Validates token
//5. Extracts username
//6. Sets authentication
//7. Continues request
//8. Controller executes