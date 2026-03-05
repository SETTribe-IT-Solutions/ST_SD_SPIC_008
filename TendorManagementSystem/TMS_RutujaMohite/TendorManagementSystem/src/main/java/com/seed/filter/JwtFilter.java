package com.seed.filter;

import jakarta.servlet.*;

import jakarta.servlet.http.*;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.seed.utils.JwtUtil;

import org.springframework.beans.factory.annotation.Autowired;
import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    @Autowired
    public JwtFilter(JwtUtil jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

//        String authHeader = request.getHeader("Authorization");
//
//        if (authHeader != null && authHeader.startsWith("Bearer ")) {
//
//            String token = authHeader.substring(7);
//            String username = jwtUtil.extractUsername(token);
//
//            if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//
//                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
//
//                if (jwtUtil.validateToken(token)) {
//
//                    UsernamePasswordAuthenticationToken authentication =
//                            new UsernamePasswordAuthenticationToken(
//                                    userDetails,
//                                    null,
//                                    userDetails.getAuthorities()   // ✅ IMPORTANT
//                            );
//
//                    authentication.setDetails(
//                            new WebAuthenticationDetailsSource().buildDetails(request));
//
//                    SecurityContextHolder.getContext().setAuthentication(authentication);
//                }
//                System.out.println("Authorization Header: " + authHeader);
//                
//            
//                System.out.println("Token valid: " + jwtUtil.validateToken(token));
//                System.out.println("Username from token: " + username);
//                System.out.println("Username from DB: " + userDetails.getUsername());
//            }
//        }
//
//        filterChain.doFilter(request, response);
    	String authHeader = request.getHeader("Authorization");

    	String username = null;
    	String jwt = null;

    	if (authHeader != null && authHeader.startsWith("Bearer ")) {
    	    jwt = authHeader.substring(7);

    	    if (jwt.contains(".")) {   // ✅ Important check
    	        username = jwtUtil.extractUsername(jwt);
    	    }
    	}

    	if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

    	    UserDetails userDetails = userDetailsService.loadUserByUsername(username);

    	    if (jwtUtil.validateToken(jwt)) {

    	        UsernamePasswordAuthenticationToken authToken =
    	                new UsernamePasswordAuthenticationToken(
    	                        userDetails,
    	                        null,
    	                        userDetails.getAuthorities());

    	        authToken.setDetails(
    	                new WebAuthenticationDetailsSource().buildDetails(request));

    	        SecurityContextHolder.getContext().setAuthentication(authToken);
    	    }
    	}

    	filterChain.doFilter(request, response);
    }
}