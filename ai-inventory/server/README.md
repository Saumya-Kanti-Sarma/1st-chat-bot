# AI Inventory Server

A Node.js server with CRUD operations for MongoDB products using ES modules.

## Features

- Express.js server with ES modules
- MongoDB integration with Mongoose
- Complete CRUD operations for products
- Input validation and error handling
- CORS enabled for frontend integration

## Product Schema

```javascript
{
  title: String (required),
  description: String (required),
  price: Number (required, min: 0),
  stock: Number (default: 0, min: 0),
  total_sales: Number (default: 0, min: 0),
  createdAt: Date,
  updatedAt: Date
}
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the server directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/products
NODE_ENV=development
```

3. Make sure MongoDB is running on localhost:27017

4. Start the server:
```bash
# Development mode with nodemon
npm run dev

# Production mode
npm start
```

## API Endpoints

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product by ID
- `POST /api/products` - Create new product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Request Examples

#### Create Product
```bash
POST /api/products
Content-Type: application/json

{
  "title": "Sample Product",
  "description": "This is a sample product description",
  "price": 29.99,
  "stock": 100,
  "total_sales": 0
}
```

#### Update Product
```bash
PUT /api/products/:id
Content-Type: application/json

{
  "price": 39.99,
  "stock": 95
}
```

## Response Format

All responses follow this format:
```json
{
  "success": true/false,
  "data": {...} or "error": "error message"
}
```

## Error Handling

The API includes comprehensive error handling for:
- Validation errors
- Not found errors
- Server errors
- MongoDB connection errors 