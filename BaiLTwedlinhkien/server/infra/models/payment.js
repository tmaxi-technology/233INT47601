var pays;
var code;
var description;
var display;

function Payment({ pays,code, description, display }) {
  this.pays = pays;
  this.code = code;
  this.description = description;
  this.display = display;
}

module.exports = Payment;
