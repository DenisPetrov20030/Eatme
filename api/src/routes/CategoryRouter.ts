import { Router, Request, Response, NextFunction } from 'express'
import { CategoryController } from '../controllers/CategoryController'
import { CategoryService } from '../services/CategoryService'
import { PgCategoryRepository } from '../db/pg/PgCategoryRepository'


const categoryRepository = new PgCategoryRepository()
const categoryService = new CategoryService(categoryRepository)
const categoryController = new CategoryController(categoryService)
const CategoryRouter = Router()


/**
 * @swagger
 * /api/category:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all product categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: A list of all categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Server error
 */
CategoryRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await categoryController.getAllCategories(req, res, next)
})

CategoryRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await categoryController.getCategoryById(req, res, next)
})

/**
 * @swagger
 * /api/category/create:
 *   post:
 *     summary: Create a new category
 *     description: Create a new product category
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 description: The category name
 *               parentCategoryId:
 *                 type: string
 *                 description: Optional ID of the parent category
 *     responses:
 *       200:
 *         description: The created category
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
CategoryRouter.post('/create', async (req: Request, res: Response, next: NextFunction) => {
    await categoryController.createCategory(req, res, next)
})

CategoryRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await categoryController.updateCategory(req, res, next)
})

CategoryRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await categoryController.deleteCategory(req, res, next)
})

CategoryRouter.get('/:id/subcategories', async (req: Request, res: Response, next: NextFunction) => {
    await categoryController.getSubcategories(req, res, next)
})

export default CategoryRouter
