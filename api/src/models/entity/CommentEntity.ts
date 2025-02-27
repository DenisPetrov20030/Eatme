import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, BaseEntity } from 'typeorm'
import { UserEntity } from './UserEntity'
import { ProductEntity } from './ProductEntity'


@Entity({
    name: "Comments"
})
export class CommentEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @ManyToOne(() => UserEntity, user => user.comments)
    user: UserEntity

    @ManyToOne(() => ProductEntity, product => product.comments)
    product: ProductEntity

    @Column()
    rating: number

    @Column()
    comment: string

    @CreateDateColumn({ type: 'timestamp' })
    datePosted: Date
}