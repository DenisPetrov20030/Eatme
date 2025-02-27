import Category from "../models/domain/Category"

export interface ICategoryRepository {
    getCategoryById(categoryId: number): Promise<Category | null>
    createCategory(categoryData: Category): Promise<Category>
    updateCategory(categoryId: number, categoryData: Partial<Category>): Promise<Category | null>
    deleteCategory(categoryId: number): Promise<boolean>
    getAllCategories(): Promise<Category[]>
    getSubcategories(categoryId: number): Promise<Category[]>
}
