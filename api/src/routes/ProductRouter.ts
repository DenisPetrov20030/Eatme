import { Router, Request, Response, NextFunction } from 'express'
import { ProductController } from '../controllers/ProductController'
import { PgProductRepository } from '../db/pg/PgProductRepository'
import { ProductService } from '../services/ProductService'

const productRepository = new PgProductRepository()
const productService = new ProductService(productRepository)
const productController = new ProductController(productService)
const ProductRouter = Router()

/**
 * @swagger
 * /api/products/search:
 *   get:
 *     summary: Search products
 *     description: Retrieve products based on search criteria with optional filters
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter products by name (case insensitive, partial match)
 *       - in: query
 *         name: categoryName
 *         schema:
 *           type: string
 *         description: Filter products by category name
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         description: Minimum price threshold
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         description: Maximum price threshold
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of products to return
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of products to skip (for pagination)
 *     responses:
 *       200:
 *         description: A list of products matching the criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
ProductRouter.get('/search', async (req: Request, res: Response, next: NextFunction) => {
    await productController.searchProducts(req, res, next);
});

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     description: Retrieve a list of all available products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: A list of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
ProductRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await productController.getAllProducts(req, res, next)
})

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: Get product by ID
 *     description: Retrieve detailed information about a specific product
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product's unique identifier
 *     responses:
 *       200:
 *         description: Detailed product information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
ProductRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await productController.getProductById(req, res, next)
})

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     description: Add a new product to the database
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - quantity
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               quantity:
 *                 type: integer
 *               categories:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     imageUrl:
 *                       type: string
 *     responses:
 *       200:
 *         description: The created product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
ProductRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    await productController.createProduct(req, res, next)
})

/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     summary: Update a product
 *     description: Update an existing product's information
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product's unique identifier
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *                 format: float
 *               quantity:
 *                 type: integer
 *               categories:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     imageUrl:
 *                       type: string
 *     responses:
 *       200:
 *         description: The updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
ProductRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await productController.updateProduct(req, res, next)
})

/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Delete a product and its associated data
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product's unique identifier
 *     responses:
 *       200:
 *         description: Deletion successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
ProductRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await productController.deleteProduct(req, res, next)
})

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The product's unique identifier
 *         name:
 *           type: string
 *           description: The name of the product
 *         description:
 *           type: string
 *           description: Detailed description of the product
 *         price:
 *           type: number
 *           format: float
 *           description: The price of the product
 *         quantity:
 *           type: integer
 *           description: Available quantity in stock
 *         categories:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 *           description: Categories the product belongs to
 *         images:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ProductImage'
 *           description: Images of the product
 *         comments:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Comment'
 *           description: User reviews and comments on the product
 *     
 *     ProductImage:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         imageUrl:
 *           type: string
 *           description: URL to the product image
 *     
 *     Category:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         parentCategory:
 *           type: object
 *           nullable: true
 *     
 *     Comment:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         comment:
 *           type: string
 *         rating:
 *           type: number
 *         user:
 *           $ref: '#/components/schemas/UserShort'
 *         datePosted:
 *           type: string
 *           format: date-time
 */

export default ProductRouter
