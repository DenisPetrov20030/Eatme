import { WishlistItem } from "../models/domain/WishlistItem";

export interface IWishlistItemRepository {
    getWishlistItemsByUserId(userId: string): Promise<WishlistItem[]>;
    addToWishlist(userId: string, productId: string): Promise<WishlistItem>;
    removeFromWishlist(userId: string, productId: string): Promise<boolean>;
}