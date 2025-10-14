export const cartProduct = JSON.parse(localStorage.getItem('cart')) || [];


export function addToCart(productId) {
  let itemExist
  // console.log(productId)
  cartProduct.forEach( (cartItem) =>{
    if (productId === cartItem.id)
      itemExist = cartItem
  });
  if (itemExist) {
      itemExist.quantity += 1
  } else {
    cartProduct.push({
      id:productId,
      quantity:1
    })
  }
  localStorage.setItem('cart',JSON.stringify(cartProduct))
}


