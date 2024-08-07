var product_id;
var user_id;
var size_color;
var quantity;
var price;

function Cart({ product_id, user_id, size_color, quantity, price }) {
  this.product_id = product_id;
  this.user_id = user_id;
  this.size_color = size_color;
  this.quantity = quantity;
  this.price = price;
}

module.exports = Cart;
