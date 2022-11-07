package com.gustavo.library.web;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/book")
public class BookController {

  @GetMapping("/all")
  public ResponseEntity<List<Object>> getBooks() {
    System.out.println("return all books");
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @GetMapping()
  public ResponseEntity<Object> getBook() {
    System.out.println("Return a book");
    return new ResponseEntity<>(HttpStatus.OK);
  }

  @PutMapping("")
  // add or update a book
  public ResponseEntity<Object> saveBook() {
    System.out.println("Created");
    return new ResponseEntity<>(HttpStatus.CREATED);
  }

  @DeleteMapping("")
  public ResponseEntity<HttpStatus> deleteBook() {
    System.out.println("Book Deleted");
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

}
