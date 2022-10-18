const express = require('express');
const router = express.Router();

const Container = require('../src/container');
const Productos = new Container();

router.get('/', (req, res, next) => {
  res.json(Productos.getAll())
});

router.get('/:id', (req, res, next) => {
  const productoEncontrado = Productos.getById(Number(req.params.id));

  if (productoEncontrado) {
    res.json(productoEncontrado)
  } else {
    res.json({ error: 'Producto no encontrado' })
  }
});

router.post('/', (req, res, next) => {
  const nuevoProducto = { ...req.body, id: Productos.getAll().length + 1 };
  Productos.add(nuevoProducto)
  res.json({ agregado: nuevoProducto })
});

router.put('/:id', (req, res, next) => {
  Productos.update(Number(req.params.id), req.body);
  res.send('Producto actualizado')
});

router.delete('/:id', (req, res, next) => {
  Productos.remove(Number(req.params.id));
  res.send('Producto eliminado')
});

module.exports = router;