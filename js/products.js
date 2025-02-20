const API_URL = "https://v2.api.noroff.dev/rainy-days";
let allProducts = [];

async function fetchProducts() {
  try {
    const response = await fetch(`${API_URL}`);
    if (!response.ok) throw new Error("Failed to fetch products");

    const data = await response.json();
    allProducts = data.data;

    displayProducts(allProducts);

    document.querySelectorAll(".filter-btn").forEach((button) => {
      button.addEventListener("click", () =>
        filterProducts(button.dataset.filter)
      );
    });
  } catch (error) {
    console.error("Error loading products:", error);
    document.getElementById("product-list").innerHTML =
      "<p>Failed to load products. Please try again later.</p>";
  } finally {
    hideLoading();
  }
}

function displayProducts(products) {
  const productContainer = document.getElementById("product-list");
  productContainer.innerHTML = "";

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product-preview");

    productElement.innerHTML = `
            <a href="products/index.html?id=${product.id}" class="product-link">
                <div class="cta-sale">${
                  product.onSale ? "<p>Sale</p>" : ""
                }</div>
                <img src="${product.image.url}" alt="${
      product.image.alt
    }" class="product-image">
                <div class="product-preview-price">
                    <h2>${product.title}</h2>
                    <p>
                        ${
                          product.onSale
                            ? `<span class="discounted-price">$&nbsp;${product.discountedPrice.toFixed(
                                2
                              )}</span>`
                            : `<span>$&nbsp;${product.price.toFixed(2)}</span>`
                        }
                    </p>
                </div>
            </a>
        `;

    productContainer.appendChild(productElement);
  });
}

function filterProducts(filter) {
  let filteredProducts = [];

  if (filter === "all") {
    filteredProducts = allProducts;
  } else if (filter === "onSale") {
    filteredProducts = allProducts.filter((product) => product.onSale);
  } else {
    filteredProducts = allProducts.filter(
      (product) => product.gender === filter
    );
  }

  displayProducts(filteredProducts);
}

document.addEventListener("DOMContentLoaded", fetchProducts);
