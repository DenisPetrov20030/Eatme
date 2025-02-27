import User from "../domain/User"
import UserDetails from "../dto/user/UserDetails"
import UserShort from "../dto/user/UserShort"
import { UserEntity } from "../entity/UserEntity"


export class UserMapper {

    static fromUserEntities(entities: UserEntity[]): User[] {
        return entities.map(entity => this.fromUserEntityToUser(entity))
    }
    static fromUserEntityToUser(entity: UserEntity): User {
        return {
            id: entity.id,
            username: entity.username,
            first_name: entity.first_name,
            last_name: entity.last_name,
            email: entity.email,
            password: entity.password,
            isAdmin: entity.isAdmin
        }
    }
    static fromUserEntityToUserShort(entity: UserEntity): UserShort {
        return {
            id: entity.id,
            username: entity.username,
            email: entity.email,
            isAdmin: entity.isAdmin
        }
    }
    static fromUserToUserShort(user: User): UserShort {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            isAdmin: user.isAdmin
        }
    }

    static fromUserEntitiesToUserShort(entities: UserEntity[]): UserShort[] {
        return entities.map(entity => this.fromUserEntityToUserShort(entity))
    }

    static fromUserEntityToUserDetails(entity: UserEntity): UserDetails {
        return {
            id: entity.id,
            username: entity.username,
            first_name: entity.first_name,
            last_name: entity.last_name,
            email: entity.email,
            isAdmin: entity.isAdmin
        }
    }

    static fromUserEntitiesToUserDetails(entities: UserEntity[]): UserDetails[] {
        return entities.map(entity => this.fromUserEntityToUserDetails(entity))
    }
    
}




