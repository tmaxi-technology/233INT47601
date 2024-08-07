var name;
var image;
var slug;
var category_id

function ProductType({ name, image, slug, category_id }) {
  this.name = name;
  this.image = image;
  this.slug = slug;
  this.category_id = category_id
}

module.exports = ProductType;
