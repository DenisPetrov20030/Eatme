import { Router, Request, Response, NextFunction } from 'express'
import { AuthController } from '../controllers/AuthController'
import { UserController } from '../controllers/UserController'
import { PgUserRepository } from '../db/pg/PgUserRepository'
import { UserService } from '../services/UserService'
import { registrationValidation } from '../../utils/Validation'

const userRepository = new PgUserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)
const authController = new AuthController(userService)
const UserRouter = Router()

UserRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await userController.getAllUsers(req, res, next)
})
UserRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    await userController.updateUser(req, res, next)
})
UserRouter.get('/by-id/:id', async (req: Request, res: Response, next: NextFunction) => {
    await userController.getUserById(req, res, next)
})

UserRouter.get('/by-email/:email', async (req: Request, res: Response, next: NextFunction) => {
    await userController.getUserByEmail(req, res, next)
})

UserRouter.get('/by-username/:username', async (req: Request, res: Response, next: NextFunction) => {
    await userController.getUserByUsername(req, res, next)
})



UserRouter.post('/change-password/:id', async (req: Request, res: Response, next: NextFunction) => {
    await userController.changePassword(req, res, next);
});

UserRouter.post('/login',
async (req: Request, res: Response, next: NextFunction) => {
    await authController.login(req, res, next)
})
UserRouter.post('/logout',
async (req: Request, res: Response, next: NextFunction) => {
    await authController.logout(req, res, next)
})
UserRouter.post('/registration',
    registrationValidation,
async (req: Request, res: Response, next: NextFunction) => {
    await authController.registration(req, res, next)
})
UserRouter.get('/refresh', async (req: Request, res: Response, next: NextFunction) => {
    await authController.refresh(req, res, next)
})
export default UserRouter
