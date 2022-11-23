import firebase from 'firebase';

class Firebase {
  constructor() { }

  async getAll(collection) {
    try {
      const document = await this.db(collection).get()
      return document.docs.map(doc => { return { ...doc.data(), id: doc.id } })
    } catch (error) {
      console.log(error);
    }
  }

  async save(collection, data) {
    try {
      const document = await this.db.collection(collection).doc()
      await document.create(data)
    } catch (error) {
      console.log(error);
    }
  }

  async getById(collection, id) {
    try {
      const document = await this.db.collection(collection).doc(id).get()
      return document.data()
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(collection, id) {
    try {
      const document = await this.db.collection(collection).doc(id)
      await document.delete()
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll(collection) {
    try {
      await this.db.collection(collection).delete();
    } catch (error) {
      console.log(error);
    }
  }

  async updateById(collection, id, newData) {
    try {
      const document = this.db.collection(collection).doc(id)
      await document.update(newData)
    } catch (error) {
      console.log(error);
    }
  }
}

export { Firebase };