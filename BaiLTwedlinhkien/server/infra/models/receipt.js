var id;
var user_id;
var payments_id;
var address;
var order_date;
var delivery_date;
var note;
var status;
var payments_status;
var amount;
var phone;
var address;
var email;
function Receipt({
  id,
  user_id,
  payments_id,
  address,
  order_date,
  delivery_date,
  note,
  status,
  payments_status,
  amount,
  phone,
  email,
}) {
  this.id = id;
  this.user_id = user_id;
  this.payments_id = payments_id;
  this.address = address;
  this.order_date = order_date;
  this.delivery_date = delivery_date;
  this.note = note;
  this.status = status;
  this.payments_status = payments_status;
  this.amount = amount;
  this.phone = phone;
  this.email = email;
}

module.exports = Receipt;
