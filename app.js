
document.addEventListener('DOMContentLoaded', ()=>{
    localStorage.getItem('cart') && (carrito = JSON.parse(localStorage.getItem('cart'))) && renderizarCarrito()
})


class Products {
  constructor(id, nombre, precio, stock, img=""){
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.stock = stock;
    this.img = img;
    };
};

const baseDeDatos = [];

const p1 = new Products (1, "Remera Nirvana", 700, 20, "assets/img/nirvana.png");
const p2 = new Products (2, "Remera Metallica", 700, 20, "assets/img/metallica.png");
const p3 = new Products (3, "Remera AC/DC", 700, 20, "assets/img/acdc.png");
const p4 = new Products (4, "Remera Guns N' Roses", 700, 20, "assets/img/guns.png");
const p5 = new Products (5, "Remera Aerosmith", 700, 20, "assets/img/aer.png");
const p6 = new Products (6, "Remera Bon Jovi", 700, 20, "assets/img/bj.png");

baseDeDatos.push(p1, p2, p3, p4, p5, p6);


const mostrarProductos = (productos) =>{
    const productContainer = document.getElementById("product-container");
    productos.forEach((producto )=> {
       const card = document.createElement('card');
        card.innerHTML += `<h3>${producto.nombre}</h3>
                            <h5> Nro:${producto.id}</h5> 
                            <img src = "${producto.img}">
                            <button class="item-button btn btn-dark" id="button${producto.id}" type="button">Agregar al carrito</button>`;
    productContainer.appendChild(card);
    productContainer.classList.add("prod")
    

    const button = document.getElementById(`button${producto.id}`);
    button.setAttribute("marcador", producto.id);
    button.addEventListener("click", añadirProductoAlCart);
    })

};
mostrarProductos(baseDeDatos);

let carrito = []
const carritoId = document.querySelector("#cart-container");
const total = document.querySelector("#total");
const botonVaciar = document.querySelector("#boton-vaciar");
const botonFinalizar = document.querySelector("#boton-final")


function añadirProductoAlCart (evento) {
    carrito.push(evento.target.getAttribute("marcador"));
    localStorage.setItem('cart', JSON.stringify(carrito))
    renderizarCarrito();
    localStorage.setItem('cart', JSON.stringify(carrito))
  }

function renderizarCarrito(){

    carritoId.textContent = "";
    const carritoSinDuplicados = [...new Set(carrito)];
    carritoSinDuplicados.forEach((item) => {
        const elemento = baseDeDatos.filter ((itemBD)=>{
            return itemBD.id === parseInt (item)
        })
        const numeroUnid = carrito.reduce((total, itemId) =>{
            return itemId === item ? (total += 1) : total;
        },0)
        
        const li = document.createElement("li");
        li.textContent = `${numeroUnid} x ${elemento[0].nombre} - ${elemento[0].precio}$ `;

        const BotonB = document.createElement("button");
     
        BotonB.textContent = "Borrar";
        BotonB.style.marginLeft = "1rem";
        BotonB.dataset.item = item;
        BotonB.addEventListener("click", borrarItemCarrito);

        li.appendChild(BotonB);
        carritoId.appendChild(li);
        
    })
    
    total.textContent = calcularTotal();
}

function borrarItemCarrito(e) {
    const id = e.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
      return carritoId !== id;
    });
    localStorage.setItem('cart', JSON.stringify(carrito))
    renderizarCarrito();
  }
 
  function calcularTotal() {
    return carrito
      .reduce((total, item) => {
        const miItem = baseDeDatos.filter((itemBaseDatos) => {
          return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
      }, 0)
      .toFixed(2);
  }

  function vaciarCarrito() {
    carrito = [];
    localStorage.setItem('cart', JSON.stringify(carrito))
    renderizarCarrito();
  }
  botonVaciar.addEventListener("click", vaciarCarrito);

  function finalizarCompra(){

    if (carrito.length === 0){
      swal("Carrito vacio")
    }else{
      swal("Compra finalizada","" ,"success")
      carrito = []
      renderizarCarrito()
    } 
  }
  botonFinalizar.addEventListener("click",finalizarCompra)

  //formulario
const formulario = document.querySelector('form');
const fname = document.getElementById ('fname');
const femail = document.getElementById('femail');
const text2 = document.querySelector("#warning");

formulario.addEventListener('submit', (e)=>{
    e.preventDefault();
    let name = document.getElementById('fname').value
    console.log(name);
    let mail = document.getElementById('femail').value
    console.log(mail);

  (fname.value === "" || femail.value === "") ? text2.textContent = 'Rellenar todos los campos' : swal(`El formulario fue enviado con éxito. Gracias ${fname.value}`);
});

renderizarCarrito();





  