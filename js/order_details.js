document.addEventListener("DOMContentLoaded", function () {
  showLoading();
  loadOrderSummary();

  function loadOrderSummary() {
    const orderSummaryContainer = document.getElementById("order-summary");
    const orderTotalPrice = document.getElementById("order-total-price");
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    orderSummaryContainer.innerHTML = "";

    if (cart.length === 0) {
      orderSummaryContainer.innerHTML = "<p>Your cart is empty.</p>";
      orderTotalPrice.innerText = "$0.00";
      return;
    }

    let total = 0;
    let summaryHTML = "";

    cart.forEach((product) => {
      total += product.price * product.quantity;

      summaryHTML += `
            <div class="order-summary-item">
                <img src="${product.image}" alt="${
        product.title
      }" class="order-item-image">
                <div class="order-item-details">
                    <h3>${product.title} (Size: ${product.size})</h3>
                    <p>Price: $${product.price.toFixed(2)} x ${
        product.quantity
      }</p>
                </div>
            </div>
        `;
    });

    orderSummaryContainer.innerHTML = summaryHTML;
    orderTotalPrice.innerText = `$${total.toFixed(2)}`;

    hideLoading();
  }

  document
    .querySelector(".cta-button")
    .addEventListener("click", function (event) {
      event.preventDefault();

      const fullName = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const address = document.getElementById("address").value.trim();
      const country = document.getElementById("country").value.trim();
      const postal = document.getElementById("postal").value.trim();
      const city = document.getElementById("city").value.trim();
      const cardNumber = document.getElementById("card-number").value.trim();
      const expiryDate = document.getElementById("expiry-date").value.trim();
      const cvc = document.getElementById("cvc").value.trim();

      if (
        fullName === "" ||
        email === "" ||
        address === "" ||
        country === "" ||
        postal === "" ||
        city === "" ||
        cardNumber === "" ||
        expiryDate === "" ||
        cvc === ""
      ) {
        alert("Please fill out all required fields.");
        return;
      }

      showLoading();

      const orderDetails = {
        fullName,
        email,
        address,
        country,
        postal,
        city,
        cardNumber: "****-****-****-****",
        expiryDate,
        cvc: "***",
        items: JSON.parse(localStorage.getItem("cart")) || [],
        total: document.getElementById("order-total-price").innerText,
      };
      localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
      localStorage.removeItem("cart");

      setTimeout(() => {
        hideLoading();
        window.location.href = "./order_confirmation.html";
      }, 500);
    });
});
