# Ecommerce Platform

## Overview
This is a full-stack ecommerce platform built with a React frontend, Django backend, and MySQL database. The platform allows users to browse products, add items to their cart, manage their cart, and proceed to checkout. The application includes user authentication and authorization features to secure access to certain functionalities.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
  - [Database Setup](#database-setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features
- Product listing and detail pages
- Add to cart and cart management
- User authentication (registration, login, logout)
- Checkout process
- Responsive design

## Tech Stack
- **Frontend**: React, Material-UI
- **Backend**: Django, Django REST Framework
- **Database**: MySQL

## Installation

### Frontend Setup
1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
2. Install the dependencies:
    ```sh
    npm install
    ```
3. Start the development server:
    ```sh
    npm start
    ```

### Backend Setup
1. Navigate to the `backend` directory:
    ```sh
    cd Backend
    ```
2. Create and activate a virtual environment:
    ```sh
    python -m venv venv
    source .venv/bin/activate  # On Windows use `.venv\Scripts\activate`
    ```
3. Install the dependencies:
    ```sh
    pip install -r requirements.txt
    ```
4. Apply the migrations:
    ```sh
    python manage.py migrate
    ```
5. Create a superuser to access the Django admin:
    ```sh
    python manage.py createsuperuser
    ```
6. Start the development server:
    ```sh
    python manage.py runserver
    ```

### Database Setup
1. Install MySQL and set up a new database.
2. Update the `settings.py` file in the backend project with your database credentials:
    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'your_database_name',
            'USER': 'your_database_user',
            'PASSWORD': 'your_database_password',
            'HOST': 'localhost',
            'PORT': '3306',
        }
    }
    ```

## Usage
- Navigate to the homepage to browse products.
- Click on a product to view its details and add it to the cart.
- Manage your cart by adding, removing, and updating item quantities.
- Register or log in to proceed to checkout.

## API Documentation
The backend API provides endpoints to manage products, users, and cart functionalities. Here are some key endpoints:

- `GET /api/products/`: Retrieve the list of products.
- `GET /api/products/<id>/`: Retrieve details of a specific product.
- `POST /api/cart/`: Add an item to the cart.
- `PUT /api/cart/<id>/`: Update the quantity of an item in the cart.
- `DELETE /api/cart/<id>/`: Remove an item from the cart.
- `POST /api/users/register/`: Register a new user.
- `POST /api/users/login/`: Log in a user.

## Contributing
Contributions are welcome! Please fork the repository and create a pull request with your changes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

