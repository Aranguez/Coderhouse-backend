import { Router } from "express";

import { CartDao, ProductDao } from "../../Dao/index.js";

const router = Router();

// OK
router.post('/', async (req, res) => {
  try {
    const baseCart = { products: [], timestamp: Date.now() }
    const cart = await CartDao.save(baseCart);

    res.json({ success: `Carrito creado con el id ${cart.id}` });
  } catch (error) {
    res.json({ error: 'Error inesperado' });
  }
});

// OK
router.delete('/:id', async (req, res) => {
  try {
    await CartDao.deleteById(req.params.id);
    res.json({ success: 'Carrito eliminado' });
  } catch (error) {
    res.json({ error: 'Error inesperado' });;
  }
});

// OK
router.get('/:id/products', async (req, res) => {
  try {
    const cart = await CartDao.getById(req.params.id);
    res.json({ cartProducts: cart.products });
  } catch (error) {
    res.json({ error: 'Error inesperado' });;
  }
});

// OK
router.post('/:id/products', async (req, res) => {
  try {
    const { product_id } = req.body;

    const cart = await CartDao.getById(req.params.id);
    const product = await ProductDao.getById(product_id);

    cart.products.push(product);

    await CartDao.updateById(req.params.id, cart);
    res.json({ cart });
  } catch (error) {
    res.json({ error: 'Error inesperado' });
  }
});

router.delete('/:id/products/:id_prod', async (req, res) => {
  try {
    const cart = await CartDao.getById(req.params.id);
    const products = cart.products.filter(p => p.id === req.params.id_prod);

    await CartDao.updateById(req.params.id, { ...cart, products });
    res.json({ success: 'Elemento del carrito eliminado' });
  } catch (error) {
    res.json({ error: 'Error inesperado' });
  }
});

export { router as CartRouter };