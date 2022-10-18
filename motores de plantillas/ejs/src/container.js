class Container {
  constructor() {
    this.items = [];
  }

  getAll() {
    return this.items;
  }

  add(item) {
    // console.log('this items', this.items, item);
    this.items = [...this.items, item];
  }

  getById(id) {
    return this.items.find(item => item.id === id);
  }

  remove(id) {
    this.items = this.items.filter(item => item.id !== id);
  }

  update(id, updatedItem) {
    this.items = this.items.map(item => item.id === id ? { ...updatedItem, id } : item);
  }
}

module.exports = Container;