// Crear una clase productManager con un constructor (title, description, price, thumbnail, code, stock)

class productManager{
    // Atributos de la clase
    #products
    constructor (path){
        // genero un array vacio de productos que se va a ir llenando con el addProduct()
        this.#products = [];
        this.path = path;
    }
    // genero el get que me devuelve el array de productos
    getProducts() {
        return this.#products;
    }
    // genero el get que me devuelva el path
    getPath() {
        return this.path;
    }
    // Método para comprobar si un código de producto ya existe
    isCodeExist(code) {
        return this.#products.some(product => product.code === code);
    }

    // creo productos y los agrego al array this.#products creado en el constructor
    addProduct(title, description, price, thumbnail, code, stock) {
        // compruebo que no exista un producto con ese codigo
        if (this.isCodeExist(code)) {
            // devuelvo un mensaje en consola que advierte que el codigo ya existe y no lo agrego al array
            console.log("Ya existe un producto con este código.");
            return "codigo existente";
        }

        const product = {
            // genero un id que se incrementa cada vez que creo un producto
            id: this.#products.length + 1,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };
        // agrego el producto al array
        this.#products.push(product);
        return product;
    }
    

    // creo el metodo para que reciba un id por parametro y devuelva el producto con esa id
    getProductsById(id) {
        const product = this.#products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            return "Not found";
        }
    }
    // genero un método para actualizar un producto por id
    updateProduct(id, newData) {
        const productIndex = this.#products.findIndex(product => product.id === id);

        if (productIndex !== -1) {
            this.#products[productIndex] = { ...this.#products[productIndex], ...newData };
            return this.#products[productIndex];
        } else {
            return "not found";
        }
    }
    // genero un método para eliminar un producto por id
    deleteProduct(id) {
        const productIndex = this.#products.findIndex(product => product.id === id);

        if (productIndex !== -1) {
            const deletedProduct = this.#products.splice(productIndex, 1)[0];
            return deletedProduct;
        } else {
            return "not found";
        }
    }
    
    
    
    
}



const productInstance = new productManager();
productInstance.addProduct("Xbox", "Consola de videojuegos", 500, "./img", 65, 12);
productInstance.addProduct("Playstation 5", "Consola de videojuegos", 800, "./img", 50, 30);
productInstance.addProduct("PC gamer", "Computadora equipada para jugar", 1200, "./img", 100, 8);
productInstance.addProduct("Nintendo switch", "Consola de videojuegos", 350, "./img", 12, 4);
productInstance.addProduct("Elden ring", "Juego para playstation 5", 50, "./img", 123, 50);
productInstance.addProduct("Resident evil 4", "Juego para playstation 5", 50, "./img", 150, 45);
productInstance.addProduct("Zelda: Tears of the kingdom", "Juego para nintendo switch", 70, "./img", 800, 43);
productInstance.addProduct("Joystick PS5", "Accesorio para playstation 5", 45, "./img", 456, 7);
productInstance.addProduct("Joystick Xbox", "Accesorio para Xbox", 45, "./img", 805, 7);
productInstance.addProduct("Silla gamer", "Silla de escritorio con diseño gamer", 120, "./img", 44, 2);

// exporto los productos

export default productInstance;