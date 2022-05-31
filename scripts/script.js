const d = document;

const $categoryMan = d.getElementById("categoryMan");
const $categoryWoman = d.getElementById("categoryWoman");
const $conteoCarrito = d.getElementById("conteo-carrito");

const getData = async () => {
   
    const url = `https://ecommerce-rock-academia-geek.herokuapp.com/camisas/`;
    try {
        const res = await fetch(url);    
        const data = await res.json();    
        return data;
    } catch (error) {
        return console.log(`Error: ${data}`);
    }
}

const categoryFilter = async (category) => {
    const data = await getData();
    const render = data.filter((product) => product.category === category);
    console.log(render);
    localStorage.setItem("camisas", JSON.stringify(render));
    window.location = "pages/productsCategory.html";
}

$categoryMan.addEventListener("click", () => {
    categoryFilter("hombre");
})

$categoryWoman.addEventListener("click", () => {
    categoryFilter("mujer");
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

