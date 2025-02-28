require('dotenv').config()
import cors from 'cors'
import express from 'express'
import 'reflect-metadata'
import bodyParser from 'body-parser'

import UserRouter from './src/routes/UserRouter'
import { AppDataSource } from './app-data-source'
import { errorMiddleware } from './src/middlewares/errorMiddleware'
import CategoryRouter from './src/routes/CategoryRouter'
import ProductRouter from './src/routes/ProductRouter'
import CartRouter from './src/routes/CartRouter'
import CommentRouter from './src/routes/CommentRouter'
import WishlistItemRouter from './src/routes/WishlistItemRouter'
import { setupSwagger } from './swagger'

const app = express()
const PORT = process.env.PORT || 5000

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true, parameterLimit:50000}))

app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}))

app.use('/api/users', UserRouter)
app.use('/api/category', CategoryRouter)
app.use('/api/comments', CommentRouter)
app.use('/api/products', ProductRouter)
app.use('/api/cart', CartRouter)
app.use('/api/wishlist', WishlistItemRouter)
setupSwagger(app)
app.use(errorMiddleware)

const start = async () => {
    try {
        await AppDataSource.initialize()
        await AppDataSource.synchronize()
        app.listen(PORT, () => console.log(`App is started on port ${PORT}\nhttp://localhost:${PORT}`))
    } catch (e) {
        console.log(e)
    }
}

start()