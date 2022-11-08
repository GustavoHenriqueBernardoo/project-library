package com.gustavo.library.web;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gustavo.library.entity.Book;
import com.gustavo.library.repository.BookRepository;

import org.springframework.web.bind.annotation.PutMapping;

@RestController
@RequestMapping("/book")
public class BookController {

  @Autowired
  BookRepository bookRepository;

  @GetMapping("/all")
  public ResponseEntity<List<Book>> getBooks() {
    List<Book> books = (List<Book>) bookRepository.findAll();
    System.out.println("return all books" + books);
    return new ResponseEntity<>(books, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Book> getBook(@PathVariable Long id) {
    Book book = bookRepository.findById(id).get();
    System.out.println("Return a book" + book);
    return new ResponseEntity<>(book, HttpStatus.OK);
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
