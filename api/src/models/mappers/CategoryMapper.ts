import Category from "../domain/Category";
import { CategoryEntity } from "../entity/CategoryEntity";

export class CategoryMapper {
    static fromCategoryEntityToCategory(entity: CategoryEntity): Category {
        return {
            id: entity.id,
            name: entity.name,
            imageUrl: entity.imageUrl,
            parentCategory: entity.parentCategory
        }
    }
}