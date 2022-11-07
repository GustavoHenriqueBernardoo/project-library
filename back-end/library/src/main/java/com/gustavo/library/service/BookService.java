package com.gustavo.library.service;

import java.util.List;

import com.gustavo.library.entity.Book;

public interface BookService {
  Book getBook(Long id);

  Book saveBook(Book book);

  void deleteBook(Long id);

  List<Book> getBooks();
}