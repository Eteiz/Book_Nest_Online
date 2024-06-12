package com.example.demo;

import com.example.demo.model.entities.*;
import com.example.demo.model.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.demo.model.enums.UserRoleValueEnum;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@SpringBootApplication
public class OnlineLibraryWebAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(OnlineLibraryWebAppApplication.class, args);
	}

	@Bean
	ApplicationRunner initDatabaseCategories(
			AuthorRepository authorRepository,
			BookRepository bookRepository,
			BookTypeRepository bookTypeRepository,
			CategoryRepository categoryRepository,
			UserRepository userRepository,
			UserRoleRepository userRoleRepository,
			PasswordEncoder passwordEncoder) {

		return args -> {
			// User roles
			UserRole userRole = new UserRole();
			userRole.setValue(UserRoleValueEnum.USER);

			UserRole adminRole = new UserRole();
			adminRole.setValue(UserRoleValueEnum.ADMIN);

			userRoleRepository.saveAll(List.of(userRole, adminRole));

			// Users
			User userAdmin = new User();
			userAdmin.setEmail("m.ambroziak.contact@gmail.com");
			userAdmin.setPasswordHash(passwordEncoder.encode("2pI9ldy9TbmbwIA"));
			userAdmin.setFirstName("Marta");
			userAdmin.setLastName("Ambroziak");
			userAdmin.setPhoneNumber("123456789");
			userAdmin.setAddress("ul. Lorem Ipsum 2");
			userAdmin.setPostalCode("00-001");
			userAdmin.setCity("Łódź");
			userAdmin.setPesel("12345678901");
			userAdmin.setBirthDate(java.time.LocalDate.now());
			userAdmin.setRole(adminRole);
			userAdmin.setCreatedAt(java.time.LocalDateTime.now());
			userAdmin.setLastLoggedAt(java.time.LocalDateTime.now());
			userAdmin.setIsActive(true);

			User userUser = new User();
			userUser.setEmail("user@gmail.com");
			userUser.setPasswordHash(passwordEncoder.encode("2pI9ldy9TbmbwIA"));
			userUser.setFirstName("User");
			userUser.setLastName("User");
			userUser.setPhoneNumber("123456789");
			userUser.setAddress("ul. Lorem Ipsum 1");
			userUser.setPostalCode("12-345");
			userUser.setCity("Łódź");
			userUser.setPesel("12345678901");
			userUser.setBirthDate(java.time.LocalDate.now());
			userUser.setRole(userRole);
			userUser.setCreatedAt(java.time.LocalDateTime.now());
			userUser.setLastLoggedAt(java.time.LocalDateTime.now());
			userUser.setIsActive(true);

			userRepository.saveAll(List.of(userUser, userAdmin));

			// Categories
			Category categoryFantasy = new Category();
			categoryFantasy.setName("Fantasy");
			categoryFantasy.setCreatedAt(java.time.LocalDateTime.now());
			categoryFantasy.setModifiedAt(java.time.LocalDateTime.now());

			Category categoryScienceFiction = new Category();
			categoryScienceFiction.setName("Science Fiction");
			categoryScienceFiction.setCreatedAt(java.time.LocalDateTime.now());
			categoryScienceFiction.setModifiedAt(java.time.LocalDateTime.now());

			Category categoryHorror = new Category();
			categoryHorror.setName("Horror");
			categoryHorror.setCreatedAt(java.time.LocalDateTime.now());
			categoryHorror.setModifiedAt(java.time.LocalDateTime.now());

			categoryRepository.saveAll(List.of(categoryFantasy, categoryScienceFiction, categoryHorror));

			// Authors
			Author authorJohn = new Author();
			authorJohn.setFirstName("John");
			authorJohn.setLastName("Doe");
			authorJohn.setCreatedAt(java.time.LocalDateTime.now());
			authorJohn.setModifiedAt(java.time.LocalDateTime.now());

			Author authorJane = new Author();
			authorJane.setFirstName("Jane");
			authorJane.setLastName("Smith");
			authorJane.setCreatedAt(java.time.LocalDateTime.now());
			authorJane.setModifiedAt(java.time.LocalDateTime.now());

			Author authorMichael = new Author();
			authorMichael.setFirstName("Michael");
			authorMichael.setLastName("Johnson");
			authorMichael.setCreatedAt(java.time.LocalDateTime.now());
			authorMichael.setModifiedAt(java.time.LocalDateTime.now());

			Author authorEmily = new Author();
			authorEmily.setFirstName("Emily");
			authorEmily.setLastName("Davis");
			authorEmily.setCreatedAt(java.time.LocalDateTime.now());
			authorEmily.setModifiedAt(java.time.LocalDateTime.now());

			Author authorDavid = new Author();
			authorDavid.setFirstName("David");
			authorDavid.setLastName("Brown");
			authorDavid.setCreatedAt(java.time.LocalDateTime.now());
			authorDavid.setModifiedAt(java.time.LocalDateTime.now());

			authorRepository.saveAll(List.of(authorJohn, authorJane, authorMichael, authorEmily, authorDavid));

			// Book Types
			BookType bookTypeAudiobook = new BookType();
			bookTypeAudiobook.setName("Audtiobook");
			bookTypeAudiobook.setCreatedAt(java.time.LocalDateTime.now());
			bookTypeAudiobook.setModifiedAt(java.time.LocalDateTime.now());

			BookType bookTypeDigital = new BookType();
			bookTypeDigital.setName("Digital");
			bookTypeDigital.setCreatedAt(java.time.LocalDateTime.now());
			bookTypeDigital.setModifiedAt(java.time.LocalDateTime.now());

			BookType bookTypePhysical = new BookType();
			bookTypePhysical.setName("Physical");
			bookTypePhysical.setCreatedAt(java.time.LocalDateTime.now());
			bookTypePhysical.setModifiedAt(java.time.LocalDateTime.now());

			bookTypeRepository.saveAll(List.of(bookTypeAudiobook, bookTypeDigital, bookTypePhysical));

			// Books
			Book book1 = new Book();
			book1.setName("Book One");
			book1.setDescription("Description for book one");
			book1.setImageUrl("book_one.jpg");
			book1.setReleaseDate(java.time.LocalDateTime.now());
			book1.setIsAvailable(true);
			book1.setCreatedAt(java.time.LocalDateTime.now());
			book1.setModifiedAt(java.time.LocalDateTime.now());
			book1.setAuthors(List.of(authorJane, authorDavid));
			book1.setCategories(List.of(categoryFantasy));
			book1.setBookTypes(List.of(bookTypePhysical));

			Book book2 = new Book();
			book2.setName("Book Two");
			book2.setDescription("Description for book two");
			book2.setImageUrl("book_two.jpg");
			book2.setReleaseDate(java.time.LocalDateTime.now());
			book2.setIsAvailable(true);
			book2.setCreatedAt(java.time.LocalDateTime.now());
			book2.setModifiedAt(java.time.LocalDateTime.now());
			book2.setAuthors(List.of(authorJohn));
			book2.setCategories(List.of(categoryScienceFiction));
			book2.setBookTypes(List.of(bookTypePhysical, bookTypeDigital));

			Book book3 = new Book();
			book3.setName("Book Three");
			book3.setDescription("Description for book three");
			book3.setImageUrl("book_three.jpg");
			book3.setReleaseDate(java.time.LocalDateTime.now());
			book3.setIsAvailable(true);
			book3.setCreatedAt(java.time.LocalDateTime.now());
			book3.setModifiedAt(java.time.LocalDateTime.now());
			book3.setAuthors(List.of(authorMichael, authorEmily));
			book3.setCategories(List.of(categoryFantasy));
			book3.setBookTypes(List.of(bookTypeAudiobook));

			Book book4 = new Book();
			book4.setName("Book Four");
			book4.setDescription("Description for book four");
			book4.setImageUrl("book_four.jpg");
			book4.setReleaseDate(java.time.LocalDateTime.now());
			book4.setIsAvailable(true);
			book4.setCreatedAt(java.time.LocalDateTime.now());
			book4.setModifiedAt(java.time.LocalDateTime.now());
			book4.setAuthors(List.of(authorJohn, authorMichael, authorDavid));
			book4.setCategories(List.of(categoryHorror));
			book4.setBookTypes(List.of(bookTypeAudiobook));

			Book book5 = new Book();
			book5.setName("Book Five");
			book5.setDescription("Description for book five");
			book5.setImageUrl("book_five.jpg");
			book5.setReleaseDate(java.time.LocalDateTime.now());
			book5.setIsAvailable(true);
			book5.setCreatedAt(java.time.LocalDateTime.now());
			book5.setModifiedAt(java.time.LocalDateTime.now());
			book5.setAuthors(List.of(authorJane, authorDavid));
			book5.setCategories(List.of(categoryFantasy));
			book5.setBookTypes(List.of(bookTypePhysical));

			Book book6 = new Book();
			book6.setName("Book Six");
			book6.setDescription("Description for book six");
			book6.setImageUrl("book_six.jpg");
			book6.setReleaseDate(java.time.LocalDateTime.now());
			book6.setIsAvailable(true);
			book6.setCreatedAt(java.time.LocalDateTime.now());
			book6.setModifiedAt(java.time.LocalDateTime.now());
			book6.setAuthors(List.of(authorJohn, authorMichael, authorEmily));
			book6.setCategories(List.of(categoryScienceFiction, categoryHorror));
			book6.setBookTypes(List.of(bookTypeDigital, bookTypePhysical));

			Book book7 = new Book();
			book7.setName("Book Seven");
			book7.setDescription("Description for book seven");
			book7.setReleaseDate(java.time.LocalDateTime.now());
			book7.setIsAvailable(true);
			book7.setCreatedAt(java.time.LocalDateTime.now());
			book7.setModifiedAt(java.time.LocalDateTime.now());
			book7.setAuthors(List.of(authorJane, authorMichael, authorDavid, authorEmily));
			book7.setCategories(List.of(categoryFantasy, categoryHorror, categoryScienceFiction));
			book7.setBookTypes(List.of(bookTypeDigital));

			Book book8 = new Book();
			book8.setName("Book Eight");
			book8.setDescription("Description for book eight");
			book8.setReleaseDate(java.time.LocalDateTime.now());
			book8.setIsAvailable(true);
			book8.setCreatedAt(java.time.LocalDateTime.now());
			book8.setModifiedAt(java.time.LocalDateTime.now());
			book8.setAuthors(List.of(authorJohn, authorDavid));
			book8.setCategories(List.of(categoryScienceFiction));
			book8.setBookTypes(List.of(bookTypeDigital));

			Book book9 = new Book();
			book9.setName("Book Nine");
			book9.setDescription("Description for book nine");
			book9.setReleaseDate(java.time.LocalDateTime.now());
			book9.setIsAvailable(true);
			book9.setCreatedAt(java.time.LocalDateTime.now());
			book9.setModifiedAt(java.time.LocalDateTime.now());
			book9.setAuthors(List.of(authorMichael, authorEmily, authorDavid, authorJane));
			book9.setCategories(List.of(categoryHorror));
			book9.setBookTypes(List.of(bookTypeAudiobook));

			Book book10 = new Book();
			book10.setName("Book Ten");
			book10.setDescription("Description for book ten");
			book10.setReleaseDate(java.time.LocalDateTime.now());
			book10.setIsAvailable(true);
			book10.setCreatedAt(java.time.LocalDateTime.now());
			book10.setModifiedAt(java.time.LocalDateTime.now());
			book10.setAuthors(List.of(authorJohn, authorMichael, authorDavid, authorEmily, authorJane));
			book10.setCategories(List.of(categoryScienceFiction));
			book10.setBookTypes(List.of(bookTypePhysical, bookTypeDigital));

			bookRepository.saveAll(List.of(book1, book2, book3, book4, book5, book6, book7, book8, book9, book10));
		};
	}

}
