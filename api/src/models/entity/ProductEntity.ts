import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm'
import { CategoryEntity } from './CategoryEntity'
import { ProductImageEntity } from './ProductImageEntity'
import { CommentEntity } from './CommentEntity'
import { CartItemEntity } from './CartItemEntity'
import { OrderItemEntity } from './OrderItemEntity'
import { WishlistItemEntity } from './WishlistItemEntity'


@Entity({
    name: "Products"
})

export class ProductEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number

    @Column()
    quantity: number

    @OneToMany(() => ProductImageEntity, image => image.product, { nullable: true })
    images: ProductImageEntity[]

    @OneToMany(() => CommentEntity, comment => comment.product, { nullable: true })
    comments: CommentEntity[]

    @ManyToMany(() => CategoryEntity, category => category.products)
    @JoinTable({name: "Category"})
    categories: CategoryEntity[]

    @OneToMany(() => CartItemEntity, cartItem => cartItem.product)
    cartItems: CartItemEntity[];

    @OneToMany(() => OrderItemEntity, orderItem => orderItem.product)
    orderItems: OrderItemEntity[];

    @OneToMany(() => WishlistItemEntity, wishlistItem => wishlistItem.user)
    wishlistItems: WishlistItemEntity[];
}