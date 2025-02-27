import Product from "../../domain/Product"

type ProductCreate = Pick<Product, "name" | "description" | "price" | "quantity" | "categories" |"images">

export default ProductCreate