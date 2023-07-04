const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 15 },
  { id: 3, name: "Product 3", price: 20 },
];

const cart = [];

// Function to add a product to the cart
function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (product) {
    const existingCartItem = cart.find((item) => item.id === productId);
    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    updateCart();
  }
}

// Function to remove a product from the cart
function removeFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
    updateCart();
  }
}

// Function to update the displayed cart
function updateCart() {
  const cartContainer = document.getElementById("shopping-cart");
  const cartTotalContainer = document.getElementById("cart-total");
  cartContainer.innerHTML = "";
  cartTotalContainer.textContent = "";

  let total = 0;

  for (const item of cart) {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";

    const itemName = document.createElement("span");
    itemName.textContent = item.name;

    const itemQuantity = document.createElement("span");
    itemQuantity.textContent = `Quantity: ${item.quantity}`;

    const itemPrice = document.createElement("span");
    const totalPrice = item.price * item.quantity;
    itemPrice.textContent = `Price: $${totalPrice.toFixed(2)}`;

    const removeButton = document.createElement("button");
    removeButton.className = "btn btn-sm btn-danger";
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => removeFromCart(item.id));

    itemElement.appendChild(itemName);
    itemElement.appendChild(document.createTextNode(" - "));
    itemElement.appendChild(itemQuantity);
    itemElement.appendChild(document.createTextNode(" - "));
    itemElement.appendChild(itemPrice);
    itemElement.appendChild(document.createTextNode(" "));
    itemElement.appendChild(removeButton);

    cartContainer.appendChild(itemElement);

    total += totalPrice;
  }

  cartTotalContainer.textContent = `Total Amount: $${total.toFixed(2)}`;
}

// Function to clear the cart
function clearCart() {
  cart.length = 0;
  updateCart();
}

// Function to create the product list
function createProductList() {
  const productListContainer = document.getElementById("product-list");

  for (const product of products) {
    const productElement = document.createElement("div");
    productElement.className = "product-item";

    const productName = document.createElement("span");
    productName.textContent = product.name;

    const productPrice = document.createElement("span");
    productPrice.textContent = `$${product.price}`;

    const addButton = document.createElement("button");
    addButton.className = "btn btn-sm btn-primary";
    addButton.textContent = "Add to Cart";
    addButton.addEventListener("click", () => addToCart(product.id));

    productElement.appendChild(productName);
    productElement.appendChild(document.createTextNode(" - "));
    productElement.appendChild(productPrice);
    productElement.appendChild(document.createTextNode(" "));
    productElement.appendChild(addButton);

    productListContainer.appendChild(productElement);
  }
}

// Event listener for clear cart button
const clearCartButton = document.getElementById("clear-cart");
clearCartButton.addEventListener("click", clearCart);

// Initialize the product list
// createProductList();
