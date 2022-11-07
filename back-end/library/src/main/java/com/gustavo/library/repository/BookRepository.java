package com.gustavo.library.repository;

import org.springframework.data.repository.CrudRepository;

import com.gustavo.library.entity.Book;

public interface BookRepository extends CrudRepository<Book, Long> {

}
