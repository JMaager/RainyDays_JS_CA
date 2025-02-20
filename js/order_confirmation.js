document.addEventListener("DOMContentLoaded", function () {
  showLoading();
  const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));

  if (!orderDetails || !orderDetails.items || orderDetails.items.length === 0) {
    document.getElementById("order-summary").innerHTML =
      "<p>No order found.</p>";
    hideLoading();
    return;
  }

  let total = 0;
  let summaryHTML = "";

  orderDetails.items.forEach((product) => {
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

  document.getElementById("order-summary").innerHTML = summaryHTML;
  document.getElementById("order-total-price").innerText = `$${total.toFixed(
    2
  )}`;

  localStorage.removeItem("orderDetails");

  hideLoading();
});
