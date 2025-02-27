import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../../utils/errors/ApiError'
import { UserService } from '../services/UserService'
import UserCreate from '../models/dto/user/UserCreate'
import UserUpdate from '../models/dto/user/UserUpdate'

export class UserController {
    constructor(private readonly userService: UserService) {}

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userData: UserCreate = req.body
            const user = await this.userService.createUser(userData)
            res.json(user)
        } catch (error) {
            next(error)
        }
    }

    async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.id as string
            const user = await this.userService.getUserById(userId)
            if (!user) {
                return next(ApiError.BadRequest('User not found'))
            }
            res.json(user)
        } catch (error) {
            next(error)
        }
    }

    async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const userId = req.params.id as string
            const userData: Partial<UserUpdate> = req.body
            const updatedUser = await this.userService.updateUser(userId, userData)
            if (!updatedUser) {
                return next(ApiError.BadRequest('User not found'))
            }
            res.json(updatedUser)
        } catch (error) {
            next(error)
        }
    }

    async getUserByUsername(req: Request, res: Response, next: NextFunction) {
        try {
            const username = req.params.username as string
            const user = await this.userService.getUserByUsername(username)
            if (!user) {
                return next(ApiError.BadRequest('User not found'))
            }
            res.json(user)
        } catch (error) {
            next(error)
        }
    }
    async changePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { currentPassword, newPassword } = req.body;
            const userId = req.params.id as string;
            await this.userService.changePassword(userId, currentPassword, newPassword);
            res.status(200).json({ message: 'Password changed successfully' });
        } catch (error) {
            next(error);
        }
    }
    async getUserByEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.params.email as string
            const user = await this.userService.getUserByEmail(email)
            if (!user) {
                return next(ApiError.BadRequest('User not found'))
            }
            res.json(user)
        } catch (error) {
            next(error)
        }
    }
    async getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const users = await this.userService.getAllUsers()
            res.json(users)
        } catch (error) {
            next(error)
        }
    }

}
