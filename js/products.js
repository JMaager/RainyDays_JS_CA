const API_URL = "https://v2.api.noroff.dev/rainy-days";

async function fetchProducts() {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) throw new Error("Failed to fetch products");

    const data = await response.json();
    const products = data.data;

    const productContainer = document.getElementById("product-list");

    productContainer.innerHTML = "";

    products.forEach((product) => {
      const productElement = document.createElement("div");
      productElement.classList.add("product-item");

      productElement.innerHTML = `
                <a href="products/index.html?id=${product.id}">
                    <img src="${product.image.url}" alt="${product.image.alt}">
                    <h2>${product.title}</h2>
                    <p>${product.description}</p>
                    <p><strong>Price:</strong> $${
                      product.onSale
                        ? product.discountedPrice.toFixed(2)
                        : product.price.toFixed(2)
                    }</p>
                    ${
                      product.onSale ? `<p class="sale-badge">On Sale!</p>` : ""
                    }
                </a>
            `;

      productContainer.appendChild(productElement);
    });
  } catch (error) {
    console.error("Error loading products:", error);
    document.getElementById("product-list").innerHTML =
      "<p>Failed to load products. Please try again later.</p>";
  }
}

document.addEventListener("DOMContentLoaded", fetchProducts);
