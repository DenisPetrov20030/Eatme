# Product API 

## Product Retrieval Endpoints

### Search Products
```
GET /api/products/search
```

Retrieves products based on search criteria with optional filters.

**Query Parameters:**
- `name` (optional): String - Filter products by name (case insensitive, partial match)
- `categoryName` (optional): String - Filter products by category name
- `minPrice` (optional): Number - Minimum price threshold
- `maxPrice` (optional): Number - Maximum price threshold
- `limit` (optional): Number - Maximum number of products to return
- `offset` (optional): Number - Number of products to skip (for pagination)

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": 0,
    "quantity": 0,
    "categories": [
      {
        "id": "string",
        "name": "string",
        "parentCategory": {}
      }
    ],
    "images": [
      {
        "id": "string",
        "url": "string"
      }
    ],
    "comments": []
  }
]
```

### Get All Products
```
GET /api/products
```

Retrieves all available products.

**Response:**
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": 0,
    "quantity": 0,
    "categories": [],
    "images": [],
    "comments": []
  }
]
```

### Get Product by ID
```
GET /api/products/:id
```

Retrieves detailed information about a specific product.

**Path Parameters:**
- `id`: String - The unique identifier of the product

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "price": 0,
  "quantity": 0,
  "categories": [],
  "images": [],
  "comments": [
    {
      "id": "string",
      "comment": "string",
      "rating": 0,
      "user": {}
    }
  ]
}
```

**Error Responses:**
- `404 Not Found` - If no product exists with the provided ID

## Product Management Endpoints

### Create Product
```
POST /api/products
```

Creates a new product.

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "price": 0,
  "quantity": 0,
  "categories": [
    {
      "id": "string"
    }
  ],
  "images": [
    {
      "url": "string"
    }
  ]
}
```

**Response:**
The created product object with assigned ID.

### Update Product
```
PUT /api/products/:id
```

Updates an existing product.

**Path Parameters:**
- `id`: String - The unique identifier of the product to update

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "price": 0,
  "quantity": 0,
  "categories": []
}
```
All fields are optional. Only the provided fields will be updated.

**Response:**
The updated product object.

**Error Responses:**
- `404 Not Found` - If no product exists with the provided ID

### Delete Product
```
DELETE /api/products/:id
```

Deletes a product and its associated images.

**Path Parameters:**
- `id`: String - The unique identifier of the product to delete

**Response:**
- `200 OK` with `true` value if deletion was successful

**Error Responses:**
- `404 Not Found` - If no product exists with the provided ID
- `500 Internal Server Error` - If deletion fails