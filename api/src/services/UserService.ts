import { IUserRepository } from '../repositories/IUserRepository'
import bcrypt from 'bcrypt'
import { UserMapper } from '../models/mappers/UserMapper'
import TokenService from './TokenService'
import { PgTokenRepository } from '../db/pg/PgTokenRepository'
import User from '../models/domain/User'
import UserUpdate from '../models/dto/user/UserUpdate'
import { ApiError } from '../../utils/errors/ApiError'
import UserDetails from '../models/dto/user/UserDetails'
import UserCreate from '../models/dto/user/UserCreate'
import UserShort from '../models/dto/user/UserShort'

export class UserService {
    private readonly tokenService: TokenService

    constructor(private readonly userRepository: IUserRepository) {
        const tokenRepository = new PgTokenRepository()
        this.tokenService = new TokenService(tokenRepository)
    }

    async getUserById(userId: string): Promise<UserDetails | null> {
        const user = await this.userRepository.getUserById(userId)
        if (!user) {
            throw ApiError.BadRequest("User not found")
        }
        return user
    }

    async updateUser(userId: string, userData: Partial<UserUpdate>): Promise<User | null> {
        const updatedUser = await this.userRepository.updateUser(userId, userData);
        if (!updatedUser) {
            throw ApiError.NotFound("User not found");
        }
        return updatedUser
    }
    
    async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<boolean> {
        return this.userRepository.changePassword(userId, currentPassword, newPassword);
    }

    async getUserByEmail(email: string): Promise<UserDetails | null> {
        const user = await this.userRepository.getUserByEmail(email)
        if (!user) {
            throw ApiError.BadRequest("User not found")
        }
        return user
    }

    async getUserByUsername(username: string): Promise<UserDetails | null> {
        const user = await this.userRepository.getUserByUsername(username)
        if (!user) {
            throw ApiError.BadRequest("User not found")
        }
        return user
    }
    async refresh(refreshToken: string | undefined) {
        if (!refreshToken) {
            throw ApiError.Unauthorized("User is unauthorized")
        }

        const userData = this.tokenService.validateRefreshToken(refreshToken)
        const dbToken = await this.tokenService.getToken(refreshToken)

        if (!userData || !dbToken) {
            throw ApiError.Unauthorized("User is unauthorized")
        }
        console.log(dbToken.user.id)
        const user = await this.userRepository.getUserById(dbToken.user.id)
        if (!user) {
            throw ApiError.BadRequest("User not found")
        }

        const tokens = await this.generateAndStoreTokens(user)

        return { user:userData, ...tokens }
    }

    async getAllUsers(): Promise<UserDetails[]> {
        return this.userRepository.getAllUsers()
    }

    async createUser(userData: UserCreate): Promise<User> {
        return await this.userRepository.createUser(userData)
    }

    async deleteUser(userId: string): Promise<boolean> {
        return this.userRepository.deleteUser(userId)
    }

    async login(username: string, password: string) {
        const user = await this.userRepository.getUserByUsername(username)
        if (!user) {
            throw ApiError.BadRequest("User was not found.")
        }

        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiError.BadRequest("Incorrect password")
        }

        const tokens = await this.generateAndStoreTokens(user)

        return { ...tokens }
    }

    async logout(refreshToken: string) {
        return await this.tokenService.deleteToken(refreshToken)
    }

    async registration(username: string, first_name: string, last_name: string, email: string, password: string) {
        let candidate = await this.userRepository.getUserByUsername(username)
        if (candidate) {
            throw ApiError.BadRequest("User with the same username already exists")
        }

        candidate = await this.userRepository.getUserByEmail(email)
        if (candidate) {
            throw ApiError.BadRequest("User with the same email already exists")
        }

        const hashPassword = await bcrypt.hash(password, 7)
        const user = await this.createUser({
            username,
            first_name,
            last_name,
            email,
            password: hashPassword
        })

        const tokens = await this.generateAndStoreTokens(user)

        return { ...tokens }
    }

    private async generateAndStoreTokens(user: User): Promise<{
        tokens: {
            accessToken: string
            refreshToken: string
        }
        userDto: UserShort
        }> {
        const userDto = UserMapper.fromUserToUserShort(user)
        const tokens = this.tokenService.generateTokens({ ...userDto })
        await this.tokenService.createToken(user.id, tokens.refreshToken)

        return { tokens, userDto }
    }
}
