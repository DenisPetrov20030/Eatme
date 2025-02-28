

# Users API Documentation

## Base URL
```
/api/users
```

## Endpoints

### Get All Users
```http
GET /
```
Retrieves a list of all users.

#### Response
- **200 OK**
  ```typescript
  UserDetails[]
  ```

### Get User by ID
```http
GET /by-id/:id
```
Retrieves a specific user by their ID.

#### Parameters
- `id` (string) - User's unique identifier

#### Response
- **200 OK**
  ```typescript
  UserDetails
  ```
- **400 Bad Request** - User not found

### Get User by Email
```http
GET /by-email/:email
```
Retrieves a user by their email address.

#### Parameters
- `email` (string) - User's email address

#### Response
- **200 OK**
  ```typescript
  UserDetails
  ```
- **400 Bad Request** - User not found

### Get User by Username
```http
GET /by-username/:username
```
Retrieves a user by their username.

#### Parameters
- `username` (string) - User's username

#### Response
- **200 OK**
  ```typescript
  UserDetails
  ```
- **400 Bad Request** - User not found

### Update User
```http
PUT /update/:id
```
Updates user information.

#### Parameters
- `id` (string) - User's unique identifier

#### Request Body
```typescript
{
  first_name?: string;
  last_name?: string;
  email?: string;
}
```

#### Response
- **200 OK**
  ```typescript
  User
  ```
- **400 Bad Request** - User not found

### Change Password
```http
POST /change-password/:id
```
Changes user's password.

#### Parameters
- `id` (string) - User's unique identifier

#### Request Body
```typescript
{
  currentPassword: string;
  newPassword: string;
}
```

#### Response
- **200 OK**
  ```typescript
  {
    message: "Password changed successfully"
  }
  ```
- **400 Bad Request** - Current password is incorrect
- **404 Not Found** - User not found

### Login
```http
POST /login
```
Authenticates a user.

#### Request Body
```typescript
{
  username: string;
  password: string;
}
```

#### Response
- **200 OK**
  ```typescript
  {
    tokens: {
      accessToken: string;
      refreshToken: string;
    }
  }
  ```
- **400 Bad Request** - Invalid credentials

### Logout
```http
POST /logout
```
Logs out the current user.

#### Response
- **200 OK**
  ```typescript
  {
    message: "Successfully logged out"
  }
  ```

### Registration
```http
POST /registration
```
Registers a new user.

#### Request Body
```typescript
{
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
```

#### Response
- **200 OK**
  ```typescript
  {
    tokens: {
      accessToken: string;
      refreshToken: string;
    }
  }
  ```
- **400 Bad Request** - Validation error or user already exists

## Error Responses
All endpoints may return these errors:
- **401 Unauthorized** - Authentication required
- **500 Internal Server Error** - Server error occurred