package com.gustavo.library.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;

import lombok.*;

@Getter
@Setter

@RequiredArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "book")
public class Book {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank
  @NonNull
  @Column(name = "title", nullable = false)
  private String title;

  @NotBlank
  @NonNull
  @Column(name = "author", nullable = false)
  private String author;

  @NonNull
  @Column(name = "pages", nullable = false)
  private int pages;

  @NonNull
  @Column(name = "complete", nullable = false)
  private boolean complete;

}
