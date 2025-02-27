export interface Category {
    id: number
    name: string
    imageUrl: string
    parentCategory?: Category
}