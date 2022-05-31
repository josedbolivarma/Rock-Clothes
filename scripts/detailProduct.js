const d = document;
const productLocalStorage = JSON.parse(localStorage.getItem("camisa"));
const $conteoCarrito = d.getElementById("conteo-carrito");
const ls = localStorage;

const $containerProductDetails = d.getElementById("product-details-container");

window.addEventListener("DOMContentLoaded", async () => {
    productLocalStorage.forEach((camisa) => {
        const {image, id, description, status, color, sales, talla, price} = productLocalStorage[0];
        
        $containerProductDetails.innerHTML += `
        <img class="product-details-img" src="${image}" alt="">
        <article class="product-details-description">
            <h2>${status} - ${talla}</h2>
            <h3>$${price}</h3>
            <p>${description}</p>
            <div class="product-details-actions text-right">
                <span class="squart-btn">${sales}</span>
                <button class="btn" onclick="addCarrito(${id})"=>Agregar al Carrito</button>
            </div>
        </article>
        `;
    })

    
})



console.log(productLocalStorage);


//Clase carrito de compra

class Carrito {
    constructor() {
        this.clave = "carrito";
        this.products = this.getProducts();
    }


    addProduct(id) {
        let productos = JSON.parse(localStorage.getItem("camisas"));
        console.log(productos, "productos entran");
        let product = productos.filter(data => data.id === id);
        console.log(!this.exist(id), "!this.exist(id)");
        
        if(!this.exist(id)) {
            console.log("ENTRA AL EXIST");
            this.products.push(product[0]);
        }
       /* this.products = product || [...this.products, product[0]]; */ 
        this.saved();
        window.location = "../pages/carrito.html";
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
        let productos = JSON.parse(ls.getItem("carrito"));
        if(!productos) {
            return false;
        } else {
            let product = productos.filter(data => data.id === id);
            return product[0];
        }
    }

    saved() {
        ls.setItem("carrito", JSON.stringify(this.products));
    }

    getCount() {
        return this.products.length;
    }
}


const updateCount = count => {
    if(!count) {
        $conteoCarrito.textContent = "";
    } else {
        $conteoCarrito.textContent = count;
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

const addCarrito = (product) => {
  
    const c = new Carrito();

    c.addProduct(product);
    getProducts();

}

const getProducts = async () => {    
    const c = new Carrito();


    refrescarConteoDeCarrito();

    
};



getProducts();
