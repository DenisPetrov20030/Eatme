import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { UserEntity } from './UserEntity';
import { OrderStatusEntity } from './OrderStatusEntity';
import { OrderItemEntity } from './OrderItemEntity';


@Entity({ name: 'Orders' })
export class OrderEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => UserEntity, user => user.orders)
    @JoinColumn()
    user: UserEntity;

    @ManyToOne(() => OrderStatusEntity)
    @JoinColumn()
    orderStatus: OrderStatusEntity;

    @Column({ nullable: true})
    orderApprovedAt: Date

    @Column({ nullable: true})
    orderDeliveredCarrierDate: Date;

    @Column({ nullable: true })
    orderDeliveredUserDate: Date;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => OrderItemEntity, orderItem => orderItem.order)
    orderItems: OrderItemEntity[];
}
