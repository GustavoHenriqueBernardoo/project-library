package com.gustavo.library;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
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

  // Handling the adding of blank title,author or pages less than zero with a nice
  // message
  @ExceptionHandler(BookNotFoundException.class)
  public ResponseEntity<Object> handleBookNotFoundException(RuntimeException ex) {
    ErrorResponse errors = new ErrorResponse(Arrays.asList(ex.getMessage()));

    return new ResponseEntity<>(errors, HttpStatus.NOT_FOUND);
  }

  // Handle delete a book that doesn't exist
  @ExceptionHandler(EmptyResultDataAccessException.class)
  public ResponseEntity<Object> handleDataAccessException(EmptyResultDataAccessException ex) {
    ErrorResponse error = new ErrorResponse(Arrays.asList("Cannot delete non-existing book"));

    return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
  }

  // Handle the attempt of saving a book twice
  @ExceptionHandler(DataIntegrityViolationException.class)
  public ResponseEntity<Object> handleDataIntegrityViolationException(DataIntegrityViolationException ex) {
    ErrorResponse error = new ErrorResponse(Arrays.asList("Data Integrity  Violation: You cannot add a book twice."));

    return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
  }
}
