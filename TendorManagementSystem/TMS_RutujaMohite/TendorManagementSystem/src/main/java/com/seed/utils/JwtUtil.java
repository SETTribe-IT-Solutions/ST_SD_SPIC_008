package com.seed.utils;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private static final String SECRET =
            "mysecretkeymysecretkeymysecretkey123"; // 256-bit minimum

    private final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    // 🔹 Generate Token
    public String generateToken(String username) {
        System.out.println("Generating with secret: " + SECRET);

        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // 🔹 Extract Username
    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    // 🔹 Validate Token
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(key)   // ✅ USE SAME KEY
                    .build()
                    .parseClaimsJws(token);

            System.out.println("Token is valid");
            return true;

        } catch (JwtException | IllegalArgumentException e) {
            System.out.println("Invalid Token: " + e.getMessage());
            return false;
        }
    }

    // 🔹 Extract Expiration
    public Date extractExpiration(String token) {
        return extractAllClaims(token).getExpiration();
    }

    // 🔹 Extract All Claims
    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)  // ✅ USE SAME KEY
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    // 🔹 Check Expiration
    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }
}