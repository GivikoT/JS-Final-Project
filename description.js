// ---------------------------------Imports---------------------------------

import { startLoading, stopLoading } from "./index.js";
import { burgerMenuEvents } from "./index.js";
import { elements } from "./index.js";

// ---------------------------------Fetch API Function---------------------------------
async function APIfetch() {
  try {
    const urlId = new URLSearchParams(window.location.search).get("id");
    const response = await fetch(`https://dummyjson.com/products/${urlId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    document.body.innerHTML = "";
    document.body.appendChild(elements.errorMessage);
    document.body.appendChild(elements.header);
    elements.errorMessage.classList.add("display");
  }
}

// ---------------------------------Page Rendering---------------------------------

async function pageRender() {
  // ---------------------------------Loader---------------------------------
  startLoading();
  // ---------------------------------Data Display---------------------------
  const product = await APIfetch();
  document.title = `${product.brand} - ${product.title}`;
  elements.productName.textContent = product.title;
  elements.productPrice.textContent = `$${product.price}`;
  elements.productCategory.textContent = product.category;
  elements.productDescription.textContent = product.description;
  elements.productBrand.textContent = product.brand;
  elements.productStock.value = product.stock;
  elements.productRating.textContent = `⭐ ${product.rating} ⭐`;
  elements.mainImg.src = product.thumbnail;
  for (let i = 0; i < elements.smallImg.length; i++) {
    elements.smallImg[i].src = product.images[i];
    elements.smallImg[i].onclick = function () {
      elements.mainImg.src = product.images[i];
    };
  }
  // ---------------------------------Stop Loader-----------------------------
  stopLoading();
}

// ---------------------------------DOM Execution---------------------------------
document.addEventListener("DOMContentLoaded", pageRender);
document.addEventListener("DOMContentLoaded", burgerMenuEvents);
