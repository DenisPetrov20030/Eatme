import User from "../models/domain/User"
import UserCreate from "../models/dto/user/UserCreate"
import UserDetails from "../models/dto/user/UserDetails"
import UserUpdate from "../models/dto/user/UserUpdate"

export interface IUserRepository {
    getUserById(userId: string): Promise<User | null>
    createUser(userData: UserCreate): Promise<User>
    updateUser(userId: string, userData: Partial<UserUpdate>): Promise<User | null>
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<boolean>
    deleteUser(userId: string): Promise<boolean>
    getAllUsers(): Promise<UserDetails[]>
    getUserByEmail(email:string): Promise<User | null>
    getUserByUsername(username:string): Promise<User | null>
}
