import { WishlistItem } from "../domain/WishlistItem";
import { WishlistItemEntity } from "../entity/WishlistItemEntity";

export class WishlistItemMapper {
    static fromWishlistItemEntityToWishlistItem(wishlistItemEntity: WishlistItemEntity): WishlistItem {
        return {
            id: wishlistItemEntity.id,
            userId: wishlistItemEntity.user.id,
            productId: wishlistItemEntity.product.id,
        };
    }
}