package com.seed.exception;


import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<String> handleMaxSizeException() {
        return ResponseEntity.badRequest()
                .body("File too large! Maximum allowed size is 50MB.");
    }
}
