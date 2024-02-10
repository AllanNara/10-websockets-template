import path from "path";
import express from "express";
import handlebars from "express-handlebars";
import { Server } from "socket.io";
import __dirname from "./utils.js";

import viewsRouter from "./routes/views.routes.js";
import ProductManager from "./manager/ProductManager.js";

const PORT = 8080;
const app = express();

// SERVIDOR LEVANTADO Y ENLAZADO CON WEBSOCKET
const httpServer = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
const io = new Server(httpServer);

// HANDLEBARS YA CONFIGURADO
app.engine("handlebars", handlebars.engine());
app.set("views", path.resolve(__dirname, "../views"));
app.set("view engine", "handlebars");

// ARCHIVOS ESTATICOS 
app.use(express.static(path.resolve(__dirname, "../public")))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", viewsRouter);


// PARA ENVIAR Y GUARDAR NUESTROS PRODUCTOS, HAREMOS USO DE NUESTRO MANAGER
const manager = new ProductManager(path.resolve(__dirname, "../DB/productos.json"))
io.on("connection", async(socket) => {
  console.log(`New socket connected with ID: ${socket.id}`);

  // EMITIMOS UN EVENTO PARA ENVIAR TODOS LOS PRODUCTOS AL CLIENTE
  socket.emit("productList", await manager.getProducts())

  // ESCUCHAMOS NUESTRO EVENTO PARA RECIBIR Y GUARDAR EL PRODUCTO,
  // PARA LUEGO ENVIARLO A TODOS LOS SOCKETS CONECTADOS
  socket.on("newProduct", async(data) => {
    await manager.addProduct(data);
    io.emit("productList", await manager.getProducts())
  })
  
})