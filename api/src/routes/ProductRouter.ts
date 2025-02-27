import { Router, Request, Response, NextFunction } from 'express'
import { ProductController } from '../controllers/ProductController'
import { PgProductRepository } from '../db/pg/PgProductRepository'
import { ProductService } from '../services/ProductService'

const productRepository = new PgProductRepository()
const productService = new ProductService(productRepository)
const productController = new ProductController(productService)
const ProductRouter = Router()


ProductRouter.get('/search', async (req: Request, res: Response, next: NextFunction) => {
    await productController.searchProducts(req, res, next);
});

ProductRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await productController.getAllProducts(req, res, next)
})

ProductRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await productController.getProductById(req, res, next)
})

ProductRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    await productController.createProduct(req, res, next)
})

ProductRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await productController.updateProduct(req, res, next)
})

ProductRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await productController.deleteProduct(req, res, next)
})


export default ProductRouter
