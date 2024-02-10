console.log("¡Conectado desde el cliente!")

const socket = io()

const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Escribe tu codigo para enviar el nuevo producto !

})


const list = document.getElementById("products")
socket.on("productList", (data) => {
  if(!data.length) {
    list.innerHTML = "No existen productos para mostrar";
    return
  } else {

    // Escribe tu codigo para mostrar los productos !

  }
})