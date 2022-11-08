const productsTable = document.getElementById('products-table');
// const cartTable = document.getElementById('cart-table');

const handleDeleteProduct = async (id) => {
  try {
    const options = { method: 'DELETE' };
    await fetch(`/api/products/${id}`, options)
  } catch (error) {
    console.error(error);
  }
}

const handleAddToCart = async (id) => {
  try {
    const options = { method: 'POST' };
    await fetch(`/api/cart/${id}`, options);
  } catch (error) {
    console.error(error);
  }
}

const renderTable = (elem, data) => {
  if (data && data.length) {
    elem.innerHTML = `
    <table>
      <thead>
        <tr>
          <th class="tg tg-0lax">Title</th>
          <th class="tg tg-0lax">Description</th>
          <th class="tg tg-0lax">Price</th>
          <th class="tg tg-0lax">Stock</th>
          <th class="tg tg-0lax">Thumbnail</th>
        </tr>
      </thead>
      <tbody id="table-body"></tbody>
    </table>`
  } else {
    elem.innerHTML = `<h5>No hay productos</h5>`;
    return;
  }

  const tableBody = document.getElementById('table-body');

  tableBody.innerHTML = data.map(item => `
    <tr>
      <td class="tg tg-0lax">${item.title}</td>
      <td class="tg tg-0lax">${item.description}</td>
      <td class="tg tg-0lax">${item.price}</td>
      <td class="tg tg-0lax">${item.stock}</td>
      <td class="tg tg-0lax"><img src={${item.thumbnail}} alt="thumbnail" width="100"></td>

      <td class="tg tg-0lax">
        <button class="bg-red" onclick={handleDeleteProduct(${item.id})}>
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('')
}

const getProducts = () => {
  const options = { method: 'GET' };

  fetch('/api/products', options)
    .then(response => response.json())
    .then(({ products }) => {
      console.log(products);
      renderTable(productsTable, products);
    })
    .catch(err => console.error(err));
}

// const getCart = () => {
//   const options = { method: 'GET' };

//   fetch('/api/cart', options)
//     .then(response => response.json())
//     .then(({ cart }) => {
//       console.log('cart', cart.products);
//       renderTable(productsTable, cart.products);
//     })
//     .catch(err => console.error(err));
// }

getProducts();
// getCart();