export class ApiError extends Error {
    public readonly status: number
    public readonly errors: string[]

    constructor(status: number, message: string, errors: string[]) {
        super(message)
        this.status = status
        this.errors = errors
    }
    
    static BadRequest(message: string, errors: string[] = []) {
        return new ApiError(400, message, errors)
    }
    static Unauthorized(message: string = 'User is unauthorized', errors: string[] = []): ApiError {
        return new ApiError(401, message, errors)
    }
    static Forbidden(message: string, errors: string[] = []): ApiError {
        return new ApiError(403, message, errors)
    }
    static NotFound(message: string, errors: string[] = []): ApiError {
        return new ApiError(404, message, errors)
    }
    static InternalServerError(message: string, errors: any[] = []): ApiError {
        return new ApiError(500, message, errors)
    }

    showErrorData(): object {
        return {
            status: this.status,
            message: this.message,
            errors: this.errors
        }
    }
}