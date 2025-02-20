const API_URL = "https://v2.api.noroff.dev/rainy-days";
let featuredProducts = [];
let currentIndex = 0;

async function fetchFeaturedProducts() {
  showLoading();
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch products");

    const data = await response.json();
    const products = data.data;

    let saleProducts = products.filter((product) => product.onSale);
    featuredProducts = saleProducts.slice(0, 3);

    displayFeaturedProducts();
  } catch (error) {
    console.error("Error loading featured products:", error);
    showError("Could not load featured products. Please try again.");
  } finally {
    hideLoading();
  }
}
document.addEventListener("DOMContentLoaded", fetchFeaturedProducts);

function displayFeaturedProducts() {
  const featuredContainer = document.getElementById("featured-container");
  const indicatorsContainer = document.getElementById("carousel-indicators");

  featuredContainer.innerHTML = "";
  indicatorsContainer.innerHTML = "";

  featuredProducts.forEach((product, index) => {
    const productElement = document.createElement("div");
    productElement.classList.add("product-preview");
    if (index === 0) productElement.classList.add("active");

    productElement.innerHTML = `
            <a href="products/index.html?id=${product.id}" class="product-link">
                <div class="cta-sale">SALE</div>
                <img src="${product.image.url}" alt="${
      product.image.alt
    }" class="product-image">
                <div class="product-preview-price">
                    <h3>${product.title}</h3>
                    <p>
                        <span class="old-price"><del>$${product.price.toFixed(
                          2
                        )}</del></span>&nbsp;
                        <span class="discounted-price">$${product.discountedPrice.toFixed(
                          2
                        )}</span>
                    </p>
                </div>
            </a>
        `;

    featuredContainer.appendChild(productElement);

    const indicatorDot = document.createElement("span");
    indicatorDot.classList.add("indicator-dot");
    if (index === 0) indicatorDot.classList.add("active");

    indicatorDot.addEventListener("click", () => goToSlide(index));
    indicatorsContainer.appendChild(indicatorDot);
  });
}

function updateCarousel() {
  const slides = document.querySelectorAll(".product-preview");
  const indicators = document.querySelectorAll(".indicator-dot");

  slides.forEach((slide, index) => {
    slide.classList.toggle("active", index === currentIndex);
    indicators[index].classList.toggle("active", index === currentIndex);
  });
}

document.getElementById("prev-btn").addEventListener("click", () => {
  currentIndex =
    (currentIndex - 1 + featuredProducts.length) % featuredProducts.length;
  updateCarousel();
});

document.getElementById("next-btn").addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % featuredProducts.length;
  updateCarousel();
});

function goToSlide(index) {
  currentIndex = index;
  updateCarousel();
}

document.addEventListener("DOMContentLoaded", fetchFeaturedProducts);
