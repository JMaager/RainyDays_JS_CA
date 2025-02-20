document.addEventListener("DOMContentLoaded", function () {
  const loadingElement = document.createElement("div");
  loadingElement.id = "loading";
  loadingElement.classList.add("loading");
  loadingElement.innerText = "Loading...";
  document.body.appendChild(loadingElement);

  const errorMessage = document.createElement("div");
  errorMessage.id = "error-message";
  errorMessage.classList.add("error-message");
  errorMessage.style.display = "none";
  document.body.appendChild(errorMessage);
});

function showLoading() {
  document.getElementById("loading").style.display = "block";
  document.getElementById("error-message").style.display = "none";
}

function hideLoading() {
  document.getElementById("loading").style.display = "none";
}

function showError(message) {
  const errorElement = document.getElementById("error-message");
  errorElement.innerText = message;
  errorElement.style.display = "block";
}
