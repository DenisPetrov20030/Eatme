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

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/UserDetails'
 *       500:
 *         description: Server error
 */
UserRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await userController.getAllUsers(req, res, next)
})

/**
 * @swagger
 * /api/users/update/{id}:
 *   put:
 *     summary: Update user information
 *     description: Update specific fields of a user's information
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User's unique identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated user information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: User not found
 *       500:
 *         description: Server error
 */
UserRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    await userController.updateUser(req, res, next)
})

/**
 * @swagger
 * /api/users/by-id/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Retrieve user details by their unique identifier
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User's unique identifier
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetails'
 *       400:
 *         description: User not found
 *       500:
 *         description: Server error
 */
UserRouter.get('/by-id/:id', async (req: Request, res: Response, next: NextFunction) => {
    await userController.getUserById(req, res, next)
})

/**
 * @swagger
 * /api/users/by-email/{email}:
 *   get:
 *     summary: Get user by email
 *     description: Retrieve user details by their email address
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: User's email address
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetails'
 *       400:
 *         description: User not found
 *       500:
 *         description: Server error
 */
UserRouter.get('/by-email/:email', async (req: Request, res: Response, next: NextFunction) => {
    await userController.getUserByEmail(req, res, next)
})

/**
 * @swagger
 * /api/users/by-username/{username}:
 *   get:
 *     summary: Get user by username
 *     description: Retrieve user details by their username
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: User's username
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetails'
 *       400:
 *         description: User not found
 *       500:
 *         description: Server error
 */
UserRouter.get('/by-username/:username', async (req: Request, res: Response, next: NextFunction) => {
    await userController.getUserByUsername(req, res, next)
})

/**
 * @swagger
 * /api/users/change-password/{id}:
 *   post:
 *     summary: Change user password
 *     description: Change a user's password with current password verification
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User's unique identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Password changed successfully
 *       400:
 *         description: Current password is incorrect
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */
UserRouter.post('/change-password/:id', async (req: Request, res: Response, next: NextFunction) => {
    await userController.changePassword(req, res, next);
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: User login
 *     description: Authenticate a user and receive access and refresh tokens
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tokens:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *                 user:
 *                   $ref: '#/components/schemas/UserShort'
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
UserRouter.post('/login',
async (req: Request, res: Response, next: NextFunction) => {
    await authController.login(req, res, next)
})

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: User logout
 *     description: Log out the current user and invalidate their tokens
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully logged out
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
UserRouter.post('/logout',
async (req: Request, res: Response, next: NextFunction) => {
    await authController.logout(req, res, next)
})

/**
 * @swagger
 * /api/users/registration:
 *   post:
 *     summary: User registration
 *     description: Register a new user account
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - first_name
 *               - last_name
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 4
 *                 maxLength: 20
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 8
 *     responses:
 *       200:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tokens:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *       400:
 *         description: Validation error or user already exists
 *       500:
 *         description: Server error
 */
UserRouter.post('/registration',
    registrationValidation,
async (req: Request, res: Response, next: NextFunction) => {
    await authController.registration(req, res, next)
})

/**
 * @swagger
 * /api/users/refresh:
 *   get:
 *     summary: Refresh authentication tokens
 *     description: Use refresh token to get a new access token
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: New tokens generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 tokens:
 *                   type: object
 *                   properties:
 *                     accessToken:
 *                       type: string
 *                     refreshToken:
 *                       type: string
 *                 user:
 *                   $ref: '#/components/schemas/UserShort'
 *       401:
 *         description: Unauthorized, invalid refresh token
 *       500:
 *         description: Server error
 */
UserRouter.get('/refresh', async (req: Request, res: Response, next: NextFunction) => {
    await authController.refresh(req, res, next)
})

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         username:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         isAdmin:
 *           type: boolean
 *     
 *     UserShort:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         username:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         isAdmin:
 *           type: boolean
 *     
 *     UserDetails:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         username:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         isAdmin:
 *           type: boolean
 */
export default UserRouter
