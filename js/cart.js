document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("cart-total-price");
  const checkoutButton = document.querySelector(".cart-checkout-cta"); // Select checkout button container
  const cartTotalContainer = document.querySelector(".cart-total"); // Select order total container

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartContainer.innerHTML = ""; // Clear previous content

  if (cart.length === 0) {
    cartContainer.innerHTML = `
            <div class="cart-empty-container">
                <h1>Your cart is empty</h1>
                <div class="cart-empty-button">
                    <a href="./products.html">
                        <button class="cta-button">Browse Products</button>
                    </a>
                </div>
            </div>
        `;
    totalPriceElement.innerText = "$0.00";

    // Hide checkout button & total when cart is empty
    checkoutButton.style.display = "none";
    cartTotalContainer.style.display = "none";
    return;
  }

  // Show checkout button & total when items exist
  checkoutButton.style.display = "block";
  cartTotalContainer.style.display = "flex";

  let total = 0;
  cart.forEach((product, index) => {
    total += product.price * product.quantity;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item-container");

    cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="cart-item-aligner">
                <div class="cart-item-nametrash">
                    <div class="cart-item-name">
                        <h2>${product.title}</h2>
                    </div>
                    <div class="cart-item-trash">
                        <button class="remove-item" data-index="${index}">
                            <img src="./images/trash.png" alt="Remove Item">
                        </button>
                    </div>
                </div>
                <div class="cart-item-price">
                    <p>$${(product.price * product.quantity).toFixed(2)}</p>
                    <small>Quantity: ${product.quantity}</small>
                </div>
            </div>
        `;

    cartContainer.appendChild(cartItem);
  });

  totalPriceElement.innerText = `$${total.toFixed(2)}`;

  document.querySelectorAll(".remove-item").forEach((button) => {
    button.addEventListener("click", removeItemFromCart);
  });
});

// 🗑️ Remove Item Function
function removeItemFromCart(event) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const itemIndex = event.target.closest(".remove-item").dataset.index;

  cart.splice(itemIndex, 1);
  localStorage.setItem("cart", JSON.stringify(cart));

  window.location.reload(); // Refresh cart display
}
