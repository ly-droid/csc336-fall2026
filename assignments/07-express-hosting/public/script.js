let products = [
    {
        name: "Notebook",
        price: 5.99,
        description: "A notebook for class.",
        image: "images/notebook.jpg",
        category: "school",
        selected: false
    },
    {
        name: "Pen",
        price: 2.50,
        description: "A blue writing pen.",
        image: "images/pen.jpg",
        category: "school",
        selected: false
    },
    {
        name: "Pencil Case",
        price: 6.99,
        description: "A small pencil case.",
        image: "images/pencil-case.jpg",
        category: "school",
        selected: false
    },
    {
        name: "Mug",
        price: 8.99,
        description: "A coffee mug.",
        image: "images/mug.jpg",
        category: "daily",
        selected: false
    },
    {
        name: "Desk Lamp",
        price: 19.99,
        description: "A lamp for your desk.",
        image: "images/desk-lamp.jpg",
        category: "daily",
        selected: false
    },
    {
        name: "Water Bottle",
        price: 12.99,
        description: "A reusable water bottle.",
        image: "images/water-bottle.jpg",
        category: "daily",
        selected: false
    }
];

let cart = [];

let productsDiv = document.querySelector("#products");
let cartDiv = document.querySelector("#cartItems");
let categorySelect = document.querySelector("#category");
let sortSelect = document.querySelector("#sort");
let addSelectedButton = document.querySelector("#addSelected");


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
    price.innerHTML = "$" + product.price.toFixed(2);
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
            product.name + " - $" + product.price.toFixed(2);

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
        "Total: $" + total.toFixed(2) +
        " (" + cart.length + (cart.length === 1 ? " item)" : " items)");

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
showProducts();
showCart();