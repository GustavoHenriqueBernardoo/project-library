package com.gustavo.library.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import lombok.*;

@Getter
@Setter

@RequiredArgsConstructor
@NoArgsConstructor
@ToString

@Entity
@Table(name = "book")
public class Book {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @NotBlank(message = "Tittle cannot be blank")
  @NonNull
  @Column(name = "title", nullable = false)
  private String title;

  @NotBlank(message = "Author cannot be blank")
  @NonNull
  @Column(name = "author", nullable = false)
  private String author;

  @NonNull
  @Min(value = 1, message = "Number of pages cannot be less or equal to zero")
  @Column(name = "pages", nullable = false)
  private Integer pages;

  @NonNull
  @Column(name = "complete", nullable = false)
  private Boolean complete;

}
