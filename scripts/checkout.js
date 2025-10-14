import { products } from "../data/products.js"
import { formatCurrency } from "./utils/money.js";


hello()
let cartItems = [];
if (localStorage.getItem('cart')) {
  cartItems = JSON.parse(localStorage.getItem('cart'))
} else {
    cartItems = [{
        id : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity  : 2
    },
    {
        id : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity  : 1
    }
    ]
}
generateCart(cartItems)


function generateCart(cartData) {
  let checkOutHtml = "";
  if (cartData && cartData.length > 0) {
    cartData.forEach((item) => {
      console.log(item)
        const matching = products.find(product => product.id === item.id)
        // console.log(matching)
        if (matching) {
            checkOutHtml += `
            <div class="cart-item-container">
                <div class="delivery-date">
                  Delivery date: Tuesday, June 21
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matching.image}">

                  <div class="cart-item-details">
                    <div class="product-name">
                      ${matching.name}
                    </div>
                    <div class="product-price">
                      $${formatCurrency(matching.priceCents)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label">${item.quantity}</span>
                      </span>
                      <span class="update-quantity-link link-primary">
                        Update
                      </span>
                      <span class="delete-quantity-link link-primary" data-product-id="${item.id}">
                        Delete
                      </span>
                    </div>
                  </div>

                  <div class="delivery-options">
                    <div class="delivery-options-title">
                      Choose a delivery option:
                    </div>
                    <div class="delivery-option">
                      <input type="radio" checked
                        class="delivery-option-input"
                        name="delivery-option-1">
                      <div>
                        <div class="delivery-option-date">
                          Tuesday, June 21
                        </div>
                        <div class="delivery-option-price">
                          FREE Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-1">
                      <div>
                        <div class="delivery-option-date">
                          Wednesday, June 15
                        </div>
                        <div class="delivery-option-price">
                          $4.99 - Shipping
                        </div>
                      </div>
                    </div>
                    <div class="delivery-option">
                      <input type="radio"
                        class="delivery-option-input"
                        name="delivery-option-1">
                      <div>
                        <div class="delivery-option-date">
                          Monday, June 13
                        </div>
                        <div class="delivery-option-price">
                          $9.99 - Shipping
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `
        }
    })
    document.getElementById("js-order-summary").innerHTML = checkOutHtml
    deleteEventListener()
  } else {
        checkOutHtml += `
        <div class="cart-item-container">
          <p>no item selected or all item has been deleted</p>
        </div>
        `
      document.getElementById("js-order-summary").innerHTML = checkOutHtml
      }
      
}


function deleteEventListener(){
  document.querySelectorAll('.delete-quantity-link').forEach(element => {
    element.addEventListener('click',()=> {
      // console.log(element.dataset.productId)
      const productId = element.dataset.productId
      delItem(productId)
    })
  })
}

function delItem(productId) {
  console.log(productId)
  cartItems = cartItems.filter(item => item.id !== productId);
  localStorage.setItem('cart',JSON.stringify(cartItems))
  generateCart(cartItems)
}

