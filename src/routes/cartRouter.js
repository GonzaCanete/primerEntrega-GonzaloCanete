import express from "express";
import cart from '../cart.js';
import productInstance from "../productManager.js";

const router = express.Router();


// metodo get para traer el carrito de compras
router.get("/api/cart", (req, res) => {
    res.json({ cart });
  });
  
  // metodo post para agregar productos por id
  router.post("/api/cart/:cid/product/:pid", (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const quantity = req.body.quantity || 1; // Inicializa quantity en 1 si no se proporciona en la solicitud
  
    // Verifico si el carrito existe en base al cartId
    const cartIndex = cart.findIndex((item) => item.cartId === cartId);
  
    if (cartIndex === -1) {
      // Si el carrito no existe, lo creo y agrego al nuevo producto
      cart.push({ cartId, items: [{ productId, quantity }] });
    } else {
      // Si el carrito existe, verifico si el producto ya está en el carrito
      const existingCartItem = cart[cartIndex].items.find((item) => item.productId === productId);
  
      if (existingCartItem) {
        // Si el producto ya está en el carrito, le agrego uno a cantidad
        existingCartItem.quantity += quantity;
      } else {
        // Si el producto no está en el carrito, lo agrego
        cart[cartIndex].items.push({ productId, quantity });
      }
    }
    res.json({ message: "Producto agregado al carrito con éxito", cart });
  });


export default router;
