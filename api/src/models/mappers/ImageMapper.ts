import ProductImage from "../domain/Image";
import { ProductImageEntity } from "../entity/ProductImageEntity";

export class ImageMapper {

    static fromImageEntityToImage(entity: ProductImageEntity): ProductImage {
        return {
            id: entity.id,
            product: {id: entity.product.id},
            imageUrl: entity.imageUrl
        }
    }
}