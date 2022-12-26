import { Router } from 'express';
import path from 'node:path';
import multer from 'multer';

import { listCategories } from './app/use-cases/categories/list-categories';
import { createCategory } from './app/use-cases/categories/create-category';
import { listProducts } from './app/use-cases/products/list-products';
import { createProduct } from './app/use-cases/products/create-product';
import { listProductsByCategory } from './app/use-cases/categories/list-products-by-category';
import { listOrders } from './app/use-cases/orders/list-orders';
import { createOrder } from './app/use-cases/orders/create-order';
import { changeOrderStatus } from './app/use-cases/orders/change-order-status';
import { cancelOrder } from './app/use-cases/orders/cancel-order';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

// List categories of the Pizzas
router.get('/categories', listCategories);

// Create categories of the Pizzas
router.post('/categories', createCategory);

// Delete categories
router.delete('/categories/:categoryId');

//List Products
router.get('/products', listProducts);

//Create Product
router.post('/products', upload.single('image'), createProduct);

//Get products by catergory
router.get('/categories/:categoryId/products', listProductsByCategory);

//List orders
router.get('/orders', listOrders);

//Create orders
router.post('/orders', createOrder);

//Change order status
router.patch('/orders/:orderId', changeOrderStatus);

//Delete or cancel order
router.delete('/orders/:orderId', cancelOrder);


