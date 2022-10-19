const express = require('express');

const Container = require('./src/container');
const Productos = new Container();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('form.pug');
})

app.get('/productos', (req, res) => {
  const products = Productos.getAll();
  res.render('products.pug', { products });
});

app.post('/productos', (req, res) => {
  const nuevoProducto = { ...req.body, id: Productos.getAll().length + 1 };
  Productos.add(nuevoProducto)
  res.redirect('/');
});

const PORT = process.env.PORT || 8080;

app.on('error', (err) => console.error('Error: ' + err));
app.listen(PORT, () => console.log('App running in port: ' + PORT));