import { Router } from "express";

import { ProductDao } from "../../Dao/index.js";
import { verifyRole } from "../../middlewares/index.js";

const router = Router();

// OK
router.get('/:id?', async (req, res, next) => {
  try {
    if (req.params.id) {
      const product = await ProductDao.getById(req.params.id)
      if (product) return res.json(product);
      return res.json({ error: 'No se encontro el producto' })
    }

    const products = await ProductDao.getAll()
    res.json({ products });
  } catch (error) {
    res.send({ error });
  }
});

// OK
router.post('/', verifyRole, async (req, res) => {
  try {
    const { title, description, code, thumbnail, price, stock } = req.body;

    await ProductDao.save({
      title,
      description,
      code,
      thumbnail,
      price,
      stock,
      timestamp: Date.now(),
    });
    res.json({ success: 'producto creado' });
  } catch (error) {
    res.json({ error: 'Error inesperado' });
  }
});

// OK
router.put('/:id', verifyRole, async (req, res) => {
  try {
    await ProductDao.updateById(req.params.id, req.body);
    res.json({ success: 'producto actualzado' });
  } catch (error) {
    res.json({ error: 'Error inesperado' });
  }
});

// OK
router.delete('/:id', verifyRole, async (req, res) => {
  try {
    await ProductDao.deleteById(req.params.id);
    res.json({ success: 'producto eliminado' });
  } catch (error) {
    res.json({ error: 'Error inesperado' });
  }
});

export { router as ProductRouter };