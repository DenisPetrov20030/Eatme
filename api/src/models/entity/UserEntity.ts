import { Entity, CreateDateColumn, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, OneToOne, JoinColumn } from 'typeorm'
import { CommentEntity } from './CommentEntity'
import { CartEntity } from './CartEntity'
import { OrderEntity } from './OrderEntity'
import { WishlistItemEntity } from './WishlistItemEntity'


@Entity({
    name: "Users"
})
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({ nullable: true })
    isAdmin: boolean

    @OneToMany(() => CommentEntity, comment => comment.user)
    comments: CommentEntity[]

    @OneToMany(() => CartEntity, cart => cart.user)
    carts: CartEntity[];

    @OneToMany(() => OrderEntity, order => order.user) 
    orders: OrderEntity[];

    @OneToMany(() => WishlistItemEntity, wishlistItem => wishlistItem.user)
    wishlistItems: WishlistItemEntity[];
}
