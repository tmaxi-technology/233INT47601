var username;
var password;
var email;
var name;
var birth;
var gender;
var address;
var phone;
var role;
var image;

function User({
  username,
  password,
  email,
  name,
  birth,
  gender,
  address,
  phone,
  role,
  image,
}) {
  this.username = username;
  this.password = password;
  this.email = email;
  this.name = name;
  this.birth = birth;
  this.gender = gender;
  this.address = address;
  this.phone = phone;
  this.role = role;
  this.image = image;
}

module.exports = User;
