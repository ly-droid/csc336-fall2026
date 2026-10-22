let starterProducts = [
    {
        name: "Notebook",
        price: 5.99,
        description: "A notebook for class.",
        image: "https://images.unsplash.com/photo-1743385779392-cab22721fac6?w=400&q=80",
        category: "school",
        selected: false
    },
    {
        name: "Pen",
        price: 2.50,
        description: "A blue writing pen.",
        image: "https://images.unsplash.com/photo-1709036311069-98e4858a7b53?w=400&q=80",
        category: "school",
        selected: false
    },
    {
        name: "Pencil Case",
        price: 6.99,
        description: "A small pencil case.",
        image: "https://images.unsplash.com/photo-1574944558125-f8d12f23be89?w=400&q=80",
        category: "school",
        selected: false
    },
    {
        name: "Mug",
        price: 8.99,
        description: "A coffee mug.",
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&q=80",
        category: "daily",
        selected: false
    },
    {
        name: "Desk Lamp",
        price: 19.99,
        description: "A lamp for your desk.",
        image: "https://images.unsplash.com/photo-1740204245792-374791da9bf0?w=400&q=80",
        category: "daily",
        selected: false
    },
    {
        name: "Water Bottle",
        price: 12.99,
        description: "A reusable water bottle.",
        image: "https://images.unsplash.com/photo-1611190346465-12f6b1ad0c06?w=400&q=80",
        category: "daily",
        selected: false
    }
];


let products = [];
for (let i = 0; i < starterProducts.length; i++) {
    products.push(starterProducts[i]);
}

let savedProducts = localStorage.getItem("campusProducts");

if (savedProducts !== null) {
    products = JSON.parse(savedProducts);
}


let cart = [];

let productsDiv = document.querySelector("#products");
let cartDiv = document.querySelector("#cartItems");
let categorySelect = document.querySelector("#category");
let sortSelect = document.querySelector("#sort");
let addSelectedButton = document.querySelector("#addSelected");


let productForm = document.querySelector("#productForm");

let nameInput = document.querySelector("#newName");
let priceInput = document.querySelector("#newPrice");
let descriptionInput = document.querySelector("#newDescription");
let newCategoryInput = document.querySelector("#newCategory");
let imageInput = document.querySelector("#newImage");

let resetStoreButton = document.querySelector("#resetStore");
let formMessage = document.querySelector("#formMessage");

function showProduct(product) {

    let card = document.createElement("div");
    card.classList.add("card");
    if (product.selected === true)
        card.classList.add("selected");

    let image = document.createElement("img");
    image.src = product.image;
    card.append(image);

    let name = document.createElement("h3");
    name.innerHTML = product.name;
    card.append(name);

    let price = document.createElement("p");
    price.innerHTML = "$" + product.price;
    card.append(price);

    let description = document.createElement("p");
    description.innerHTML = product.description;
    card.append(description);

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = product.selected;
    card.append(checkbox);

    let label = document.createElement("span");
    label.innerHTML = " Select";
    card.append(label);

    checkbox.addEventListener("change", function () {
        product.selected = checkbox.checked;
        localStorage.setItem("campusProducts", JSON.stringify(products));
        showProducts();
    });

    let button = document.createElement("button");
    button.innerHTML = "Add to Cart";

    button.addEventListener("click", function () {
        cart.push(product);
        showCart();
    });

    card.append(button);
    productsDiv.append(card);
}

function showProducts() {

    productsDiv.innerHTML = "";

    let filteredProducts = products.filter(function (product) {
        if (categorySelect.value === "all") {
            return true;
        }
        if (product.category === categorySelect.value) {
            return true;
        }
        return false;
    });
    if (sortSelect.value === "low")
        filteredProducts.sort(function (a, b) { return a.price - b.price; });
    if (sortSelect.value === "high")
        filteredProducts.sort(function (a, b) { return b.price - a.price; });

    filteredProducts.forEach(function (product) { showProduct(product); });
    updateSelectedButton();
}

function updateSelectedButton() {

    let selectedProducts = products.filter(function (product) {
        return product.selected === true;
    });

    if (selectedProducts.length === 0) {
        addSelectedButton.disabled = true;
        addSelectedButton.innerHTML = "Add Selected to Cart";
    } else {
        addSelectedButton.disabled = false;
        if (selectedProducts.length === 1) {
            addSelectedButton.innerHTML = "Add 1 Item to Cart";
        } else {
            addSelectedButton.innerHTML =
                "Add " + selectedProducts.length + " Items to Cart";
        }
    }
}

function showCart() {
    cartDiv.innerHTML = "";
    cart.forEach(function (product) {

        let item = document.createElement("p");
        item.innerHTML =
            product.name + " - $" + product.price;

        cartDiv.append(item);
    });
    let prices = cart.map(function (product) {
        return product.price;
    });
    let total = 0;
    prices.forEach(function (price) {
        total = total + price;
    });
    let totalP = document.createElement("p");
    totalP.innerHTML =
        "Total: $" + total +
        " (" + cart.length + " items)";

    cartDiv.append(totalP);
}

addSelectedButton.addEventListener("click", function () {

    let selectedProducts = products.filter(function (product) {
        return product.selected === true;
    });

    selectedProducts.forEach(function (product) {
        cart.push(product);
        product.selected = false;
    });

    showProducts();
    showCart();
});

categorySelect.addEventListener("change", function () {
    showProducts();
});

sortSelect.addEventListener("change", function () {
    showProducts();
});

productForm.addEventListener("submit", function (event) {
    event.preventDefault();
    for (let i = 0; i < products.length; i++) {

        if (products[i].name === nameInput.value) {
            formMessage.innerHTML = "This product already exists.";
            return;
        }
    }
    let newProduct = {
        name: nameInput.value,
        price: Number(priceInput.value),
        description: descriptionInput.value,
        category: newCategoryInput.value,
        image: imageInput.value,
        selected: false
    };

    products.push(newProduct);
    localStorage.setItem("campusProducts", JSON.stringify(products));
    categorySelect.value = "all";
    showProducts();
    formMessage.innerHTML = "Product added!";
    nameInput.value = "";
    priceInput.value = "";
    descriptionInput.value = "";
    newCategoryInput.value = "school";
    imageInput.value = "";
});

resetStoreButton.addEventListener("click", function () {
    localStorage.removeItem("campusProducts");
    products = [];
    for (let i = 0; i < starterProducts.length; i++) {
        starterProducts[i].selected = false;
        products.push(starterProducts[i]);
    }
    cart = [];
    categorySelect.value = "all";
    sortSelect.value = "default";
    showProducts();
    showCart();
    formMessage.innerHTML = "Store reset!";
});

showProducts();
showCart();
localStorage.setItem("campusProducts", JSON.stringify(products));