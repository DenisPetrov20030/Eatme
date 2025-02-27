import Cart from "../domain/Cart"
import CartItem from "../domain/CartItem"
import { CartEntity } from "../entity/CartEntity"
import { CartItemEntity } from "../entity/CartItemEntity"
import { ProductMapper } from "./ProductMapper"

export class CartMapper {
    static fromCartEntityToCart(cartEntity: CartEntity): Cart {
        return {
            id: cartEntity.id,
            user: {id: cartEntity.user.id},
            items: cartEntity.items.map(item => this.fromCartItemEntityToCartItem(item)),
            dateCreated: cartEntity.dateCreated
        }
    }

    static fromCartItemEntityToCartItem(cartItemEntity: CartItemEntity): CartItem {
        return {
            id: cartItemEntity.id,
            cart:{id: cartItemEntity.cart.id},
            product: ProductMapper.fromProductEntityToProduct(cartItemEntity.product),
            quantity: cartItemEntity.quantity
        }
    }

}