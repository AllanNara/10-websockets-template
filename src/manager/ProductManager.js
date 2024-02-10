import fs from "fs/promises";

class ProductManager {
  constructor(path) {
    this.path = path
  }

  async addProduct({ title, description, code, price, stock, thumbnail }) {
    const allProducts = await this.getProducts();
    if(allProducts.some(prod => prod.code === code)) {
      console.log("Product code alredy exists");
      return null
    }

    let currentId = allProducts.length ? allProducts[allProducts.length - 1].id : 1
    const newProduct = { title, description, code, price, stock, thumbnail, id: currentId };
    
    allProducts.push(newProduct);
    await this.writeFile(allProducts);

    return newProduct
  }

  async getProducts() {
    try {
      const json = await fs.readFile(this.path, "utf-8");
      return JSON.parse(json);
    } catch(error) {
      console.log(`Building file...`);
      await this.writeFile()
      return []
    }
  }

  async writeFile(obj = []) {
    try {
      const json = JSON.stringify(obj, null, 2);
      await fs.writeFile(this.path, json, 'utf-8')
      return true  
    } catch (error) {
      console.log(error)
    }
  }
}

export default ProductManager