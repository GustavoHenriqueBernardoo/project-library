package com.gustavo.library;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.gustavo.library.exception.BookNotFoundException;
import com.gustavo.library.exception.ErrorResponse;

@ControllerAdvice
public class LibraryExceptionHandler extends ResponseEntityExceptionHandler {

  @Override
  protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers,
      HttpStatus status, WebRequest request) {
    List<String> errors = new ArrayList<>();
    ex.getBindingResult().getAllErrors().forEach(error -> errors.add(error.getDefaultMessage()));

    ErrorResponse errorResponse = new ErrorResponse(errors);

    return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
  }

  @ExceptionHandler(BookNotFoundException.class)
  public ResponseEntity<Object> handleBookNotFoundException(RuntimeException ex) {
    ErrorResponse errors = new ErrorResponse(Arrays.asList(ex.getMessage()));

    return new ResponseEntity<>(errors, HttpStatus.NOT_FOUND);
  }

}
