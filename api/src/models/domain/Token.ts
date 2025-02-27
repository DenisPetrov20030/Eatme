import User from "./User"

export default interface Token {
    user: User | {
        id: string
    }
    refreshToken: string
}