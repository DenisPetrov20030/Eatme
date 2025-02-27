import Token from "../domain/Token";
import User from "../domain/User";
import { TokenEntity } from "../entity/TokenEntity";


export class TokenMapper {
    static fromTokenEntityToToken(entity: TokenEntity, user: User): Token {
        return {
            user: user,
            refreshToken: entity.refreshToken
        }
    }
}
