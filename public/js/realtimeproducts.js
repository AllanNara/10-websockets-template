console.log("¡Conectado desde el cliente!")

const socket = io()

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;

  const newProduct = { title, description, price }
  socket.emit("newProduct", newProduct);

  form.reset()
})


const list = document.getElementById("products")
socket.on("productList", (data) => {
  if(!data.length) {
    list.innerHTML = "No existen productos para mostrar";
    return
  }
  let allProductsHTML = data.reduce((acc, curr) => {
    acc += `
        <li>Producto: ${curr.title}</li>
        <li>Descripción: ${curr.description}</li>
        <li>Precio: ${curr.price}</li>
        <br>`
    return acc
  }, "");



  list.innerHTML = `
  	<div>
      <ul>
        ${allProductsHTML}
      </ul>
    </div>
  `
})