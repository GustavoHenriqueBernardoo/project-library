package com.gustavo.library.web;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gustavo.library.entity.Book;
import com.gustavo.library.service.BookService;

import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/book")
public class BookController {

  @Autowired
  BookService bookService;

  @GetMapping("/all")
  public ResponseEntity<List<Book>> getBooks() {
    List<Book> books = (List<Book>) bookService.getBooks();
    System.out.println("return all books" + books);
    return new ResponseEntity<>(books, HttpStatus.OK);
  }

  @GetMapping("/{id}")
  public ResponseEntity<Book> getBook(@PathVariable Long id) {
    Book book = bookService.getBook(id);
    System.out.println("Return a book" + book);
    return new ResponseEntity<>(book, HttpStatus.OK);
  }

  @PostMapping
  // add a book
  public ResponseEntity<Object> saveBook(@Valid @RequestBody Book book) {
    System.out.println("Created");

    return new ResponseEntity<>(bookService.saveBook(book), HttpStatus.CREATED);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<HttpStatus> deleteBook(@PathVariable Long id) {
    System.out.println("Book Deleted");
    bookService.deleteBook(id);
    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  // Update the book complete field
  // @PutMapping("/{id}")
  // public ResponseEntity<Book> updateComplete(@PathVariable Long id) {
  // return new ResponseEntity<Book>(bookService.updateComplete(id),
  // HttpStatus.OK);
  // }

  @PutMapping("/{id}")
  public ResponseEntity<Book> updateBook(@Valid @RequestBody Book book, @PathVariable Long id) {
    return new ResponseEntity<Book>(
        bookService.updateBook(id, book.getTitle(), book.getAuthor(), book.getPages(), book.getComplete()),
        HttpStatus.OK);
  }

}
