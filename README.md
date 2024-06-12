# BookNest Online 📖
<p align="center">
  <img src="https://github.com/Eteiz/Book_Nest_Online/assets/97179185/750c1642-2ad0-4539-9cad-cc4bdd9bfcbe" />
</p>
This project was undertaken as part of a course requirement for "Advanced Database Applications" at the Łódź University of Technology. It is a simple online platform that allows users to create accounts and log in, after which they can borrow digital works using a search engine with available filters and track the status of their loans. The site also includes administrator accounts, which currently have permissions to add digital works, withdraw existing ones, and view the loan statuses of all users.
<br></br>
<p align="center">
  <img src="https://github.com/Eteiz/Book_Nest_Online/assets/97179185/6c496bd4-c6d9-44a7-9018-f056c3e7ae24" />
</p>

## Technology and tools ⚙️
The frontend of the application was developed using [React JS](https://react.dev/), leveraging the [MUI React](https://mui.com/) component library. Session state and data management were handled with [Redux](https://redux.js.org/), and database queries were made using [RTK Query](https://redux-toolkit.js.org/rtk-query/overview).
The backend was implemented with [Spring](https://spring.io/) and PostgreSQL, utilizing JPA and Hibernate for database interactions, and JWT tokens for request authorization.

## Validation 📎
All forms filled out by users or administrators were validated both on the frontend and backend. Frontend validation was implemented using rules defined in `frontend/utils/validation.js`, while backend validation was handled using annotations and validation groups with `@Validated` annotation.
<p align="center">
  <img src="https://github.com/Eteiz/Book_Nest_Online/assets/97179185/4d9b8e40-27fc-4e97-a7d6-89bce5ab154b" />
</p>

Part of `UserData.java` validation for postalCode:
```
        @NotNull(groups = {UserDataValidation.Register.class, UserDataValidation.Update.class})
        @Size(min = 6, max = 6, groups = {UserDataValidation.Register.class, UserDataValidation.Update.class})
        @Pattern(regexp = "\\d{2}-\\d{3}",
                message = "Postal code must be in the format nn-nnn where n is a number",
                groups = {UserDataValidation.Register.class, UserDataValidation.Update.class})
        @JsonView(UserDataView.Profile.class)
        String postalCode,
```
Part of `validation.js` validation for postalCode:
```
  export const validatePostalCode = (postalCode) => {
    const postalCodeRegex = /^\d{2}-\d{3}$/;
    if (!postalCode) {
      return 'Postal code is required.';
    }
    if (!postalCodeRegex.test(postalCode)) {
      return 'Postal code must be in the format nn-nnn.';
    }
    return null;
  };
```

## Safety measures 🔐
The application’s security was implemented by configuring SecurityFilterChain and CorsFilter on the Spring side in `config/SecurityConfig.java`. This allowed for filtering incoming requests and authorizing them using JWT tokens. Some endpoints required additional authorization, with the token containing user information such as their role ("USER" or "ADMIN") to control who could perform certain requests. Control over which data from the backend was sent to the frontend was implemented using Data Transfer Objects (DTOs), view groups with `@JsonView`, and mappers from the `model/utils/Mapper.java` class. 

On the frontend, session state was checked with each database request and action requiring a logged-in user or administrator, and the application responded accordingly. 

> [!NOTE]
> Passwords stored in the database were hashed using the `BCryptPasswordEncoder` class and had to meet the following requirements: `must be a minimum of eight characters, with at least one uppercase letter, one lowercase letter, and one number`.

## Application features 🖥️
### Catalog and book page
The catalog contains a list of all books in BookNest Online. They are displayed in a table that allows for page size adjustment, pagination, and filtering. From this level, users can borrow a book or view its detail page.
<p align="center">
  <img src="https://github.com/Eteiz/Book_Nest_Online/assets/97179185/0ab5479a-44f6-4ce9-a63f-da7603f92f25" width="45%" />
  <img src="https://github.com/Eteiz/Book_Nest_Online/assets/97179185/f163c640-874c-4ccc-bbaa-060aef9cbe83" width="45%" />
</p>

### User's profile and rental history
The user has access to a profile page where they can edit their information and archive their account. Additionally, there is a borrowing history page that allows users to view their loan history, return books, and check due dates.
<p align="center">
  <img src="https://github.com/Eteiz/Book_Nest_Online/assets/97179185/9957c4b7-ffe6-4bf2-9e19-ed056cf19ffe" width="45%" />
  <img src="https://github.com/Eteiz/Book_Nest_Online/assets/97179185/62156780-111e-438d-9377-8742aeae5460" width="45%" />
</p>

> [!CAUTION]
> When a user archives their account, it is not deleted; instead, its status is changed to prevent logging in.

### Administrator's features
An administrator account has the same permissions and capabilities as a regular user, with the addition of a panel that allows viewing all user borrowings and the ability to add and remove books from the catalog.
<p align="center">
  <img src="https://github.com/Eteiz/Book_Nest_Online/assets/97179185/c695912c-c7c7-42ee-98b2-f721ea086f70" width="45%" />
  <img src="https://github.com/Eteiz/Book_Nest_Online/assets/97179185/51efafc7-3c4c-4bd7-b0b6-633c47993d9d" width="45%" />
</p>

> [!IMPORTANT]
> The database is initialized with sample data, including two accounts:
> 
> Administrator that logs on http://localhost:3000/signin
> - **Email:** m.ambroziak.contact@gmail.com
> - **Password:** 2pI9ldy9TbmbwIA
> 
> User that logs on http://localhost:3000/signinadmin
> - **Email:** user@gmail.com
> - **Password:** 2pI9ldy9TbmbwIA

# Credits and Acknowledgements 👏
Sources of data and elements used in the project:
**I do not have any rights to the following elements, and they were used for educational purposes**
- Banner and logo from [Canva](https://www.canva.com),
- Images found on [Google Images](https://www.google.pl/imghp) and [Freepik](www.freepik.com/free-vector/thesis-concept-illustration_20824350.htm#fromView=search&page=1&position=3&uuid=bda7643a-99f4-4910-b399-16f305f95e62),
- Text on the website, modified to fit the theme done with [ChatGPT](https://openai.com/blog/chatgpt).
