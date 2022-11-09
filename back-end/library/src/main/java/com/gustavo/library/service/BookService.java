package com.gustavo.library.service;

import java.util.List;

import com.gustavo.library.entity.Book;

public interface BookService {
  Book getBook(Long id);

  Book saveBook(Book book);

  Book updateBook(Long id, String tittle, String author, Integer pages);

  Book updateComplete(Long id);

  void deleteBook(Long id);

  List<Book> getBooks();
}
