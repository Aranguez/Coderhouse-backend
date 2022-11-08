import Container from "../container/index.js";

const mysql_db_options = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'test_coder'
  }
}

const sqlite3_db_options = {
  client: 'sqlite3',
  connection: { filename: 'src/db/mydb.sqlite3' },
  useNullAsDefault: true,
}

const createProductsTable = async (table) => {
  table.increments('id')
  table.string('title')
  table.string('description')
  table.string('price')
  table.string('thumbnail')
  table.string('stock')
}

const createChatTable = async (table) => {
  table.increments('id')
  table.string('author')
  table.string('message')
  table.timestamps(true, true)
}

export const ProductDao = new Container(mysql_db_options, 'products', createProductsTable);
export const ChatDao = new Container(sqlite3_db_options, 'chat', createChatTable);