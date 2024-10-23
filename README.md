
<p align="center">
    <h1 align="center">DINAMO.GIT</h1>
</p>

<p align="center">
    <h3 align="center">live url on vercel : https://dinamo-six.vercel.app/api </h1>
</p>

<p align="center">
    <h3 align="center">facebook / google Auth are working!! </h3>
</p>

<p align="center">
    <h4 align="center"> please note facebooke / googgle auth no in prod so they redirect to google after auth finishes </h4>
</p>


<p align="center">
	<!-- default option, no dependency badges. -->
</p>

<br>

#####  Table of Contents

- [ Overview](#-overview)
- [ Features](#-features)
- [ Repository Structure](#-repository-structure)
- [ Modules](#-modules)
- [ Getting Started](#-getting-started)
    - [ Prerequisites](#-prerequisites)
    - [ Installation](#-installation)
    - [ Usage](#-usage)
    - [ Tests](#-tests)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)

---

##  Overview

Dinamo.git is an open-source project that leverages NestJS for building scalable backend applications. It provides robust authentication mechanisms, user management functionalities, and secure API endpoints. With support for MongoDB integration, JWT authentication, and social media login options, Dinamo.git facilitates the seamless development of e-commerce platforms and web applications. By encapsulating user authentication, product management, and vendor operations within distinct modules, Dinamo.git streamlines application architecture and enhances overall security measures.

---

---

## APIs on Postman

see postman documenatations on : https://documenter.getpostman.com/view/34422718/2sAY4rE4jD

---

##  Features

|    |   Feature         | Description |
|----|-------------------|---------------------------------------------------------|
| ⚙️  | **Architecture**  | Dinamo utilizes NestJS with MongoDB and Passport for authentication, providing a modular and scalable backend architecture. The codebase follows a service-oriented design and integrates well with external services. |
| 🔩 | **Code Quality**  | The project maintains good code quality with TypeScript, ESLint, and Prettier. Consistent formatting and linting rules are applied, ensuring code readability and maintainability. |
| 📄 | **Documentation** | Dinamo features detailed documentation covering authentication, modules, DTOs, and schemas. This documentation aids developers in understanding the project structure and usage of various components. |
| 🔌 | **Integrations**  | It integrates with Jest for testing, Passport for authentication strategies, and various NestJS modules for enhanced functionality. External dependencies include bcryptjs, mongoose, and passport strategies. |
| 🧩 | **Modularity**    | The codebase exhibits a high degree of modularity with separate modules for user, vendor, product, and cart functionalities. Each module encapsulates related logic, promoting reusability and maintainability. |
| 🧪 | **Testing**       | Testing is done using Jest, supertest, and @nestjs/testing. End-to-end testing ensures the correct functioning of HTTP endpoints and validates business logic. |
| ⚡️  | **Performance**   | Efficient resource usage is maintained by using RxJS for reactive programming and optimizing TypeScript configurations. The application demonstrates good speed and scalability potential. |
| 🛡️ | **Security**      | Security measures include JWT authentication, OAuth strategies, bcrypt for password hashing, and role-based access control. The codebase follows best practices to safeguard data and control access. |
| 📦 | **Dependencies**  | Key dependencies include @nestjs, MongoDB via mongoose, Passport strategies for OAuth, and various TypeScript-related tools for development. |
| 🚀 | **Scalability**   | The project is well-structured for scalability, leveraging NestJS's modular architecture and MongoDB for flexible data handling. With proper load balancing, it can efficiently handle increased traffic and evolving requirements. |

---

##  Repository Structure

```sh
└── Dinamo.git/
    ├── README.md
    ├── nest-cli.json
    ├── package-lock.json
    ├── package.json
    ├── src
    │   ├── app.controller.ts
    │   ├── app.module.ts
    │   ├── app.service.ts
    │   ├── auth
    │   ├── common
    │   ├── main.ts
    │   └── modules
    ├── test
    │   ├── app.e2e-spec.ts
    │   └── jest-e2e.json
    ├── tsconfig.build.json
    ├── tsconfig.json
    └── vercel.json
```

---

##  Modules


<details closed><summary>src</summary>

| File | Summary |
| --- | --- |
| [app.controller.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/app.controller.ts) | Handles HTTP requests, connecting service logic to endpoint responses within the Nest.js architecture. |
| [app.module.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/app.module.ts) | Defines module imports and configurations for user, product, vendor, and cart functionality using NestJS. Integrates MongoDB with Mongoose. Contains global configuration setup and application controller/provider declarations. |
| [app.service.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/app.service.ts) | Defines a service to retrieve a standard greeting message in the Nest.js application. |
| [main.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/main.ts) | Initiates the Nest.js application by creating the main application instance, configuring CORS, setting a global API prefix, and applying a global validation pipeline to enable data validation for all incoming requests. |

</details>

<details closed><summary>test</summary>

| File | Summary |
| --- | --- |
| [app.e2e-spec.ts](https://github.com/itzSerag/Dinamo.git/blob/main/test/app.e2e-spec.ts) | Tests the apps HTTP endpoint using NestJS testing framework, ensuring it returns Hello World!' response on GET request. This file validates the functionality of the `AppController` within the `AppModule` for end-to-end testing. |
| [jest-e2e.json](https://github.com/itzSerag/Dinamo.git/blob/main/test/jest-e2e.json) | Configures Jest for end-to-end testing. Specifies test file extensions, root directory, test environment, and regex pattern. Transforms TypeScript files using ts-jest. |

</details>

<details closed><summary>src.auth</summary>

| File | Summary |
| --- | --- |
| [auth.controller.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/auth/auth.controller.ts) | Handles user authentication with signup, login, and various social media providers. Generates JWT for authorization and redirects users to the home page with the access token. Provides a protected route for authenticated users. |
| [auth.module.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/auth/auth.module.ts) | Defines authentication strategies with controllers, services, and guards. Handles JWT, Google, Facebook, and vendor authentication. Manages circular dependencies and exports Auth service and guards for use in other modules. |
| [auth.service.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/auth/auth.service.ts) | Implements user authentication and authorization logic using JWT tokens. Handles user signup, login, and social media authentication. Performs token generation and user verification checks efficiently in the NestJS architecture. |

</details>

<details closed><summary>src.auth.dto</summary>

| File | Summary |
| --- | --- |
| [createUser.dto.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/auth/dto/createUser.dto.ts) | Defines a DTO class for creating a user with required fields like first name, last name, phone number of specific length, and password. It enforces validation rules for input data integrity in the user creation process within the repository. |
| [index.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/auth/dto/index.ts) | Exports login and create user data transfer objects for authentication. Facilitates seamless reusability of DTOs in various modules within the Nest.js application architecture. |
| [login.dto.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/auth/dto/login.dto.ts) | Defines validation rules for login credentials in the `auth` module. Ensures phone number and password are provided and of string type for secure authentication in the Nest.js application. |

</details>

<details closed><summary>src.auth.guards</summary>

| File | Summary |
| --- | --- |
| [isVerified.auth.guard.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/auth/guards/isVerified.auth.guard.ts) | Ensures user verification status before accessing routes, enforcing security in the NestJS application. Integrated within the Auth module, enhancing the repositorys architecture with safeguarding functionality. |
| [jwt.auth.guard.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/auth/guards/jwt.auth.guard.ts) | Enables JWT authentication validation using Passport within the NestJS framework. |
| [jwtVendor.auth.guard.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/auth/guards/jwtVendor.auth.guard.ts) | Enables JWT authentication for vendor users. |

</details>

<details closed><summary>src.auth.interfaces</summary>

| File | Summary |
| --- | --- |
| [index.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/auth/interfaces/index.ts) | Exposes payload interface for authentication module in the app to maintain a clear separation of concerns. |
| [payload.interface.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/auth/interfaces/payload.interface.ts) | Defines JWT payload structure with user ID, username, role, issued at, and expiration time, using Role enum from common module. |
| [profile-Outh.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/auth/interfaces/profile-Outh.ts) | Defines Google OAuth user profile data structure for authentication. Contains essential user details like ID, name, email, and photo. Standardizes Google OAuth response handling across the application. |

</details>

<details closed><summary>src.auth.scheams</summary>

| File | Summary |
| --- | --- |
| [otp.schema.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/auth/scheams/otp.schema.ts) | Defines OTP schema for authentication module ensuring secure and efficient OTP generation and validation. Enhances user authentication functionality in the parent repository by enforcing OTP schema in the auth module. |

</details>

<details closed><summary>src.auth.strategies</summary>

| File | Summary |
| --- | --- |
| [facebook.strategy.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/auth/strategies/facebook.strategy.ts) | Implements Facebook authentication strategy for the NestJS app. Utilizes Passport with Facebook OAuth, retrieving user info and passing it for validation. Critical for enabling Facebook login functionality within the apps authentication system. |
| [google.strategy.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/auth/strategies/google.strategy.ts) | Defines Google OAuth2.0 strategy for authentication, accessing user profile data. Configures client ID, secret, callback URL. Validates users profile, maps data to custom user object for login. |
| [jwt.strategy.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/auth/strategies/jwt.strategy.ts) | Implements JWT authentication strategy to validate user tokens and retrieve user info for controllers in the NestJS app. Integrates Passport for seamless authentication flow and user authorization. |
| [jwtVendor.strategy.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/auth/strategies/jwtVendor.strategy.ts) | Implements JWT authentication strategy for vendors, leveraging Passport in NestJS. Retrieves vendor details from service for validation, ensuring secure access control in the repositorys modular architecture. |

</details>

<details closed><summary>src.common.enums</summary>

| File | Summary |
| --- | --- |
| [index.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/common/enums/index.ts) | Exports enums for providers and user roles from the common module in the parent repository. This file consolidates enum definitions for seamless access throughout the projects modules. |
| [providers.enum.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/common/enums/providers.enum.ts) | Defines authentication providers as enums for easy reference and centralized management. Enhances code readability and maintainability by consolidating provider options, promoting consistency across the applications authentication functionality. |
| [user.role.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/common/enums/user.role.ts) | Defines user roles as USER and ADMIN for managing access permissions across the application, centralizing role definitions to ensure consistency and security. |

</details>

<details closed><summary>src.common.guards</summary>

| File | Summary |
| --- | --- |
| [admin.guard.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/common/guards/admin.guard.ts) | Enforce admin access control in Nest.js by validating user roles with the AdminGuard. Ensure only users with an ADMIN role can access designated routes, preventing unauthorized access. |
| [index.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/common/guards/index.ts) | Exports admin and vendor guard modules for centralized access control in the repositorys Nest.js architecture. |
| [vendor.guard.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/common/guards/vendor.guard.ts) | Implements `VendorGuard` in the `src/common/guards` directory. Verifies user role for admin access in a NestJS application. Utilizes `CanActivate` interface to handle authorization logic based on user role. |

</details>

<details closed><summary>src.modules.cart</summary>

| File | Summary |
| --- | --- |
| [cart.controller.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/cart/cart.controller.ts) | Handles adding, fetching, removing, and clearing items in the cart. Secured with JWT authentication. Integrated with CartService for CRUD operations. Complements the modular structure of the repository by managing cart-related endpoints. |
| [cart.module.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/cart/cart.module.ts) | Defines a module to manage shopping carts, linking it to the parent repositorys Nest.js architecture. Provisions controllers and services for handling cart operations, integrating with MongoDB using Mongoose for data storage. |
| [cart.service.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/cart/cart.service.ts) | Add items, view cart, remove items, and clear cart for active users. Uses MongoDB models for carts and products to handle cart update logic efficiently within the NestJS application structure. |

</details>

<details closed><summary>src.modules.product</summary>

| File | Summary |
| --- | --- |
| [product.controller.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/product/product.controller.ts) | Handles product CRUD operations for vendors, implementing authentication with JWT. Supports fetching, creating, updating, and deleting products. Provides separate endpoints for vendor-specific actions and general product retrieval by ID. |
| [product.module.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/product/product.module.ts) | Defines a module for managing products, integrating controllers and services, and importing vendor dependencies. Allows for product database interactions using Mongoose and connects with the parent repositorys architecture for cohesive functionality. |
| [product.service.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/product/product.service.ts) | Manages vendor-specific product operations by creating, updating, retrieving, and deleting products. Ensures vendor existence, maintains product-vendor relationships, and handles error cases with customizable messages. |

</details>

<details closed><summary>src.modules.user</summary>

| File | Summary |
| --- | --- |
| [user.controller.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/user/user.controller.ts) | Orchestrates user data retrieval and manipulation for authenticated users.-Implements user-specific endpoints secured with JWT and admin guards.-Interacts with UserService to fetch all users and self-profile details. |
| [user.module.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/user/user.module.ts) | Defines a module for user-related functionality in the NestJS application, including controllers, services, and MongoDB schema integration. Facilitates user management and data operations within the larger repository structure. |
| [user.service.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/user/user.service.ts) | Manages user data in the repository, facilitating user creation, retrieval by ID, fetching all users, and getting user details by ID. The service interacts with the database model to execute these operations. |

</details>

<details closed><summary>src.modules.vendor</summary>

| File | Summary |
| --- | --- |
| [vendor.controller.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/vendor/vendor.controller.ts) | Implements vendor signup and login functionality using Nest.js. Handles requests to create and authenticate vendors, interacting with the VendorService. Centralizes vendor-related operations within the vendor endpoint for improved code organization in the repository architecture. |
| [vendor.module.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/vendor/vendor.module.ts) | Defines a module handling vendor-related logic, including services and controllers. Integrates with Mongoose for data manipulation and forwards authentication functionalities from the Auth Module. Key exports include VendorService and Mongoose features for external use. |
| [vendor.service.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/vendor/vendor.service.ts) | Implements Vendor CRUD operations, user authentication, and error handling. Interacts with the database using Mongoose models. Integrates with an authentication service to generate JWT tokens. |

</details>

<details closed><summary>src.modules.cart.dto</summary>

| File | Summary |
| --- | --- |
| [cart.dto.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/cart/dto/cart.dto.ts) | Defines structure for adding items to the shopping cart in the cart module. Validates product ID as string or MongoDB ObjectID, and quantity as a positive number. Enhances data integrity and input validation capabilities for e-commerce functionality. |
| [index.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/cart/dto/index.ts) | Exports cart data transfer object from the respective module, contributing to code organization and reusability in the Nest.js application. |

</details>

<details closed><summary>src.modules.cart.schemas</summary>

| File | Summary |
| --- | --- |
| [cart.schema.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/cart/schemas/cart.schema.ts) | Defines Mongoose schema for user shopping carts. Features include user reference, item details, and status tracking. Maintains timestamps and supports various cart statuses within the NestJS applications modular architecture. |

</details>

<details closed><summary>src.modules.product.dto</summary>

| File | Summary |
| --- | --- |
| [index.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/product/dto/index.ts) | Exports the product DTO from the product module. Organizes DTO-related functionalities in a single location for improved code maintainability and easier access. Contributes to a structured architecture within the repository. |
| [product.dto.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/product/dto/product.dto.ts) | CreateProductDTO for creating products and UpdateProductDTO for updating them. These classes enforce validation rules ensuring the correctness of product data in the overall project structure. |

</details>

<details closed><summary>src.modules.product.schemas</summary>

| File | Summary |
| --- | --- |
| [product.schema.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/product/schemas/product.schema.ts) | Defines a product schema with name, description, price, stock, vendor reference, categories, and images URLs. Maintains data consistency and timestamps. Resides in the modules/product/schemas directory within the Nest.js architecture. |

</details>

<details closed><summary>src.modules.user.schemas</summary>

| File | Summary |
| --- | --- |
| [address.schema.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/user/schemas/address.schema.ts) | Defines a Mongoose schema for user addresses within the NestJS application, providing structure for storing essential address information. |
| [user.schema.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/user/schemas/user.schema.ts) | Defines a schema for user data with fields like name, contact info, roles, and password validation. Implements virtual properties and instance methods for user manipulation, including password hashing and validation. |

</details>

<details closed><summary>src.modules.vendor.dto</summary>

| File | Summary |
| --- | --- |
| [index.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/vendor/dto/index.ts) | Exposes Vendor Data StructureExports vendor data transfer object for seamless retrieval and manipulation of vendor-related details within the repositorys modular architecture. Centralizes vendor data management for enhanced code organization and accessibility. |
| [vendor.dto.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/vendor/dto/vendor.dto.ts) | Defines DTO classes for vendor creation, update, and login. Ensures data validity with class-validator decorators for properties like name, email, phone number, password, and address. Crucial for maintaining structured input in the vendor module. |

</details>

<details closed><summary>src.modules.vendor.schemas</summary>

| File | Summary |
| --- | --- |
| [vendor.schema.ts](https://github.com/itzSerag/Dinamo.git/blob/main/src/modules/vendor/schemas/vendor.schema.ts) | Defines a schema for vendors with properties like name, email, password, phoneNumber, address, and isVerified. Includes methods for password validation and hashing before saving. Ensures uniqueness for name and email fields, and sets minimum/maximum length for phoneNumber. |

</details>

---

##  Getting Started

###  Prerequisites

**TypeScript**: `version x.y.z`

###  Installation

Build the project from source:

1. Clone the Dinamo.git repository:
```sh
❯ git clone https://github.com/itzSerag/Dinamo.git
```

2. Navigate to the project directory:
```sh
❯ cd Dinamo.git
```

3. Install the required dependencies:
```sh
❯ npm install
```

###  Usage

To run the project, execute the following command:

```sh
❯ npm run build && node dist/main.js
```
