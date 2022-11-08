package com.gustavo.library.exception;

public class BookNotFoundException extends RuntimeException {
  public BookNotFoundException(Long id) {
    super("The book of id '" + id + "' does not exist");
  }

}
