const fs = require('fs');

class Container {
  constructor(filename) {
    this.filename = filename;
    fs.writeFileSync(`./${filename}.json`, JSON.stringify([{
      "title": "Producto 1",
      "price": 100,
      "thumbnail": "url",
      "id": 1
    },
    {
      "title": "Producto 1",
      "price": 100,
      "thumbnail": "url",
      "id": 2
    },
    {
      "title": "Producto 1",
      "price": 100,
      "thumbnail": "url",
      "id": 3
    }], null, 2));
  }

  getAll() {
    const elements = fs.readFileSync(`./${this.filename}.json`)
    return JSON.parse(elements);
  }

  save(obj) {
    const elements = this.getAll();
    const newId = elements.length === 0 ? 1 : elements[elements.length - 1].id + 1;
    elements.push({ ...obj, id: newId });
    fs.writeFileSync(`./${this.filename}.json`, JSON.stringify(elements, null, 2));
    return newId;
  }

  getById(id) {
    const elements = this.getAll();
    return elements.find(p => p.id === id);
  }

  deleteById(id) {
    const elements = this.getAll();
    const filteredElements = elements.filter(p => p.id !== id);
    fs.writeFileSync(`./${this.filename}.json`, JSON.stringify(filteredElements, null, 2));
  }

  deleteAll() {
    fs.writeFileSync(`./${this.filename}.json`, JSON.stringify([], null, 2));
  }
}

module.exports = Container;