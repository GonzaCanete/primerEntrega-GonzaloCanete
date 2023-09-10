import express  from "express";
// Importo mi archivo 
import productInstance from "./productManager.js";
import cart from './cart.js';
import productRouter from "./routes/productRouter.js";
import cartRouter from './routes/cartRouter.js';

const app = express();
// Query param
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use('/' , productRouter);
app.use('/' , cartRouter);
  
app.listen(8080, () => {
    console.log("Escuchando en el puerto 8080");
})

