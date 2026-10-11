// Keep the Assignment 4 starters separate, so Reset Store can restore them.
const starterProducts = [
    {
        id: 'monstera', name: 'Monstera Deliciosa', price: 34.95, category: 'Statement', selected: false,
        description: 'Big, sculptural leaves for your favorite bright corner. A little drama, in the best way.',
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/Monstera_deliciosa_WPC.jpg/960px-Monstera_deliciosa_WPC.jpg",
        photoSource: "https://commons.wikimedia.org/wiki/File:Monstera_deliciosa_WPC.jpg",
        photographer: "WayneRay",
        photoLicense: "Public domain",
        photoLicenseUrl: ""
    },
    {
        id: 'snake', name: 'Snake Plant', price: 22.50, category: 'Easy care', selected: false,
        description: 'Upright, architectural, and wonderfully unfussy. A calm companion for busy weeks.',
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d5/Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29_2.jpg/960px-Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29_2.jpg",
        photoSource: "https://commons.wikimedia.org/wiki/File:Snake_Plant_(Sansevieria_trifasciata_%27Laurentii%27)_2.jpg",
        photographer: "Mokkie",
        photoLicense: "CC BY-SA 3.0",
        photoLicenseUrl: "https://creativecommons.org/licenses/by-sa/3.0"
    },
    {
        id: 'pothos', name: 'Golden Pothos', price: 18.75, category: 'Trailing', selected: false,
        description: 'Heart-shaped leaves that wander over shelves. Give those trailing vines room to roam.',
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/10/Baby_Pothos_Full_9-9-22.jpg/960px-Baby_Pothos_Full_9-9-22.jpg",
        photoSource: "https://commons.wikimedia.org/wiki/File:Baby_Pothos_Full_9-9-22.jpg",
        photographer: "LeahHenn",
        photoLicense: "CC BY-SA 4.0",
        photoLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        id: 'rubber', name: 'Rubber Plant', price: 39.00, category: 'Statement', selected: false,
        description: 'Glossy, deep-green leaves with a confident silhouette. The finishing touch for an airy room.',
        image: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Ficus_elastica_557.jpg",
        photoSource: "https://commons.wikimedia.org/wiki/File:Ficus_elastica_557.jpg",
        photographer: "Sandy Lynch",
        photoLicense: "CC BY-SA 2.5",
        photoLicenseUrl: "https://creativecommons.org/licenses/by-sa/2.5"
    },
    {
        id: 'zz', name: 'ZZ Plant', price: 26.25, category: 'Easy care', selected: false,
        description: 'Waxy leaves and an easygoing nature. A sturdy bit of green for your desk or side table.',
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b7/Zamioculcas_zamiifolia_%27Hansoti13%27_vel_Zenzi_kz04.jpg/960px-Zamioculcas_zamiifolia_%27Hansoti13%27_vel_Zenzi_kz04.jpg",
        photoSource: "https://commons.wikimedia.org/wiki/File:Zamioculcas_zamiifolia_%27Hansoti13%27_vel_Zenzi_kz04.jpg",
        photographer: "Krzysztof Ziarnek, Kenraiz",
        photoLicense: "CC BY-SA 4.0",
        photoLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0"
    },
    {
        id: 'philodendron', name: 'Heartleaf Philodendron', price: 21.50, category: 'Trailing', selected: false,
        description: 'Soft, heart-shaped foliage on winding stems. Made for a shelf that needs a little softness.',
        image: "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Philodendron_hederaceum_hederaceum_0zz.jpg/960px-Philodendron_hederaceum_hederaceum_0zz.jpg",
        photoSource: "https://commons.wikimedia.org/wiki/File:Philodendron_hederaceum_hederaceum_0zz.jpg",
        photographer: "David J. Stang",
        photoLicense: "CC BY-SA 4.0",
        photoLicenseUrl: "https://creativecommons.org/licenses/by-sa/4.0"
    }
];

const storageKey = 'leaf-light-inventory-v1';
const storageMessage = document.querySelector('#storage-message');
// Copy the starters so selecting or adding products never changes the originals.
let products = JSON.parse(JSON.stringify(starterProducts));
let cart = [];
const productList = document.querySelector('#products');
const categoryFilter = document.querySelector('#category-filter');
const sortOrder = document.querySelector('#sort-order');
const addSelectedButton = document.querySelector('#add-selected');
const status = document.querySelector('#status');
const productForm = document.querySelector('#product-form');
const formMessage = document.querySelector('#form-message');

// A first visit returns null. Otherwise, turn the saved JSON back into objects.
function loadProducts() {
    try {
        const savedProducts = localStorage.getItem(storageKey);
        if (savedProducts !== null) {
            const loadedProducts = JSON.parse(savedProducts);
            // Invalid saved data should not stop the starter store from rendering.
            if (!Array.isArray(loadedProducts) || !loadedProducts.every(function (product) {
                return product && typeof product.name === 'string' && product.name.trim() !== '' &&
                    typeof product.price === 'number' && Number.isFinite(product.price) && product.price > 0 &&
                    typeof product.description === 'string' && typeof product.image === 'string' &&
                    (product.category === 'Easy care' || product.category === 'Statement' || product.category === 'Trailing');
            })) {
                throw new Error('Invalid saved catalog');
            }
            products = loadedProducts;
        }
    } catch (error) {
        storageMessage.textContent = 'Your saved catalog could not be loaded. The starter plants are shown. Use Reset Store to clear the saved catalog.';
    }
}

function saveProducts() {
    try {
        localStorage.setItem(storageKey, JSON.stringify(products));
        storageMessage.textContent = '';
        return true;
    } catch (error) {
        storageMessage.textContent = 'Your browser could not save this catalog. Your changes are visible now, but may be lost when you refresh.';
        return false;
    }
}

function showFormMessage(message, isError) {
    formMessage.textContent = message;
    formMessage.classList.toggle('error', isError);
}

function money(price) {
    return '$' + price.toFixed(2);
}

function updateSelectionButton() {
    const selected = products.filter(function (product) { return product.selected; });
    addSelectedButton.disabled = selected.length === 0;
    addSelectedButton.textContent = 'Add Selected to Cart';
    if (selected.length > 0) {
        const noun = selected.length === 1 ? 'Item' : 'Items';
        addSelectedButton.textContent = 'Add ' + selected.length + ' ' + noun + ' to Cart';
    }
}

// This one function renders a product. renderCatalog calls it with forEach.
function renderProduct(product) {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.classList.toggle('selected', product.selected);

    const image = document.createElement('img');
    image.className = 'product-image';
    image.src = product.image;
    image.alt = 'Photograph of ' + product.name;
    image.width = 600;
    image.height = 440;

    const info = document.createElement('div');
    info.className = 'product-info';
    const selectLabel = document.createElement('label');
    selectLabel.className = 'select-product';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = product.selected;
    checkbox.setAttribute('aria-label', 'Select ' + product.name);
    const selectText = document.createElement('span');
    selectText.textContent = 'Select for bundle';
    checkbox.addEventListener('change', function () {
        product.selected = checkbox.checked;
        saveProducts();
        // The visual change is entirely defined by .selected in style.css.
        card.classList.toggle('selected', product.selected);
        updateSelectionButton();
    });
    selectLabel.append(checkbox, selectText);

    const category = document.createElement('p');
    category.className = 'category';
    category.textContent = product.category;
    const name = document.createElement('h3');
    name.textContent = product.name;
    const description = document.createElement('p');
    description.className = 'description';
    description.textContent = product.description;
    const bottom = document.createElement('div');
    bottom.className = 'card-bottom';
    const price = document.createElement('span');
    price.className = 'price';
    price.textContent = money(product.price);
    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.textContent = 'Add to Cart';
    addButton.setAttribute('aria-label', 'Add ' + product.name + ' to cart');
    // This anonymous function remembers the product for this particular card.
    addButton.addEventListener('click', function () {
        cart.push(product);
        renderCart();
        status.textContent = product.name + ' added to your cart.';
    });
    bottom.append(price, addButton);
    info.append(selectLabel, category, name, description, bottom);
    // Starter photos keep their credits. New photos have no invented attribution.
    if (product.photographer) {
        const credit = document.createElement('p');
        credit.className = 'photo-credit';
        const sourceLink = document.createElement('a');
        sourceLink.href = product.photoSource;
        sourceLink.target = '_blank';
        sourceLink.rel = 'noopener noreferrer';
        sourceLink.textContent = 'Photo: ' + product.photographer;
        credit.append(sourceLink);
        const license = document.createElement('a');
        license.href = product.photoLicenseUrl || product.photoSource;
        license.target = '_blank';
        license.rel = 'noopener noreferrer';
        license.textContent = product.photoLicense;
        credit.append(' · ', license);
        info.append(credit);
    }
    card.append(image, info);
    productList.append(card);
}

function renderCatalog() {
    // filter creates a new array, so sorting it preserves the featured order.
    const visibleProducts = products.filter(function (product) {
        return categoryFilter.value === 'all' || product.category === categoryFilter.value;
    });
    if (sortOrder.value === 'price-low') {
        visibleProducts.sort(function (a, b) { return a.price - b.price; });
    } else if (sortOrder.value === 'price-high') {
        visibleProducts.sort(function (a, b) { return b.price - a.price; });
    } else if (sortOrder.value === 'name') {
        visibleProducts.sort(function (a, b) { return a.name.localeCompare(b.name); });
    }
    productList.innerHTML = '';
    visibleProducts.forEach(renderProduct);
    document.querySelector('#result-count').textContent = visibleProducts.length + ' plants';
    updateSelectionButton();
}

function renderCart() {
    const cartItems = document.querySelector('#cart-items');
    cartItems.innerHTML = '';
    document.querySelector('#cart-count').textContent = cart.length;
    if (cart.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'empty-cart';
        const title = document.createElement('h3');
        title.textContent = 'Room for a little green.';
        const text = document.createElement('p');
        text.textContent = 'Choose a plant you love, or select a few to start your collection.';
        empty.append(title, text);
        cartItems.append(empty);
    } else {
        const list = document.createElement('ul');
        list.className = 'cart-list';
        cart.forEach(function (product, index) {
            const row = document.createElement('li');
            row.className = 'cart-item';
            const details = document.createElement('div');
            const name = document.createElement('p');
            name.className = 'cart-item-name';
            name.textContent = product.name;
            const price = document.createElement('p');
            price.className = 'cart-item-price';
            price.textContent = money(product.price);
            details.append(name, price);
            const removeButton = document.createElement('button');
            removeButton.type = 'button';
            removeButton.className = 'remove-button';
            removeButton.textContent = 'Remove';
            removeButton.setAttribute('aria-label', 'Remove ' + product.name + ' from cart');
            removeButton.addEventListener('click', function () {
                // Remove just this entry, even if the same plant was added twice.
                cart = cart.filter(function (item, itemIndex) { return itemIndex !== index; });
                renderCart();
                status.textContent = product.name + ' removed from your cart.';
            });
            row.append(details, removeButton);
            list.append(row);
        });
        cartItems.append(list);
    }

    // map extracts the prices; summing whole cents avoids floating-point drift.
    const prices = cart.map(function (product) { return product.price; });
    let totalCents = 0;
    prices.forEach(function (price) { totalCents += Math.round(price * 100); });
    const total = document.querySelector('#cart-total');
    total.innerHTML = '';
    const summary = document.createElement('p');
    const noun = cart.length === 1 ? 'item' : 'items';
    summary.textContent = 'Total: ' + money(totalCents / 100) + ' (' + cart.length + ' ' + noun + ')';
    total.append(summary);
}

addSelectedButton.addEventListener('click', function () {
    const selected = products.filter(function (product) { return product.selected; });
    selected.forEach(function (product) {
        cart.push(product);
        product.selected = false;
    });
    saveProducts();
    renderCatalog();
    renderCart();
    const noun = selected.length === 1 ? 'plant' : 'plants';
    status.textContent = selected.length + ' ' + noun + ' added to your cart. Selection cleared.';
});

categoryFilter.addEventListener('change', function () { renderCatalog(); });
sortOrder.addEventListener('change', function () { renderCatalog(); });

productForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const name = document.querySelector('#product-name').value.trim().replace(/\s+/g, ' ');
    const price = Number(document.querySelector('#product-price').value);
    const description = document.querySelector('#product-description').value.trim();
    const category = document.querySelector('#product-category').value;
    const image = document.querySelector('#product-image').value.trim();

    if (name === '' || description === '') {
        showFormMessage('Please enter a name and description with more than just spaces.', true);
        return;
    }
    // Custom rule: names must be unique, ignoring case and extra whitespace.
    const matchingProducts = products.filter(function (product) {
        return product.name.trim().replace(/\s+/g, ' ').toLowerCase() === name.toLowerCase();
    });
    if (matchingProducts.length > 0) {
        showFormMessage('A product named “' + name + '” already exists. Please choose a different name.', true);
        return;
    }

    // id and selected are internal state. Photo metadata uses the same keys as
    // the starter products, with empty values when no credit was supplied.
    const newProduct = {
        id: 'product-' + Date.now(),
        name: name,
        price: price,
        description: description,
        category: category,
        image: image,
        selected: false,
        photoSource: '',
        photographer: '',
        photoLicense: '',
        photoLicenseUrl: ''
    };
    products.push(newProduct);
    const saved = saveProducts();
    productForm.reset();
    categoryFilter.value = 'all';
    renderCatalog();
    if (saved) {
        showFormMessage(name + ' added and saved. It will still be here after you refresh.', false);
    } else {
        showFormMessage(name + ' added. See the saving warning below.', true);
    }
    status.textContent = name + ' is now available in the catalog.';
});

document.querySelector('#reset-store').addEventListener('click', function () {
    try {
        localStorage.removeItem(storageKey);
    } catch (error) {
        storageMessage.textContent = 'Your browser could not clear the saved catalog. Reset Store could not finish.';
        return;
    }
    products = JSON.parse(JSON.stringify(starterProducts));
    cart = [];
    productForm.reset();
    categoryFilter.value = 'all';
    sortOrder.value = 'featured';
    storageMessage.textContent = '';
    renderCatalog();
    renderCart();
    showFormMessage('Store reset. Your six starter plants are back.', false);
    status.textContent = 'Store reset to the starter catalog. Your cart is empty.';
});

loadProducts();
renderCatalog();
renderCart();
