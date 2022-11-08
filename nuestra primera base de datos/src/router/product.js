import { Router } from 'express';

const productRouter = Router();

import { ProductDao } from "../dao/index.js";

// get products /api/products/
productRouter.get('/', async (req, res) => {
  try {
    const products = await ProductDao.getAll();
    return res.status(200).json({ products })
  } catch (error) {
    console.log('error get /api/products', error);
    return res.json({
      error: 'error inesperado'
    })
  }

});

// add product
productRouter.post('/', async (req, res, next) => {
  try {
    const product = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      thumbnail: req.body.thumbnail,
      stock: req.body.stock
    };

    await ProductDao.save(product);

    return res.status(200).json({
      success: 'Product added succesfully'
    })
  } catch (error) {
    console.log('error post /api/products', error);
    return res.json({ error: 'error inesperado' });
  }
});

// delete product
productRouter.delete('/:id', async (req, res, next) => {
  try {
    await ProductDao.deleteById(req.params.id);

    return res.status(200).json({
      success: 'Product deleted succesfully'
    })
  } catch (error) {
    console.log('error delete /api/products/:id', error);
    return res.json({ error: 'error inesperado' });
  }
});

// update product
productRouter.put('/:id', async (req, res, next) => {
  try {
    const product = {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      thumbnail: req.body.thumbnail,
      stock: req.body.stock
    };

    await ProductDao.updateById(req.params.id, product);

    return res.status(200).json({
      success: 'Product deleted succesfully'
    })
  } catch (error) {
    console.log('error put /api/products/:id', error);
    return res.json({ error: 'error inesperado' });
  }
});

export { productRouter };