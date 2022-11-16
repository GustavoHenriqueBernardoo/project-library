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

    // List<Book> books = (List<Book>) bookRepository.findAll();

    // for (int i = 0; i < books.size(); i++) {
    // if (books.get(i).equals(book)) {
    // System.out.println(books.get(i));
    // System.out.println(true);
    // throw new BookNotFoundException(null);
    // }
    // }

    return bookRepository.save(book);

  }

  @Override
  public Book updateBook(Long id, String tittle, String author, Integer pages, Boolean complete) {

    Optional<Book> book = bookRepository.findById(id);

    if (book.isPresent()) {
      Book unwrappedBook = book.get();
      unwrappedBook.setTitle(tittle);
      unwrappedBook.setAuthor(author);
      unwrappedBook.setPages(pages);
      unwrappedBook.setComplete(complete);

      return bookRepository.save(unwrappedBook);
    } else {
      throw new BookNotFoundException(id);
    }

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
