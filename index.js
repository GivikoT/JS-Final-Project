// ---------------------------------Encapsulation---------------------------------
const elements = {
  productsContainer: document.getElementById("container"),
  paginationPrev: document.getElementById("prev"),
  paginationNext: document.getElementById("next"),
  pageNumbers: document.getElementById("page-numbers"),
  paginationNumbers: document.querySelectorAll(".page-number"),
  errorMessage: document.getElementById("errorMessage"),
  likedProducts: JSON.parse(localStorage.getItem("likedProducts")) || [],
  signInButton: document.querySelector(".user"),
  modal: document.querySelector("#signin-modal"),
  closeButton: document.querySelector(".close"),
  header: document.getElementById("header"),
  mainImg: document.getElementById("MainImg"),
  smallImg: document.querySelectorAll(".small-img"),
  productCategory: document.getElementById("category"),
  productName: document.getElementById("title"),
  productPrice: document.querySelector(".price"),
  productDescription: document.querySelector(".description"),
  productBrand: document.querySelector(".brand"),
  productStock: document.getElementById("stock"),
  productRating: document.querySelector(".rating"),
  menu: document.querySelector("#menu-icon"),
  navbar: document.querySelector(".navbar"),
  loader: document.getElementById("loading"),
};

const functions = {
  elementCreation(
    element,
    parent,
    attribute = null,
    name = null,
    display = null
  ) {
    let el = document.createElement(element);
    parent.appendChild(el);
    if (attribute && name) {
      el.setAttribute(attribute, name);
    }
    if (display) {
      el.textContent = display;
    }
    return el;
  },

  async fetchAPI() {
    try {
      if (pagination.fetchResult) return; // ორჯერ თუ დააჭერდი page-ს ან პაგინაციის ნებიმისერ ღილაკებს 12-ის ნაცვლად 24 მოქონდა და ამიტომ გამოვიყენე ასე
      pagination.fetchResult = true;
      const response = await fetch(
        `https://dummyjson.com/products?limit=${pagination.limit}&skip=${pagination.skip}`
      );
      pagination.fetchResult = false;
      const data = await response.json();
      const product = data.products;

      pagination.total = data.total;

      return product;
    } catch (error) {
      elements.errorMessage.classList.add("display");
      pagination.fetchResult = false;
    }
  },

  startLoading() {
    elements.loader.classList.add("display");
  },

  stopLoading() {
    elements.loader.classList.remove("display");
  },
};

const pagination = {
  limit: 12,
  skip: 0,
  total: 0,
  fetchResult: false,
};

const eventListeners = {
  init: function () {
    this.paginationEvents();
    this.loginEvents();
    this.burgerMenuEvents();
  },
  paginationEvents: function () {
    elements.paginationPrev.addEventListener("click", () => {
      if (pagination.skip > 0) {
        pagination.skip -= pagination.limit;
        window.scrollTo(0, 0);
        rendering();
      }
    });

    elements.paginationNext.addEventListener("click", () => {
      if (pagination.skip + pagination.limit < pagination.total) {
        pagination.skip += pagination.limit;
        window.scrollTo(0, 0);
        rendering();
      }
    });
  },

  loginEvents: function () {
    elements.signInButton.addEventListener("click", () => {
      elements.modal.style.display = "block";
    });

    elements.closeButton.addEventListener("click", () => {
      elements.modal.style.display = "none";
    });
  },
  burgerMenuEvents: function () {
    elements.menu.onclick = () => {
      elements.menu.classList.toggle("bx-x");
      elements.navbar.classList.toggle("open");
    };
  },
};

// ---------------------------------Rendering API along with Pagination---------------------------------
async function rendering() {
  functions.startLoading();
  elements.productsContainer.innerHTML = "";

  const products = await functions.fetchAPI();
  // -----------------taking data from API-----------------
  products.forEach((product) => {
    let productElement = functions.elementCreation(
      "div",
      elements.productsContainer,
      "class",
      "box"
    );

    let img = functions.elementCreation("img", productElement);
    img.src = product.thumbnail;

    let textDiv = functions.elementCreation(
      "div",
      productElement,
      "class",
      "text"
    );
    functions.elementCreation("h3", textDiv, null, null, product.title);
    functions.elementCreation("p", textDiv, null, null, product.description);

    functions.elementCreation(
      "h2",
      textDiv,
      "class",
      "price",
      `$${product.price}`
    );
    let details = functions.elementCreation(
      "a",
      productElement,
      "class",
      "button",
      "See More"
    );
    details.href = `description.html?id=${product.id}`;
    // -----------------Like Button(Adding to localStorage)-----------------
    let likeBtn = functions.elementCreation(
      "a",
      productElement,
      "class",
      "like-button"
    );
    likeBtn.innerHTML = '<i class="fa-solid fa-heart"></i>';
    if (elements.likedProducts.includes(product.id)) {
      likeBtn.classList.add("liked");
      likeBtn.firstElementChild.classList.add("liked");
    }

    likeBtn.addEventListener("click", () => {
      if (elements.likedProducts.includes(product.id)) {
        elements.likedProducts = elements.likedProducts.filter(
          (id) => id !== product.id
        );
      } else {
        elements.likedProducts.push(product.id);
      }
      localStorage.setItem(
        "likedProducts",
        JSON.stringify(elements.likedProducts)
      );
      likeBtn.classList.toggle("liked");
      likeBtn.firstElementChild.classList.toggle("liked");
    });
  });
  // -----------------Creating Pagination with page numbers-----------------

  elements.pageNumbers.innerHTML = "";
  const totalPages = Math.ceil(pagination.total / pagination.limit);
  for (let i = 0; i < totalPages; i++) {
    const pageButton = document.createElement("li");
    pageButton.innerHTML = i + 1;
    if (pagination.skip === i * pagination.limit) {
      pageButton.classList.add("active");
    }
    pageButton.addEventListener("click", () => {
      pagination.skip = i * pagination.limit;
      window.scrollTo(0, 0);
      rendering();
    });
    elements.pageNumbers.appendChild(pageButton);
  }

  functions.stopLoading();
}

// ---------------------------------Default Exporting Function for other Pages---------------------------------

// ---------------------------------DOM Execution---------------------------------

document.addEventListener("DOMContentLoaded", rendering);
document.addEventListener("DOMContentLoaded", () => {
  eventListeners.init();
});

// ---------------------------------Export---------------------------------
export { elements };
export const { startLoading, stopLoading } = functions;

export const { burgerMenuEvents } = eventListeners;
