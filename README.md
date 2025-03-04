# Ecommerce Project

Welcome to Blendify, a full-stack e-commerce application designed to make shopping a delightful experience. This document provides instructions for setting up, running, and using both the backend and frontend components of MyShop.

## Introduction

Blendify is a comprehensive e-commerce application featuring a robust Django backend and a sleek React frontend. Whether you're a developer looking to contribute or a user eager to explore, this guide will help you get started.

---

## For Users

### Features

- **Browse Products**: View a wide range of products with detailed descriptions.
- **Add to Cart**: Easily add products to your shopping cart.
- **Wishlist**: Save your favorite products for later.
- **Reviews**: Read and write reviews for products.
- **Secure Payments**: Pay securely using PayPal.

### Getting Started

To start using MyShop, simply visit the [MyShop website](http://localhost:3000) (replace with the live URL once deployed). Browse through the products, add items to your cart, and enjoy a seamless shopping experience.

---

## For Developers

### Prerequisites

- Python 3.x
- Node.js
- MySQL
- Virtualenv
- npm or yarn

### Backend Setup

1. **Clone the Repository**:
   ```sh
   git clone https://github.com/hopeigbinosa123/FullStackDevelopment.git
   cd backend
   ```

````

2. **Create a Virtual Environment and Activate It**:

   ```sh
   python -m venv venv
   source venv/bin/activate
   ```

3. **Install the Required Packages**:

   ```sh
   pip install -r requirements.txt
   ```

4. **Configure the Database**:

   - Ensure you have MySQL installed and create a database named `ECOMMERCE`.
   - Update the `DATABASES` setting in `Backend/myshop_backend/settings.py` with your MySQL credentials.

5. **Apply the Migrations**:

   ```sh
   python manage.py migrate
   ```

6. **Create a Superuser**:

   ```sh
   python manage.py createsuperuser
   ```

7. **Run the Development Server**:
   ```sh
   python manage.py runserver
   ```

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
SECRET_KEY=your_secret_key
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

### API Endpoints

The available API endpoints are:

- `/api/products/` - List and create products
- `/api/orders/` - List and create orders
- `/api/reviews/` - List and create reviews
- `/api/wishlist/` - List and create wishlist items
- `/api/register/` - Register a new user
- `/api/login/` - Login an existing user

### Serving Media Files

To serve media files during development, ensure your `settings.py` has the following configurations:

```python
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'
```

---

### Frontend Setup

1. go into the react-app

   cd react-app
   ```

2. **Install the Required Packages**:

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Create a `.env` File in the Root Directory**:

   ```env
   REACT_APP_API_URL=http://localhost:8000
   ```

4. **Run the Development Server**:
   ```sh
   npm start
   # or
   yarn start
   ```

### Folder Structure

The folder structure of the project is as follows:

```
react-app/
├── public/
├── src/
│   ├── components/
│   ├── redux/
│   ├── api/
│   ├── App.js
│   ├── index.js
├── .env
├── package.json
```

### Available Scripts

In the project directory, you can run:

- `npm start` - Runs the app in development mode.
- `npm test` - Launches the test runner.
- `npm run build` - Builds the app for production.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request.

### License

This project is licensed under the MIT License.

---
````
