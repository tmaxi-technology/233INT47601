module.exports = {
  formatPhone: function (phone) {
    if (!phone) {
      return null;
    }
    phone = phone.replace(/\s/g, ""); // remove all whitespace
    if (phone.substr(0, 2) !== "84") {
      phone = "84" + phone.substr(1, phone.length);
    }
    return phone;
  },
  convertToSlug: function (str) {
    var slug = str
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/--+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "");
    // var num = Math.floor(Math.random() * 10000);
    // slug += "-" + num.toString().padStart(4, "0");
    return slug;
  },
  populateCondition: function (filter) {
    var conditions = " ";
    for (var key in filter) {
      var value = filter[key];
      if (typeof value === "object") {
        if (value.type === "string") {
          conditions =
            conditions +
            " AND " +
            value.field +
            " " +
            value.operator +
            " " +
            "'" +
            value.value +
            "'";
        } else {
          conditions =
            conditions +
            " AND " +
            value.field +
            " " +
            value.operator +
            " " +
            value.value;
        }
      } else if (typeof value === "string") {
        conditions = conditions + " AND " + key + " = " + "'" + value + "'";
      } else {
        conditions = conditions + " AND " + key + " = " + value;
      }
    }

    return conditions;
  },
  convertNumberToAbbreviation: function (value) {
    if (value >= 1e9) {
      return (value / 1e9).toFixed(2).replace(/\.00$/, "") + "B";
    } else if (value >= 1e6) {
      return (value / 1e6).toFixed(2).replace(/\.00$/, "") + "M";
    } else if (value >= 1e3) {
      return (value / 1e3).toFixed(2).replace(/\.00$/, "") + "K";
    } else {
      return value.toString();
    }
  },
  randomNumber: function () {
    return Math.floor(Math.random() * 10000);
  },
};
