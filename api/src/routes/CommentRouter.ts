import { Router, Request, Response, NextFunction } from 'express'
import { PgCommentRepository } from '../db/pg/PgCommentRepository'
import { CommentService } from '../services/CommentService'
import { CommentController } from '../controllers/CommentController'

const commentRepository = new PgCommentRepository()
const commentService = new CommentService(commentRepository)
const commentController = new CommentController(commentService)
const CommentRouter = Router()

CommentRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await commentController.getReviewById(req, res, next)
})

CommentRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    await commentController.createReview(req, res, next)
})

CommentRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await commentController.updateReview(req, res, next)
})

CommentRouter.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    await commentController.deleteReview(req, res, next)
})

CommentRouter.get('/product/:productId', async (req: Request, res: Response, next: NextFunction) => {
    await commentController.getReviewsByProduct(req, res, next)
})

CommentRouter.get('/user/:userId', async (req: Request, res: Response, next: NextFunction) => {
    await commentController.getReviewsByUser(req, res, next)
})

CommentRouter.get('/product/:productId/additional', async (req: Request, res: Response, next: NextFunction) => {
    await commentController.fetchAdditionalReviewsByProduct(req, res, next)
})

export default CommentRouter