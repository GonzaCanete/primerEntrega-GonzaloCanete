import express  from "express";
// Importo mi archivo 
import productInstance from "./productManager.js";
import cart from './cart.js';
import axios from 'axios';
const app = express();
// Query param
app.use(express.urlencoded({extended:true}));
app.use(express.json());



app.get('/products', (req, res) => {
    const products = productInstance.getProducts();
    // Leo el limite del query y lo paso a int para trabajarlo en mi funcion, ya que el id de mi producto es autogenerado en int
    const limit = parseInt(req.query.limit); 

    //Compruebo que limit no sea nulo y que sea mayor a 0 para chequearlo
    if (!isNaN(limit) && limit > 0) {
        const limitedProducts = products.slice(0, limit);
        // Devuelvo los productos solicitados
        res.send({ products: limitedProducts });
    } else {
        // Si no recibo limit devuelvo los products
        res.send({ products });
    }
});

app.get('/api/products/:id', (req, res) => {
    // guardo en una constante el id que recibo y lo guardo como int por la reutilizacion de mi función
    const id = parseInt(req.params.id);
    // llamo a la funcion getProductById de mi ProductManager
    const product = productInstance.getProductsById(id);

    // Compruebo que el resultado de la búsqueda no coincida con el return de mi función que era un 'not found'
    if (product !== 'Not found') {
        res.send({ product });
    } else {
        // si coincide ese string, devuelvo el mensaje de que no existe un producto con ese id
        res.send('No existe un producto con ese id');
    }
});

// obtener la lista de productos mediante metodo GET
app.get('/api/products', (req, res) => {
    const products = productInstance.getProducts();
    const limit = parseInt(req.query.limit);

    if (!isNaN(limit) && limit > 0) {
        const limitedProducts = products.slice(0, limit);
        res.send({ products: limitedProducts });
    } else {
        res.send({ products });
    }
});

// metodo POST para agregar los productos
app.post('/api/products', (req, res) => {
    // leo los datos desde el body
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;

    // Compruebo si el código de producto ya existe
    if (productInstance.isCodeExist(code)) {
        res.status(400).json({ error: "Ya existe un producto con este código." });
    } else {
        // agrego un nuevo producto con los campos adicionales
        const newProduct = productInstance.addProduct(title, description, price, thumbnail, code, stock, status, category);
        res.status(201).json({ product: newProduct });
    }
});

// metodo PUT para modificar los productos
app.put('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);
    
    // guardo los datos desde el body
    const { title, description, price, thumbnail, code, stock, status, category } = req.body;

    // llamo al método 'updateProduct' de la instancia de 'productManager'
    const updatedProduct = productInstance.updateProduct(id, {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        status,
        category
    });

    // compruebo si el producto se actualizó con éxito
    if (updatedProduct !== 'not found') {
        res.json({ product: updatedProduct });
    } else {
        res.status(404).json({ error: 'No se encontró un producto con ese ID.' });
    }
});

app.delete('/api/products/:id', (req, res) => {
    const id = parseInt(req.params.id);

    // llamo al método 'deleteProduct' de la instancia de 'productManager'
    const deletedProduct = productInstance.deleteProduct(id);

    // veo si el producto se eliminó con éxito
    if (deletedProduct !== 'not found') {
        res.json({ message: 'Producto eliminado con éxito', deletedProduct });
    } else {
        res.status(404).json({ error: 'No se encontró un producto con ese ID.' });
    }
});

// metodo get para traer el carrito de compras
app.get('/api/cart', (req, res) => {
    res.json({ cart });
});

// metodo post para agregar productos por id
app.post('/api/cart/product/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    // arranco una constante cantidad distinto a 0 que lea desde el body la cantidad de items anteriores
    const quantity = req.body.quantity || 1; 
  
    // compruebo si existe el producto en el productManager()
    const product = productInstance.getProductsById(productId);
  
    if (product === 'Not found') {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
  
    // compruebo que el producto no este en el carrito
    const existingCartItem = cart.find(item => item.productId === productId);
  
    if (existingCartItem) {
      // Si el producto ya está en el carrito, le agrego uno al quantity
      existingCartItem.quantity += quantity;
    } else {
      // Si el producto no está en el carrito, lo agrego al array
      cart.push({ productId, quantity });
    }
      
    res.json({ message: 'Producto agregado al carrito con éxito', cart });
  });
  
app.listen(8080, () => {
    console.log("Escuchando en el puerto 8080");
})

