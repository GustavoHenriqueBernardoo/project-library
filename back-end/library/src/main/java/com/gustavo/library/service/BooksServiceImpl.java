package com.gustavo.library.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gustavo.library.entity.Book;
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
      throw new IllegalArgumentException();
    }

    // return null;
  }

  @Override
  public Book saveBook(Book book) {
    // TODO Auto-generated method stub
    return null;
  }

  @Override
  public void deleteBook(Long id) {
    // TODO Auto-generated method stub

  }

  @Override
  public List<Book> getBooks() {
    // TODO Auto-generated method stub
    return null;
  }

  static Book unwrapBook(Optional<Book> entity, Long id) {
    if (entity.isPresent())
      return entity.get();
    // else return and BookNotFoundException
    return null;
  }

}
