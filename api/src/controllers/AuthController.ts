import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { ApiError } from '../../utils/errors/ApiError'
import { UserService } from '../services/UserService'
export class AuthController {
    constructor(private readonly userService: UserService) {}

    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()){
                return next(ApiError.BadRequest("Validation error", errors.array().map(error => error.msg)))
            }
            const {username, first_name, last_name, email, password} = req.body
            const userData = await this.userService.registration(username, first_name, last_name, email, password)
            res.cookie('refreshToken', userData.tokens.refreshToken, {maxAge: 7 * 34 * 60 * 1000, httpOnly:true})
            return res.json(req.body)
        } catch (e) {
            next(e)
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const {username, password} = req.body
            const userData = await this.userService.login(username, password)
            res.cookie('refreshToken', userData.tokens.refreshToken, {maxAge: 7 * 34 * 60 * 1000, httpOnly:true})
            return res.json(userData)
        } catch (e) {
            
            next(e)
        }
    }

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get('Cookie')?.split(' ').find(cookie => cookie.startsWith('refreshToken'))?.split('=')[1]

            if (!refreshToken) {
                return next(ApiError.BadRequest('Refresh token is missing'))
            }
            const token = await this.userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async refresh(req: Request, res: Response, next: NextFunction) {
        try {
            const refreshToken = req.get('Cookie')?.split(' ').find(cookie => cookie.startsWith('refreshToken'))?.split('=')[1]
            const userData = await this.userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.tokens.refreshToken, {maxAge: 7 * 34 * 60 * 1000, httpOnly:true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }
    

}
