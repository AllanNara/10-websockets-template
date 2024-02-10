import path from "path";
import { Router } from "express";
import ProductManager from "../manager/ProductManager.js";
import __dirname from "../utils.js";

const manager = new ProductManager(path.resolve(__dirname, "../DB/productos.json"))
const router = Router();

// Para facilitar aún más la resolucion del ejercicio, las rutas ya se encuentran creadas, 
// renderizando la plantilla handlebars correspondiente

router.get("/", async(req, res) => {
  const allProducts = await manager.getProducts();
  res.render("home", { products: allProducts });
})

router.get("/realtimeproducts", (req, res) => {
  res.render("realtimeproducts", {});
})

export default router;