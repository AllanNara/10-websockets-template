import path from "path";
import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";

import viewsRouter from "./routes/views.routes.js";
import ProductManager from "./manager/ProductManager.js";

const PORT = 8080;
const app = express();
const httpServer = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const io = new Server(httpServer);

app.engine("handlebars", handlebars.engine());
app.set("views", path.resolve(__dirname, "../views"));
app.set("view engine", "handlebars");

app.use(express.static(path.resolve(__dirname, "../public")))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", viewsRouter);

const manager = new ProductManager(path.resolve(__dirname, "../DB/productos.json"))
io.on("connection", async(socket) => {
  console.log(`New socket connected with ID: ${socket.id}`);

  socket.emit("productList", await manager.getProducts())

  socket.on("newProduct", async(data) => {
    await manager.addProduct(data);
    io.emit("productList", await manager.getProducts())
  })
})