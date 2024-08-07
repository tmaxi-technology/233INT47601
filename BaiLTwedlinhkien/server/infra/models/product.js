var code;
var name;
var description;
var price;
var amount;
var quantity;
var image;
var status;
var bestseller;
var display;
var slug;
var product_type_id;
var coupon_id;
var category_id;
var provider_id;

function Product({
  code,
  name,
  description,
  price,
  amount,
  quantity,
  image,
  status,
  bestseller,
  display,
  slug,
  product_type_id,
  coupon_id,
  category_id,
  provider_id,
}) {
  this.code = code;
  this.name = name;
  this.description = description;
  this.price = price;
  this.amount = amount;
  this.quantity = quantity;
  this.image = image;
  this.status = status;
  this.bestseller = bestseller;
  this.display = display;
  this.slug = slug;
  this.product_type_id = product_type_id;
  this.coupon_id = coupon_id;
  this.category_id = category_id;
  this.provider_id = provider_id;
}

module.exports = Product;
