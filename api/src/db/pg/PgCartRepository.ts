import { Repository } from 'typeorm';
import { ICartRepository } from '../../repositories/ICartRepository';
import { AppDataSource } from '../../../app-data-source';
import { ApiError } from '../../../utils/errors/ApiError';
import Cart from '../../models/domain/Cart';
import { CartEntity } from '../../models/entity/CartEntity';
import { CartMapper } from '../../models/mappers/CartMapper';


export class PgCartRepository implements ICartRepository {
    private readonly cartRepository: Repository<CartEntity>;

    constructor() {
        this.cartRepository = AppDataSource.getRepository(CartEntity);
    }

    async getCartById(cartId: string): Promise<Cart | null> {
        const cart = await this.cartRepository.findOne({ where: { id: cartId }, relations: ['items', 'user']});
        return cart ? CartMapper.fromCartEntityToCart(cart) : null;
    }

    async createCart(cartData: Cart): Promise<Cart> {
        const {user, dateCreated} = cartData;
        const newCart = this.cartRepository.create({
            user: {
                id: user.id,
            }, 
            dateCreated
        });
        const savedCart = await this.cartRepository.save(newCart);
        return CartMapper.fromCartEntityToCart(savedCart);
    }

    async updateCart(cartId: string, cartData: Partial<Cart>): Promise<Cart | null> {
        const cart = await this.cartRepository.findOne({ where: { id: cartId }, relations: ['items', 'user'] });
        if (!cart) {
            throw ApiError.NotFound('Cart not found');
        }
        Object.assign(cart, cartData);
        const updatedCart = await this.cartRepository.save(cart);
        return CartMapper.fromCartEntityToCart(updatedCart);
    }

    async deleteCart(cartId: string): Promise<boolean> {
        const cart = await this.cartRepository.findOne({ where: { id: cartId } });
        if (!cart) {
            throw ApiError.NotFound('Cart not found');
        }
        await this.cartRepository.remove(cart);
        return true;
    }

    async getAllCarts(): Promise<Cart[]> {
        const carts = await this.cartRepository.find({relations: ['items', 'user']});
        return carts.map(cart => CartMapper.fromCartEntityToCart(cart));
    }

    async getCartsByUserId(userId: string): Promise<Cart[]> {
        const carts = await this.cartRepository.find({ where: { user: { id: userId} }, relations: ['items', 'user', 'items.cart', 'user.carts', 'items.product', 'items.product.images', 'items.product.images.product'] });
        return carts.map(cart => CartMapper.fromCartEntityToCart(cart));
    }
}