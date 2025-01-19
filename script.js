document.addEventListener("DOMContentLoaded", function () {
  const productList = document.getElementById("product-list");
  const cartItems = document.getElementById("cart-items");
  const emptyCartMessage = document.getElementById("empty-cart");
  const cartTotal = document.getElementById("cart-total");
  const totalPrice = document.getElementById("total-price");
  const checkoutBtn = document.getElementById("checkout-btn");

  const products = [
    { id: 1, name: "Product 1", price: 19.99 },
    { id: 2, name: "Product 2", price: 29.99 },
    { id: 3, name: "Product 3", price: 39.99 },
  ];

  //Create an empty cart Array for storing Items inside the cart
  const cart = [];

  //Crete a variable for storing the total Price of the Items inside the Cart
  let totalCartPrice = 0;

  /**
   * Adds a product to the product list in the DOM
   * @param {Object} product - An object representing the product with id, name, and price properties
   */
  function addProduct(product) {
    // Create a new div element to represent the product
    const element = document.createElement("div");

    // Set the inner HTML of the element with the product name and price, and add a button to add to cart
    element.innerHTML = `<span>${product.name} - $${product.price}</span> <button data-id="${product.id}">Add to Cart</button>`;

    // Set a data attribute with the product id for future reference
    element.setAttribute("data-id", `${product.id}`);

    // Add a CSS class to style the product element
    element.classList.add("product");

    // Append the newly created product element to the product list in the DOM
    productList.append(element);
  }
  //This will add all the products from productList Array in the DOM
  products.forEach((product) => {
    addProduct(product);
  });

  /* This code snippet is selecting all the buttons inside the product list in the DOM and adding a
  click event listener to each button. When a button is clicked, it retrieves the product id from
  the clicked button's attributes, finds the corresponding product object from the `products` array
  based on the id, adds that product to the `cart` array, and then calls the `renderCartItem`
  function to display the added product in the cart section on the webpage. */
  const allButtons = document.querySelectorAll("#product-list .product button");

  allButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const productId = e.target.attributes[0].value;
      const product = products.find((p) => p.id === parseInt(productId));
      cart.push(product);
      renderCartItem(product);
    });
  });

  /**
   * Renders a single product in the cart section of the webpage.
   * If the cart is not empty, it adds the product to the cart list and updates the total price.
   * If the cart is empty, it shows the empty cart message and hides the cart total section.
   * @param {Object} product - An object representing the product with id, name, and price properties
   */
  function renderCartItem(product) {
    // If the cart is empty, show empty cart message and hide cart total section
    if (cart.length === 0) {
      emptyCartMessage.classList.remove("hidden");
      cartTotal.classList.add("hidden");
    } else {
      // If the cart is not empty, add the product to the cart list and update the total price
      emptyCartMessage.classList.add("hidden");
      cartTotal.classList.remove("hidden");

      // Create a new div element to represent the product in the cart
      const element = document.createElement("div");

      // Set the inner HTML of the element with the product name and price
      element.innerHTML = `<span>${product.name} - $${product.price}</span> `;

      // Set a CSS class to style the product element in the cart
      element.classList.add("product");

      // Add the new element to the cart list
      cartItems.appendChild(element);

      // Update the total price
      totalCartPrice += product.price;
      totalPrice.innerText = `$${totalCartPrice.toFixed()}`;
    }
  }

  // The `checkoutBtn.addEventListener("click", () => { ... });` code snippet is adding a click event
  // listener to the checkout button on the webpage. When the checkout button is clicked, the following
  // actions are performed:
  //
  // * Total Price will be reset to 0
  // * carTotal Section will be hided
  // * cartItems Section with all the divs in  which product details are there will be removed
  // * we are removing the emptyCartMessage hidden class from it so that it can be visible
  //
  checkoutBtn.addEventListener("click", () => {
    totalPrice.innerText = `0`;
    cartTotal.classList.add("hidden");
    cartItems.querySelectorAll(".product").forEach((div) => div.remove());
    emptyCartMessage.classList.remove("hidden");
    alert("Checked out Successfully");
  });
});
