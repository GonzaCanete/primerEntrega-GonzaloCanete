import express from "express";
import productInstance from "../productManager.js";

const router = express.Router();

router.get("/products", (req, res) => {
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

router.get("/api/products/:id", (req, res) => {
  // guardo en una constante el id que recibo y lo guardo como int por la reutilizacion de mi función
  const id = parseInt(req.params.id);
  // llamo a la funcion getProductById de mi ProductManager
  const product = productInstance.getProductsById(id);

  // Compruebo que el resultado de la búsqueda no coincida con el return de mi función que era un 'not found'
  if (product !== "Not found") {
    res.send({ product });
  } else {
    // si coincide ese string, devuelvo el mensaje de que no existe un producto con ese id
    res.send("No existe un producto con ese id");
  }
});

// obtener la lista de productos mediante metodo GET
router.get("/api/products", (req, res) => {
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
router.post("/api/products", (req, res) => {
  // traigo los datos
  const {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status,
    category,
  } = req.body;

  // Compruebo si el código de producto ya existe
  if (productInstance.isCodeExist(code)) {
    res.status(400).json({ error: "Ya existe un producto con este código." });
  } else {
    // Creo un nuevo producto con los campos adicionales
    const newProduct = productInstance.addProduct(
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      status,
      category
    );
    res.status(201).json({ product: newProduct });
    // Guardo los productos una vez que se ha agregado el nuevo producto
    productInstance.saveProductsToFile();
  }
});

// metodo PUT para modificar los productos
router.put("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // guardo los datos desde el body
  const {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status,
    category,
  } = req.body;

  // llamo al método `updateProduct` de la instancia de `productManager`
  const updatedProduct = productInstance.updateProduct(id, {
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    status,
    category,
  });

  // compruebo si el producto se actualizó con éxito
  if (updatedProduct !== "not found") {
    res.json({ product: updatedProduct });
  } else {
    res.status(404).json({ error: "No se encontró un producto con ese ID." });
  }
});

router.delete("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);

  // llamo al método `deleteProduct` de la instancia de `productManager`
  const deletedProduct = productInstance.deleteProduct(id);

  if (deletedProduct !== "not found") {
    // guardo los productos en el archivo JSON después de eliminar el producto
    productInstance.saveProductsToFile();

    res.json({ message: "Producto eliminado con éxito", deletedProduct });
  } else {
    res.status(404).json({ error: "No se encontró un producto con ese ID." });
  }
});

export default router;
