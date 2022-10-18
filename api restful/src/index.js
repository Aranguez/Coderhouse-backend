const express = require('express');
const apiRouter = require('../routes/api');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', express.static('public'));
app.use('/api/productos', apiRouter);

const PORT = process.env.PORT || 8080;

app.on('error', (err) => console.error('Error: ' + err));
app.listen(PORT, () => console.log('App running in port: ' + PORT));