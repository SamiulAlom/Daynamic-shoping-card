// Retrieve the necessary elements from the HTML
const productListContainer = document.getElementById("product-list");
const cartContainer = document.getElementById("shopping-cart");
const cartTotalElement = document.getElementById("cart-total");
const clearCartButton = document.getElementById("clear-cart");

// Initialize the cart array
let cartItems = [];

// Add event listeners to the "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
  button.addEventListener("click", addToCart);
});

// Function to add a product to the cart
function addToCart(event) {
  const productElement = event.target.closest(".product-item");
  const productName = productElement.querySelector(".product-name").textContent;
  const productPrice =
    productElement.querySelector(".product-price").textContent;

  const cartItem = {
    name: productName,
    price: parseFloat(productPrice.slice(1)), // Remove the "$" sign and convert to a number
    quantity: 1,
  };

  // Check if the item is already in the cart
  const existingItem = cartItems.find((item) => item.name === cartItem.name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cartItems.push(cartItem);
  }

  // Update the cart display
  displayCartItems();
  calculateTotal();
}

// Function to display the cart items
function displayCartItems() {
  // Clear the cart display
  cartContainer.innerHTML = "";

  // Display each cart item
  cartItems.forEach((item) => {
    const cartItemElement = document.createElement("div");
    cartItemElement.className = "cart-item";

    const itemName = document.createElement("span");
    itemName.textContent = item.name;

    const itemQuantity = document.createElement("span");
    itemQuantity.textContent = `Quantity: ${item.quantity}`;

    const itemPrice = document.createElement("span");
    itemPrice.textContent = `Price: $${item.price}`;

    cartItemElement.appendChild(itemName);
    cartItemElement.appendChild(document.createTextNode(" - "));
    cartItemElement.appendChild(itemQuantity);
    cartItemElement.appendChild(document.createTextNode(" - "));
    cartItemElement.appendChild(itemPrice);

    cartContainer.appendChild(cartItemElement);
  });
}

// Function to calculate the total amount
function calculateTotal() {
  let total = 0;

  cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });

  cartTotalElement.textContent = `Total: $${total}`;
}

// Event listener for the clear cart button
clearCartButton.addEventListener("click", clearCart);

// Function to clear the cart
function clearCart() {
  cartItems = [];
  cartContainer.innerHTML = "";
  cartTotalElement.textContent = "Total: $0";
}
