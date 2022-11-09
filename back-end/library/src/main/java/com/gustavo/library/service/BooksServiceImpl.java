package com.gustavo.library.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gustavo.library.entity.Book;
import com.gustavo.library.exception.BookNotFoundException;
import com.gustavo.library.repository.BookRepository;

@Service
public class BooksServiceImpl implements BookService {

  @Autowired
  BookRepository bookRepository;

  @Override
  public Book getBook(Long id) {
    // Check if the value is null or empty
    Optional<Book> book = bookRepository.findById(id);

    if (book.isPresent()) {
      return book.get();
    } else {
      throw new BookNotFoundException(id);
    }

  }

  @Override
  public Book saveBook(Book book) {
    return bookRepository.save(book);
  }

  @Override
  public void deleteBook(Long id) {
    bookRepository.deleteById(id);
  }

  @Override
  public List<Book> getBooks() {
    List<Book> books = (List<Book>) bookRepository.findAll();
    return books;
  }

  @Override
  public Book updateComplete(Long id) {
    Book book = bookRepository.findById(id).get();
    Boolean completeOppositeBoolean = !(book.getComplete());
    book.setComplete(completeOppositeBoolean);
    return bookRepository.save(book);
  }

  static Book unwrapBook(Optional<Book> entity, Long id) {
    if (entity.isPresent())
      return entity.get();
    // else return and BookNotFoundException
    return null;
  }
}
