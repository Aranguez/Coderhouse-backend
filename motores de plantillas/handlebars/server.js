const express = require('express');
const engine = require('express-handlebars').engine;

const Container = require('./src/container');
const Productos = new Container();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('form', { layout: false });
})

app.get('/productos', (req, res) => {
  const products = Productos.getAll();
  console.log('products', products);
  res.render('products', { layout: false, products });
});

app.post('/productos', (req, res) => {
  console.log('req.body', req.body);
  const nuevoProducto = { ...req.body, id: Productos.getAll().length + 1 };
  Productos.add(nuevoProducto)
  res.redirect('/productos');
});

const PORT = process.env.PORT || 8080;

app.on('error', (err) => console.error('Error: ' + err));
app.listen(PORT, () => console.log('App running in port: ' + PORT));