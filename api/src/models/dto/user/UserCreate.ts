import User from "../../domain/User"

type UserCreate = Pick<User, "first_name" | "last_name" | "username" | "email" | "password">

export default UserCreate