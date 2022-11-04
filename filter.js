const data = [
  {
    id: 1,
    name: "Ao Dai",
    img: "./img/pexels-tuấn-kiệt-jr-1308885.jpg",
    price: 120,
    cat: "Casual",
  },
  {
    id: 2,
    name: "Pink Dress",
    img: "./img/pexels-anastasiya-gepp-2065195.jpg",
    price: 150,
    cat: "Dress",
  },
  {
    id: 3,
    name: "Watches 1",
    img: "./img/pexels-fernando-arcos-190819.jpg",
    price: 300,
    cat: "Watches",
  },
  {
    id: 4,
    name: "Watches 2",
    img: "./img/pexels-joey-nguyễn-2113994.jpg",
    price: 290,
    cat: "Sport",
  },
  {
    id: 5,
    name: "Wedding dress",
    img: "./img/pexels-photomix-company-291759.jpg",
    price: 220,
    cat: "Dress",
  },
  {
    id: 6,
    name: "Watches 3",
    img: "./img/pexels-pixabay-277390.jpg",
    price: 320,
    cat: "Watches",
  },
  {
    id: 7,
    name: "Watches 4",
    img: "./img/pexels-torsten-dettlaff-437037.jpg",
    price: 320,
    cat: "Watches",
  },
];

const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".cats");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");

const displayProducts = (filterProducts) => {
  productsContainer.innerHTML = filterProducts
    .map(
      (product) =>
        `
        <div class="product">
        <img src=${product.img} alt="" />
        <span class="name">${product.name}</span>
        <span class="priceText">$${product.price}</span>
      </div>
    `
    )
    .join("");
};

displayProducts(data);

searchInput.addEventListener("keyup", (e) => {
  const value = e.target.value.toLowerCase();

  if (value) {
    displayProducts(
      data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1)
    );
  } else {
    displayProducts(data);
  }
});

const setCategories = () => {
  const allCats = data.map((item) => item.cat);
  const categories = [
    "All",
    ...allCats.filter((item, i) => {
      return allCats.indexOf(item) === i;
    }),
  ];

  categoriesContainer.innerHTML = categories
    .map(
      (cat) =>
        `
  <span class="cat">${cat}</span>
  `
    )
    .join("");

  categoriesContainer.addEventListener("click", (e) => {
    const selectedCat = e.target.textContent;

    selectedCat === "All"
      ? displayProducts(data)
      : displayProducts(data.filter((item) => item.cat === selectedCat));
  });
};

const setPrices = () => {
  const priceList = data.map((item) => item.price);
  const minPrice = Math.min(...priceList);
  const maxPrice = Math.max(...priceList);

  priceRange.min = minPrice;
  priceRange.max = maxPrice;
  priceRange.value = maxPrice;

  priceValue.textContent = "$" + maxPrice;

  priceRange.addEventListener("input", (e) => {
    priceValue.textContent = "$" + e.target.value;
    displayProducts(data.filter((item) => item.price <= e.target.value));
  });
};

setCategories();
setPrices();
