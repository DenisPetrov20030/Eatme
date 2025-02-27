import { ApiError } from '../../utils/errors/ApiError'
import Category from '../models/domain/Category'
import { ICategoryRepository } from '../repositories/ICategoryRepository'

export class CategoryService {
    constructor(private readonly categoryRepository: ICategoryRepository) {}

    async getCategoryById(categoryId: number): Promise<Category | null> {
        const category = await this.categoryRepository.getCategoryById(categoryId)
        if (!category) {
            throw ApiError.NotFound("Category not found")
        }
        return category
    }

    async createCategory(categoryData: Category): Promise<Category> {
        return await this.categoryRepository.createCategory(categoryData)
    }

    async updateCategory(categoryId: number, categoryData: Partial<Category>): Promise<Category | null> {
        const category = await this.categoryRepository.getCategoryById(categoryId)
        if (!category) {
            throw ApiError.NotFound("Category not found")
        }
        return await this.categoryRepository.updateCategory(categoryId, categoryData)
    }

    async deleteCategory(categoryId: number): Promise<boolean> {
        const category = await this.categoryRepository.getCategoryById(categoryId)
        if (!category) {
            throw ApiError.NotFound("Category not found")
        }
        return await this.categoryRepository.deleteCategory(categoryId)
    }

    async getAllCategories(): Promise<Category[]> {
        return await this.categoryRepository.getAllCategories()
    }

    async getSubcategories(categoryId: number): Promise<Category[]> {
        return await this.categoryRepository.getSubcategories(categoryId)
    }
}
