import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm'
import {ProductEntity} from './ProductEntity'

@Entity({
    name: "Images"
})
export class ProductImageEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => ProductEntity, product => product.images)
    product: ProductEntity

    @Column({ type: 'text', nullable: true })
    imageUrl: string

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date
}
