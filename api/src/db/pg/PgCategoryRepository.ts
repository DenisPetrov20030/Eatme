import { Repository } from 'typeorm'
import { CategoryEntity } from '../../models/entity/CategoryEntity'
import { AppDataSource } from '../../../app-data-source'
import { ApiError } from '../../../utils/errors/ApiError'
import Category from '../../models/domain/Category'
import { CategoryMapper } from '../../models/mappers/CategoryMapper'
import { ICategoryRepository } from '../../repositories/ICategoryRepository'

export class PgCategoryRepository implements ICategoryRepository {
    
    private readonly categoryRepository: Repository<CategoryEntity>

    constructor() {
        this.categoryRepository = AppDataSource.getRepository(CategoryEntity)
    }

    async getCategoryById(categoryId: number): Promise<Category | null> {
        const category = await this.categoryRepository.findOne({ where: { id: categoryId }, relations: ['parentCategory']  })
        console.log(category)
        return category ? CategoryMapper.fromCategoryEntityToCategory(category) : null
    }

    async createCategory(categoryData: Category): Promise<Category> {
        if (!categoryData){
            throw ApiError.BadRequest("Category data is invalid")
        }
        const newCategory = this.categoryRepository.create(categoryData)
        const savedCategory = await this.categoryRepository.save(newCategory)
        return CategoryMapper.fromCategoryEntityToCategory(savedCategory)
    }

    async updateCategory(categoryId: number, categoryData: Partial<Category>): Promise<Category | null> {
        try {
            const category = await this.categoryRepository.findOne({ where: { id: categoryId } })
            if (!category) throw ApiError.NotFound('Category not found')

            Object.assign(category, categoryData)
            await this.categoryRepository.save(category)
            return CategoryMapper.fromCategoryEntityToCategory(category)
        } catch (error: any) {
            throw ApiError.InternalServerError('Failed to update category', error)
        }
    }

    async deleteCategory(categoryId: number): Promise<boolean> {
        try {
            const category = await this.categoryRepository.findOne({ where: { id: categoryId }, relations: ['subcategories'] })
            if (!category) throw ApiError.NotFound('Category not found')

            const deleteSubcategories = async (subcategories: CategoryEntity[]) => {
                await this.categoryRepository.remove(subcategories)
            }

            if (category.subcategories.length) {
                await deleteSubcategories(category.subcategories)
            }

            await this.categoryRepository.remove(category)
            return true
        } catch (error: any) {
            throw ApiError.InternalServerError('Failed to delete category', error)
        }
    }

    async getAllCategories(): Promise<Category[]> {
        const categories = await this.categoryRepository.find({relations: ['parentCategory']})
        return categories.map(category => CategoryMapper.fromCategoryEntityToCategory(category))
    }

    async getSubcategories(categoryId: number): Promise<Category[]> {
        const category = await this.categoryRepository.findOne({ where: { id: categoryId }, relations: ['subcategories'] })
        return category?.subcategories ?? []
    }
}
