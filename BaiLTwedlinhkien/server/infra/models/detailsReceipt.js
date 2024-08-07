var receipt_id;
var product_id;
var quantity;
var price;
var total;

function DetailsReceipt({ receipt_id, product_id, quantity, price, total }) {
  this.receipt_id = receipt_id;
  this.product_id = product_id;
  this.quantity = quantity;
  this.price = price;
  this.total = total;
}

module.exports = DetailsReceipt;
