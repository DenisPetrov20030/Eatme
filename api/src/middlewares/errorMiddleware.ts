import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../../utils/errors/ApiError'


export const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err)
    if (err instanceof ApiError) {
        return res.status(err.status).json({statusCode: err.status, message: err.message, errors: err.errors})
    }
    res.status(500).json({message: err.message})
}