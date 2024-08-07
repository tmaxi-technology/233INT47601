var name = null;
var phone = null;
var email = null;
var image = null;
var quantity = null;
var slug = null;

function Provider({ name, phone, email, image, quantity, slug }) {
  this.name = name;
  this.phone = phone; 
  this.email = email;
  this.image = image;
  this.quantity = quantity;
  this.slug = slug;
}

module.exports = Provider;
