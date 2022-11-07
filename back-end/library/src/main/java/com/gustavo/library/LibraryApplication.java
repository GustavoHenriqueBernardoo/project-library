package com.gustavo.library;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.gustavo.library.entity.Book;
import com.gustavo.library.repository.BookRepository;

@SpringBootApplication
public class LibraryApplication implements CommandLineRunner {

	@Autowired
	BookRepository bookRepository;

	public static void main(String[] args) {
		SpringApplication.run(LibraryApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Book[] books = new Book[] {
				new Book("Mistborn", "Brandon Sanderson", 580, true),
				new Book("Verity", "Collen How", 267, true)
		};

		for (int i = 0; i < books.length; i++) {
			bookRepository.save(books[i]);
		}
	}

}
