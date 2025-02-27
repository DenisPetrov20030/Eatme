import Comment from "../domain/Comment"
import { CommentEntity } from "../entity/CommentEntity"
import { ProductMapper } from "./ProductMapper"
import { UserMapper } from "./UserMapper"

export class CommentMapper {

    static fromCommentToCommentEntity(entity: CommentEntity): Comment {
        return {
            id: entity.id,
            user: UserMapper.fromUserEntityToUserShort(entity.user),
            product: ProductMapper.fromProductEntityToProduct(entity.product),
            rating: entity.rating,
            comment: entity.comment,
            datePosted: entity.datePosted
        }
    }

}