import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, ManyToOne, OneToMany } from 'typeorm'
import { ProductEntity } from './ProductEntity'

@Entity({
    name: "Categories"
})
export class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({ type: "text", nullable: true })
    imageUrl: string

    @ManyToOne(() => CategoryEntity, category => category.subcategories)
    parentCategory?: CategoryEntity

    @OneToMany(() => CategoryEntity, category => category.parentCategory)
    subcategories: CategoryEntity[]

    @ManyToMany(() => ProductEntity, product => product.categories)
    products: ProductEntity[]
}
