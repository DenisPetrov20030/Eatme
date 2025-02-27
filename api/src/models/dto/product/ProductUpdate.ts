import Product from "../../domain/Product"

type ProductUpdate = Pick<Product, "name" | "description" | "price" | "quantity" | "categories" |"images">

export default ProductUpdate