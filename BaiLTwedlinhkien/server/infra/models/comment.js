var product_id;
var name_cus;
var email;
var content;
var display;
var rating;

function Comment({product_id, name_cus, email, content, display, rating}) {
    this.product_id = product_id;
    this.name_cus = name_cus;
    this.email = email;
    this.content = content;
    this.display = display;
    this.rating = rating;
}

module.exports = Comment;