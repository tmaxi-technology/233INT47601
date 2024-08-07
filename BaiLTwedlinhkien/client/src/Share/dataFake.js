import productfake from "../assets/imgproduct.png";
const dataCategories = [
  {
    href: "all",
    title: "Tất cả sản phẩm",
    items: [],
  },
  {
    href: "1",
    title: "Dành cho Cter",
    items: [],
  },
  {
    href: "2",
    title: "PC - Máy tính chơi game",
    items: [
      {
        name: "PC workstation",
        slug: "PC-workstation",
      },
      {
        name: "PC chơi game",
        slug: "PC-choi-game",
      },
    ],
  },
  {
    href: "3",
    title: "Linh kiện máy tính",
    items: [
      {
        name: "CPU",
        slug: "CPU",
      },
      {
        name: "Màn hình",
        slug: "Man-hinh",
      },
      {
        name: "SSD/HDD",
        slug: "ssd-hdd",
      },
      {
        name: "RAM",
        slug: "RAM",
      },
      {
        name: "Vỏ case",
        slug: "Vo-case",
      },
      {
        name: "Tản nhiệt",
        slug: "Tan-nhiet",
      },
    ],
  },
  {
    href: "4",
    title: "Balo - Túi xách",
    items: [],
  },
  {
    href: "5",
    title: "Build PC theo nhu cầu",
    items: [],
  },
  {
    href: "6",
    title: "Smarthome",
    items: [],
  },
  {
    href: "7",
    title: "TTG tại Shoppe",
    items: [],
  },
  {
    href: "8",
    title: "TTG tại Lazada",
    items: [],
  },
  {
    href: "9",
    title: "Onebot (Xiaomi)",
    items: [],
  },
];

const dataListSupplier = [
  {
    href: "ASUS",
    name: "ASUS",
  },
  {
    href: "MSI",
    name: "MSI",
  },
  {
    href: "Anker",
    name: "Anker",
  },
  {
    href: "Corsair",
    name: "Corsair",
  },
  {
    href: "Intel",
    name: "Intel",
  },
  {
    href: "Kingston",
    name: "Kingston",
  },
];

const dataFilerPrice = [
  {
    name: "Dưới 5.000.000đ",
  },
  {
    name: "5.000.000đ - 10.000.000đ",
  },
  {
    name: "10.000.000đ - 15.000.000đ",
  },
  {
    name: "15.000.000đ - 20.000.000đ",
  },
  {
    name: "Trên 20.000.000đ",
  },
];

const dataSortPrice = [
  {
    name: "Giá: Tăng dần",
  },
  {
    name: "Giá: Giảm dần",
  },
  {
    name: "Tên: A - Z",
  },
  {
    name: "Tên: Z - A",
  },
  {
    name: "Mới nhất",
  },
  {
    name: "Bán chạy nhất",
  },
];

const fakeDataProduct = [
  {
    img: productfake,
    name: "PC TTG CSGO Valorant",
    price: "9,990,000",
    pricePromotion: "7,990,000",
    discount: "-14",
    slug: "PC TTG CSGO Valorant",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    img: productfake,
    name: "PC TTG CSGO Valorant",
    price: "9,990,000",
    pricePromotion: "7,990,000",
    discount: "-14",
    slug: "PC TTG CSGO Valorant",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    img: productfake,
    name: "PC TTG CSGO Valorant PUBG FIFA LOL RX550 - Full New - Bảo hành 36 tháng",
    price: "9,990,000",
    pricePromotion: "",
    discount: "",
    slug: "PC TTG CSGO Valorant",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    img: productfake,
    name: "PC TTG CSGO Valorant PUBG FIFA LOL RX550 - Full New - Bảo hành 36 tháng",
    price: "9,990,000",
    pricePromotion: "",
    discount: "",
    slug: "PC TTG CSGO Valorant",
  },
  {
    img: productfake,
    name: "PC TTG CSGO Valorant PUBG FIFA LOL RX550 - Full New - Bảo hành 36 tháng",
    price: "9,990,000",
    pricePromotion: "7,990,000",
    discount: "-14",
    slug: "PC TTG CSGO Valorant",
  },
  {
    img: productfake,
    name: "PC TTG CSGO Valorant PUBG FIFA LOL RX550 - Full New - Bảo hành 36 tháng",
    price: "9,990,000",
    pricePromotion: "7,990,000",
    discount: "-14",
    slug: "PC TTG CSGO Valorant",
  },
  {
    img: productfake,
    name: "PC TTG CSGO Valorant PUBG FIFA LOL RX550 - Full New - Bảo hành 36 tháng",
    price: "9,990,000",
    pricePromotion: "7,990,000",
    discount: "-14",
    slug: "PC TTG CSGO Valorant",
  },
  {
    img: productfake,
    name: "PC TTG CSGO Valorant PUBG FIFA LOL RX550 - Full New - Bảo hành 36 tháng",
    price: "9,990,000",
    pricePromotion: "",
    discount: "-14",
    slug: "PC TTG CSGO Valorant",
  },
];

const fakeDataUser = [
  {
    firstName: "Dinh",
    lastName: "Nguyen",
    address: "Quận 1,TP Hồ Chí Minh",
    phone: "0123456678",
    email: "tdinhnguyen279@gmail.com",
    avt: "",
  },
];

const simpleDataProduct = [
  {
    image: [productfake, productfake, productfake, productfake],
    name: "PC TTG CSGO Valorant",
    price: "9,990,000",
    pricePromotion: "7,990,000",
    discount: "-14",
    slug: "PC TTG CSGO Valorant",
    sizes: ["S", "M", "L", "XL"],
    description:
      "New - Bảo hàn 36 tháng Dung lượng bộ nhớ: 16GB GDDR6X CUDA Core : 8448 nhân Băng thông: 256-bit Kết nối: 3x DisplayPort 1.4, 2x HDMI 2.1 Nguồn yêu cầu: 750W Dung lượng bộ nhớ: 16GB GDDR6X CUDA Core : 8448 nhân Băng thông: 256-bit Kết nối: 3x DisplayPort 1.4, 2x HDMI 2.1 Nguồn yêu cầu: 750W",
    amount: 20,
  },
];
export {
  dataCategories,
  dataListSupplier,
  dataFilerPrice,
  fakeDataProduct,
  dataSortPrice,
  fakeDataUser,
  simpleDataProduct,
};
