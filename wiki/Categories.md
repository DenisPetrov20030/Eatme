#  Category API 


## Endpoints

### Get All Categories
```
GET /api/category
```

Retrieves a list of all available food categories.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Fresh Produce",
    "imageUrl": "https://example.com/fresh-produce.jpg",
    "parentCategory": null
  },
  {
    "id": 2,
    "name": "Vegetables",
    "imageUrl": "https://example.com/vegetables.jpg",
    "parentCategory": {
      "id": 1,
      "name": "Fresh Produce"
    }
  },
  {
    "id": 3,
    "name": "Dairy & Eggs",
    "imageUrl": "https://example.com/dairy.jpg",
    "parentCategory": null
  }
]
```

### Get Category by ID
```
GET /api/category/:id
```

Retrieves detailed information about a specific food category.

**Path Parameters:**
- `id`: Number - The unique identifier of the category

**Response:**
```json
{
  "id": 2,
  "name": "Vegetables",
  "imageUrl": "https://example.com/vegetables.jpg",
  "parentCategory": {
    "id": 1,
    "name": "Fresh Produce",
    "imageUrl": "https://example.com/fresh-produce.jpg"
  }
}
```

**Error Responses:**
- `404 Not Found` - If no category exists with the provided ID

### Create Category
```
POST /api/category
```

Creates a new food category.

**Request Body:**
```json
{
  "name": "Organic Vegetables",
  "imageUrl": "https://example.com/organic-vegetables.jpg",
  "parentCategory": {
    "id": 2
  }
}
```
The `parentCategory` field is optional. When provided, it establishes a hierarchical relationship between food categories.

**Response:**
The created food category object with assigned ID.

**Error Responses:**
- `400 Bad Request` - If required fields are missing or invalid

### Update Category
```
PUT /api/category/:id
```

Updates an existing food category.

**Path Parameters:**
- `id`: Number - The unique identifier of the category to update

**Request Body:**
```json
{
  "name": "Premium Organic Vegetables",
  "imageUrl": "https://example.com/premium-organic-vegetables.jpg",
  "parentCategory": {
    "id": 2
  }
}
```
All fields are optional. Only the provided fields will be updated.

**Response:**
The updated food category object.

**Error Responses:**
- `404 Not Found` - If no category exists with the provided ID

### Delete Category
```
DELETE /api/category/:id
```

Deletes a food category. Note: This may affect product listings associated with this category.

**Path Parameters:**
- `id`: Number - The unique identifier of the category to delete

**Response:**
```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

**Error Responses:**
- `404 Not Found` - If no category exists with the provided ID
- `400 Bad Request` - If the category cannot be deleted due to dependencies

### Get Subcategories
```
GET /api/category/:id/subcategories
```

Retrieves all direct subcategories of a specific food category. Useful for navigating hierarchical food menus.

**Path Parameters:**
- `id`: Number - The unique identifier of the parent category

**Response:**
```json
[
  {
    "id": 4,
    "name": "Root Vegetables",
    "imageUrl": "https://example.com/root-vegetables.jpg",
    "parentCategory": {
      "id": 2,
      "name": "Vegetables"
    }
  },
  {
    "id": 5,
    "name": "Leafy Greens",
    "imageUrl": "https://example.com/leafy-greens.jpg",
    "parentCategory": {
      "id": 2,
      "name": "Vegetables"
    }
  }
]
```

**Error Responses:**
- `404 Not Found` - If no category exists with the provided ID

## Category Object Model

```typescript
interface Category {
  id: number;
  name: string;
  imageUrl: string;
  parentCategory?: Category;
}
```