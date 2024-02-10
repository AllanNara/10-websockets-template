import fs from "fs/promises";

// ESTE PRODUCT MANAGER TIENE LO MINIMO E INDISPENSABLE PARA PODER FUNCIONAR PARA EL DESAFIO,
// LA RECOMENDACION ES UTILIZAR EL PROPIO, YA QUE ESTE CARECE DE OTROS METODOS Y CONTROLES
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
    const json = await fs.readFile(this.path, "utf-8");
    return JSON.parse(json);
  }

  async writeFile(obj = []) {
    const json = JSON.stringify(obj, null, 2);
    await fs.writeFile(this.path, json, 'utf-8')
  }
}

export default ProductManager