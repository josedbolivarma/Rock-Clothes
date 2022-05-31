const d = document;
const dataLocalStorage = JSON.parse(localStorage.getItem("camisas"));
const $conteoCarrito = d.getElementById("conteo-carrito");

const $containerGridLayout = d.getElementById("grid-layout");

console.log(dataLocalStorage);
window.addEventListener("DOMContentLoaded", async () => {
    dataLocalStorage.forEach((camisa) => {
        const {image, id, description, status, color, sales, talla, price} = camisa;
        
        $containerGridLayout.innerHTML += `
        <div class="grid-layout-card hover-card" onclick="selectProduct(${id})">
                    <img src="${image}" alt="">
                    <div class="grid-layout-card-text">
                        <h2>${status}</h2>
                        <span>$${price}</span>
                    </div>
            </div>
        `;
    
    })
})

const selectProduct = (id) => {
    const data = dataLocalStorage.filter((camisa) => camisa.id === id);
    console.log(data);
    localStorage.setItem("camisa", JSON.stringify(data));
    window.location = "detailProduct.html";
}


//Clase carrito de compra

class Carrito {
    constructor() {
        this.clave = "carrito";
        this.products = this.getProducts();
    }


    addProduct(id) {
        let productos = JSON.parse(localStorage.getItem("camisas"));
        let product = productos.filter(data => data.id === id);
        if(this.exist(id)) {
            this.products.push(product[0]);
        }
       /* this.products = product || [...this.products, product[0]]; */ 
        this.saved();
    }

    getProducts() {
        const parseProducts = localStorage.getItem("carrito");
        return JSON.parse(parseProducts) || []; 
    }

    deleteProduct(id) {
        const index = this.products.findIndex(p => p.id === id);
        if(index != -1) {
            this.products.splice(index, 1);
            this.saved();
        }
    }

    exist(id) {
        let productos = JSON.parse(ls.getItem("camisas"));
        let product = productos.filter(data => data.id === id);
        return product[0];
    }

    saved() {
        ls.setItem("carrito", JSON.stringify(this.products));
    }

    getCount() {
        return this.products.length;
    }
}

const refrescarConteoDeCarrito = () => {
    const carritoEncabezado = new Carrito();
    const conteo = carritoEncabezado.getCount();
    if (conteo > 0) {
        $conteoCarrito.textContent = conteo;
    } else {
        $conteoCarrito.textContent = "";
    }
};


refrescarConteoDeCarrito();