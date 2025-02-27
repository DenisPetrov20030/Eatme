import { Repository } from 'typeorm'
import bcrypt from 'bcrypt'
import { IUserRepository } from '../../repositories/IUserRepository'
import { AppDataSource } from '../../../app-data-source'
import { ApiError } from '../../../utils/errors/ApiError'
import User from '../../models/domain/User'
import { UserEntity } from '../../models/entity/UserEntity'
import { UserMapper } from '../../models/mappers/UserMapper'
import UserDetails from '../../models/dto/user/UserDetails'
import UserCreate from '../../models/dto/user/UserCreate'
import UserUpdate from '../../models/dto/user/UserUpdate'

export class PgUserRepository implements IUserRepository {
    
    private readonly userRepository: Repository<UserEntity>

    constructor() {
        this.userRepository = AppDataSource.getRepository(UserEntity)
    }

    async getAllUsers(): Promise<UserDetails[]> {
        const users = await this.userRepository.find()
        return UserMapper.fromUserEntitiesToUserDetails(users)
    }

    async createUser(userData: UserCreate): Promise<User> {
        const { username, first_name, last_name, email, password } = userData
        const registrationDate = new Date()

        const newUser = this.userRepository.create({
            username,
            first_name,
            last_name,
            email,
            password
        })

        const savedUser = await this.userRepository.save(newUser)
        
        return UserMapper.fromUserEntityToUser(savedUser)
    }

    async getUserById(userId: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { id: userId } })
        return user ? UserMapper.fromUserEntityToUser(user) : null
    }

    async getUserByUsername(username: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { username: username } })
        return user ? UserMapper.fromUserEntityToUser(user) : null
    }
    
    async updateUser(userId: string, userData: Partial<UserUpdate>): Promise<User | null> {
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } })
            if (!user) throw ApiError.NotFound('User not found')

            Object.assign(user, userData)
            await this.userRepository.save(user)
            return UserMapper.fromUserEntityToUser(user)
        } catch (error: any) {
            throw ApiError.InternalServerError('Failed to update user', error)
        }
    }
    async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<boolean> {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        if (!user) throw ApiError.NotFound('User not found');

        const passwordMatch = await bcrypt.compare(currentPassword, user.password);
        if (!passwordMatch) throw ApiError.Unauthorized('Current password is incorrect');

        user.password = await bcrypt.hash(newPassword, 10);
        await this.userRepository.save(user);
        return true;
    }
    async deleteUser(userId: string): Promise<boolean> {
        try {
            const user = await this.userRepository.findOne({ where: { id: userId } })
            if (!user) throw ApiError.NotFound('User not found')

            await this.userRepository.remove(user)
            return true
        } catch (error: any) {
            throw ApiError.InternalServerError('Failed to delete user', error)
        }
    }

    async getUserByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where :{email: email }});
        return user ? UserMapper.fromUserEntityToUser(user) : null;
    }
    
}
