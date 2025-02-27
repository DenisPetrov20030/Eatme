import { Product } from "@/types/products/Product";

export function isProduct(product: Product | { id: string }): product is Product {
    return (product as Product).name !== undefined;
}
export const fileToDataURL = (file: File, format: string = "jpeg"): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        const base64String = reader.result?.toString().split(',')[1];
        if (base64String) {
          resolve(`data:image/${format};base64,${base64String}`);
        } else {
          reject(new Error("Failed to convert file to base64 string"));
        }
      };
      
      reader.onerror = () => {
        reject(new Error("Error reading file"));
      };
  
      reader.readAsDataURL(file);
    });
  };