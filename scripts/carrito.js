const d = document;
const productsLocalStorage = JSON.parse(localStorage.getItem("carrito"));
console.log(productsLocalStorage, "PRODUCST LOCAL STORAGE");

const $productsContainer = d.getElementById("products-container");
const $conteoCarrito = d.getElementById("conteo-carrito");
const $totalPrice = d.getElementById("total-price");
//btn actions
const $btnPay = d.getElementById("btn-pay");



const ls = localStorage;

const initialCarrito = null;

$btnPay.addEventListener("click", () => {
    localStorage.setItem("carrito", initialCarrito);
    window.location.reload();
})

window.addEventListener("DOMContentLoaded", async () => {
    productsLocalStorage.forEach((camisa) => {
        const {image, id, description, status, color, sales, talla, price} = camisa;
        
        $productsContainer.innerHTML += `
        <div class="product">
                        <div class="product-card">
                            <p>${description}</p>
                            <img src="${image}" alt="${description}">
                        </div>
                        <div class="product-info">
                            <span>1</span>
                            <span>$${price}</span>
                            <span>$${price}</span>
                        </div>
                    </div>
        `;
    })

    let totalPrice = productsLocalStorage.reduce((total, product) => total + product.price, 0);

    $totalPrice.textContent = `$${totalPrice.toFixed(2)}`;
   
})

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
        let productosCarrito = JSON.parse(localStorage.getItem("carrito"));
        let product = productosCarrito.filter(data => data.id === id);
  
        return product[0];
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
        $conteoCarrito.textContent = `${count}`;
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

const getProducts = async () => {
    refrescarConteoDeCarrito();
};



getProducts();

