import path from "path";
import { Router } from "express";
import ProductManager from "../manager/ProductManager.js";
import __dirname from "../utils.js";

const manager = new ProductManager(path.resolve(__dirname, "../DB/productos.json"))
const router = Router();

router.get("/", async(req, res) => {
  const allProducts = await manager.getProducts();
  res.render("home", {products: allProducts});
})

router.get("/realtimeproducts", async(req, res) => {
  const allProducts = await manager.getProducts();
  res.render("realtimeproducts", {products: allProducts});
})

export default router;