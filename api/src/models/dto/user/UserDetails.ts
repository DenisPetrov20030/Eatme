import User from "../../domain/User"

type UserDetails = Omit<User, "password">

export default UserDetails