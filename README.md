### Documentation Outline

1. **Project Overview**
2. **Installation and Setup**
3. **Project Structure**
4. **Features**
   - Wishlist
   - Reviews and Ratings
5. **API Endpoints**
   - Authentication
   - Products
   - Orders
   - Reviews
   - Wishlist
6. **Frontend Components**
   - Product Detail
   - Cart
   - Wishlist
   - Review Form
7. **Usage**
   - How to Add Products to Cart
   - How to Add Products to Wishlist
   - How to Submit Reviews
8. **Contributing**
9. **License**

### 1. Project Overview

This project is an ecommerce web application that allows users to browse products, add them to their cart, submit reviews, and manage their wishlist. The application is built using Django for the backend and React for the frontend.

### 2. Installation and Setup

**Backend Setup**:

1. Clone the repository:

   ```sh
   git clone https://github.com/hopeigbinosa123/FullStackDevelopment.git
   cd FullStackDevelopment
   ```

2. Set up the virtual environment:

   ```sh
   cd backend
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
   ```

3. Install the dependencies:

   ```sh
   pip install -r requirements.txt
   ```

4. Apply migrations:

   ```sh
   python manage.py makemigrations
   python manage.py migrate
   ```

5. Start the development server:
   ```sh
   python manage.py runserver
   ```

**Frontend Setup**:

1. Navigate to the frontend directory:

   ```sh
   cd react-app
   ```

2. Install the dependencies:

   ```sh
   npm install
   ```

3. Start the React development server:
   ```sh
   npm start
   ```

### 3. Project Structure

```
ecommerce-project/
│
├── backend/
│   ├── manage.py
│   ├── myshop_backend/
│   │   ├── models.py
│   │   ├── serializers.py
│   │   ├── views.py
│   │   ├── urls.py
│   │   └── ...
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── Components/
│   │   │   ├── Navbar.js
│   │   │   ├── ProductList.js
│   │   │   ├── ProductDetail.js
│   │   │   ├── Cart.js
│   │   │   ├── Wishlist.js
│   │   │   ├── ReviewForm.js
│   │   │   └── ...
│   │   ├── App.js
│   │   ├── api.js
│   │   └── index.js
│   └── ...
│
└── ...
```

### 4. Features

#### Wishlist

Users can add products to their wishlist and view them later. The wishlist feature enhances user engagement and retention.

#### Reviews and Ratings

Users can submit reviews and ratings for products. This feature helps build trust and provides valuable feedback to improve product offerings.

### 5. API Endpoints

#### Authentication

- `POST /api/register/` - Register a new user.
- `POST /api/login/` - Log in and obtain authentication tokens.

#### Products

- `GET /api/products/` - Retrieve a list of products.
- `GET /api/products/:id/` - Retrieve details of a specific product.

#### Orders

- `GET /api/orders/` - Retrieve a list of orders.
- `POST /api/orders/` - Create a new order.

#### Reviews

- `GET /api/reviews/?product=:productId` - Retrieve reviews for a specific product.
- `POST /api/reviews/` - Submit a new review.

#### Wishlist

- `GET /api/wishlist/` - Retrieve the user's wishlist.
- `POST /api/wishlist/` - Add a product to the wishlist.

### 6. Frontend Components

#### Product Detail

The product detail page displays information about a specific product, allows users to add the product to their cart, and submit reviews.

#### Cart

The cart page displays the products added to the user's cart and allows users to manage quantities and proceed to checkout.

#### Wishlist

The wishlist page displays the products added to the user's wishlist.

#### Review Form

The review form allows users to submit reviews and ratings for products.

### 7. Usage

#### How to Add Products to Cart

1. Navigate to a product detail page.
2. Click the "Add to Cart" button.
3. The product will be added to your cart.

#### How to Add Products to Wishlist

1. Navigate to a product detail page.
2. Click the "Add to Wishlist" button.
3. The product will be added to your wishlist. Ensure you are logged in.

#### How to Submit Reviews

1. Navigate to a product detail page.
2. Fill out the review form with a rating and comment.
3. Click the "Submit Review" button to submit your review. Ensure you are logged in.

### 8. Contributing

We welcome contributions! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes and push to your branch.
4. Open a pull request.

### 9. License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
