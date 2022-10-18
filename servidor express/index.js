const express = require('express');
const app = express();

const Container = require('./Container');
const Productos = new Container('productos');

app.get('/', (req, res) => {
  res.send('HOME');
});

app.get('/productos', (req, res) => {
  res.json(Productos.getAll());
});

app.get('/productoRandom', (req, res) => {
  const productos = Productos.getAll();
  const randomId = Math.floor(Math.random() * productos.length) + 1;
  res.json(Productos.getById(randomId));
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`app running at port ${PORT}`);
});