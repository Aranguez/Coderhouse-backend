import { ContainerFileSystem } from "../Containers/index.js";
import { config } from "../config/index.js";

const ProductDao = new ContainerFileSystem(
  config.DATABASES.filesystem.PRODUCTS_FILENAME
);
const CartDao = new ContainerFileSystem(
  config.DATABASES.filesystem.CARTS_FILENAME
);

export { ProductDao, CartDao };