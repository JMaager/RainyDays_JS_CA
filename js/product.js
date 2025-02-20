const API_URL = "https://v2.api.noroff.dev/rainy-days";

function getProductId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get("id");
}

async function fetchProduct() {
  showLoading();
  const productId = getProductId();
  if (!productId) {
    document.getElementById("product-page-container").innerHTML =
      "<p>Product not found.</p>";
    return;
  }
  try {
    const response = await fetch(`${API_URL}/${productId}`);
    if (!response.ok) throw new Error("Failed to fetch product");

    const data = await response.json();
    const product = data.data;

    document.getElementById("product-image").src = product.image.url;
    document.getElementById("product-image").alt = product.image.alt;
    document.getElementById("product-title").innerText = product.title;
    document.getElementById("product-description").innerText =
      product.description;
    document.getElementById("product-price").innerHTML = ` 
            $${
              product.onSale
                ? `<span class="discounted-price">${product.discountedPrice.toFixed(
                    2
                  )}</span>`
                : `<span>${product.price.toFixed(2)}</span>`
            }
            ${
              product.onSale
                ? `<span class="old-price">$${product.price.toFixed(2)}</span>`
                : ""
            }
        `;

    const sizeContainer = document.getElementById("size-options");
    sizeContainer.innerHTML = "";
    product.sizes.forEach((size) => {
      const sizeOption = document.createElement("input");
      sizeOption.type = "radio";
      sizeOption.id = `size-${size}`;
      sizeOption.name = "size";
      sizeOption.value = size;

      const sizeLabel = document.createElement("label");
      sizeLabel.htmlFor = `size-${size}`;
      sizeLabel.innerText = size;

      sizeContainer.appendChild(sizeOption);
      sizeContainer.appendChild(sizeLabel);
    });

    document
      .getElementById("add-to-cart")
      .addEventListener("click", () => addToCart(product));
  } catch (error) {
    console.error("Error loading product:", error);
    document.getElementById("product-page-container").innerHTML =
      "<p>Failed to load product. Please try again later.</p>";
  } finally {
    hideLoading();
  }
}

function addToCart(product) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let selectedSize = document.querySelector(`input[name="size"]:checked`);
  if (!selectedSize) {
    alert("Please select a size before adding to cart!");
    return;
  }
  selectedSize = selectedSize.value;

  let existingProduct = cart.find(
    (item) => item.id === product.id && item.size === selectedSize
  );

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image.url,
      size: selectedSize,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`Added ${product.title} (Size: ${selectedSize}) to cart! 🛒`);
}

document.addEventListener("DOMContentLoaded", fetchProduct);
