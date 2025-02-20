document.addEventListener("DOMContentLoaded", function () {
  showLoading();
  loadCart();

  document
    .getElementById("cart-items")
    .addEventListener("click", function (event) {
      const button = event.target.closest(".remove-item");
      if (button) {
        removeItemFromCart(button.dataset.index);
      }
    });
});

function loadCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("cart-total-price");
  const checkoutButton = document.querySelector(".cart-checkout-cta");
  const cartTotalContainer = document.querySelector(".cart-total");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartContainer.innerHTML = "";

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

    checkoutButton.style.display = "none";
    cartTotalContainer.style.display = "none";

    hideLoading();
    return;
  }

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
                  <p> Size: ${product.size}</p>
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
                      <small>x${product.quantity}</small>
                  </div>
              </div>
          `;

    cartContainer.appendChild(cartItem);
  });

  totalPriceElement.innerText = `$${total.toFixed(2)}`;
  hideLoading();
}

function removeItemFromCart(itemIndex) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const confirmDelete = confirm("Are you sure you want to remove this item?");
  if (confirmDelete) {
    cart.splice(itemIndex, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
  }
}
