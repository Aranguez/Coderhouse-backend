import knex from 'knex';

class Container {
  db;
  tableName = '';

  constructor(dbOptions, tableName, cb) {
    this.tableName = tableName;
    this.db = knex(dbOptions); // replace with dbOptions
    this.db.schema.createTable(tableName, cb)
      .then(a => { a })
      .catch(e => {
        console.error('error al crear la tabla', e)
      })
  }

  async getAll() {
    const response = await this.db.from(this.tableName).select('*');
    return response;
  }

  async save(element) {
    try {
      const response = await this.db.from(this.tableName).insert(element);
      return response;
    } catch (error) {
      console.log('error', error)
    }
  }

  async getById(id) {
    try {
      const response = await this.db.from(this.tableName).where('id', id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const response = await this.db.from(this.tableName).where('id', id).del();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      const response = await this.db.from(this.tableName).del();
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(id, newData) {
    try {
      const response = await this.db.from(this.tableName).where('id', id).update(newData);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default Container;