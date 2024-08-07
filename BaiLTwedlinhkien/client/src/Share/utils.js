const formatNumberWithCommas = (number) => {
  // Tạo một formatter mới với định dạng 'en-US'
  let formatter = new Intl.NumberFormat("en-US");
  // Sử dụng formatter để chuyển đổi số thành chuỗi với dấu phẩy
  let formattedNumber = formatter.format(number);
  // Trả về chuỗi đã định dạng
  return formattedNumber;
};
export { formatNumberWithCommas };
