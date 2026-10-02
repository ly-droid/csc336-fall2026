// Small, original SVG illustrations are embedded as image URLs so only three
// files are needed. This helper makes the catalog's image data, not the cards.
function plantImage(background, pot, leaves) {
    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="440" viewBox="0 0 600 440">' +
        '<rect width="600" height="440" fill="' + background + '"/>' +
        '<ellipse cx="300" cy="391" rx="115" ry="13" fill="#233b2c" opacity=".09"/>' +
        leaves + '<path d="M231 280 H369 L352 376 Q300 397 248 376 Z" fill="' + pot + '"/>' +
        '<path d="M231 280 H369 V296 H231 Z" fill="#fff" opacity=".17"/>' +
        '<path d="M252 305 L262 367" fill="none" stroke="#fff" opacity=".18" stroke-width="7"/>' +
        '</svg>';
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}

// The entire catalog comes from this one array. Prices are numbers, not strings.
const products = [
    {
        id: 'monstera', name: 'Monstera Deliciosa', price: 34.95, category: 'Statement', selected: false,
        description: 'Big, sculptural leaves for your favorite bright corner. A little drama, in the best way.',
        image: plantImage('#e8eddf', '#bb785c', '<path d="M300 287 Q310 180 262 113 M300 230 Q360 180 382 108 M300 264 Q239 208 208 173" fill="none" stroke="#536742" stroke-width="9"/><path d="M268 178 C166 158 194 46 260 67 C329 61 342 135 268 178Z" fill="#496641"/><path d="M330 207 C306 125 386 73 419 130 C447 188 389 222 330 207Z" fill="#66834c"/><path d="M250 254 C162 270 148 183 203 164 C254 145 283 211 250 254Z" fill="#78925a"/><path d="M260 91 L268 153 M389 130 L346 191 M199 185 L239 235" stroke="#c4d0a8" stroke-width="4" fill="none"/>')
    },
    {
        id: 'snake', name: 'Snake Plant', price: 22.50, category: 'Easy care', selected: false,
        description: 'Upright, architectural, and wonderfully unfussy. A calm companion for busy weeks.',
        image: plantImage('#eee9de', '#d5c2a2', '<path d="M286 287 Q205 157 234 76 Q294 156 299 287Z" fill="#6d8249"/><path d="M299 287 Q269 108 309 44 Q343 164 313 287Z" fill="#3f5c3d"/><path d="M314 287 Q322 149 381 105 Q376 222 330 287Z" fill="#8a9b56"/><path d="M293 279 L242 108 M307 276 L310 82 M322 279 L369 133" fill="none" stroke="#b5bf7c" stroke-width="5"/>')
    },
    {
        id: 'pothos', name: 'Golden Pothos', price: 18.75, category: 'Trailing', selected: false,
        description: 'Heart-shaped leaves that wander over shelves. Give those trailing vines room to roam.',
        image: plantImage('#e9e8d9', '#829074', '<path d="M300 288 Q252 154 219 192 Q177 234 200 337 M301 282 Q343 129 383 184 Q421 256 401 345" fill="none" stroke="#557241" stroke-width="7"/><path d="M291 262 Q223 215 253 170 Q305 171 291 262 M304 254 Q302 178 344 158 Q389 193 304 254 M229 208 Q151 173 180 244 Q222 258 229 208 M199 271 Q130 260 159 318 Q204 333 199 271 M381 209 Q393 148 429 187 Q435 229 381 209 M406 277 Q458 218 460 285 Q435 325 406 277" fill="#6e8c4c"/><path d="M260 184 L283 239 M331 180 L313 230 M174 283 L190 302" stroke="#bac67b" stroke-width="7"/>')
    },
    {
        id: 'rubber', name: 'Rubber Plant', price: 39.00, category: 'Statement', selected: false,
        description: 'Glossy, deep-green leaves with a confident silhouette. The finishing touch for an airy room.',
        image: plantImage('#e8e6df', '#a2634b', '<path d="M300 286 L301 91" stroke="#6a6345" stroke-width="9"/><path d="M301 239 C204 257 189 176 247 177 C283 175 300 209 301 239Z M301 196 C391 213 420 126 360 133 C317 139 303 163 301 196Z M301 148 C219 161 213 83 258 90 C290 94 299 121 301 148Z M301 109 C279 54 325 33 336 62 C342 89 321 109 301 109Z" fill="#3e5f48"/><path d="M245 192 L290 228 M317 185 L369 149 M253 105 L291 140" stroke="#83987a" stroke-width="3"/>')
    },
    {
        id: 'zz', name: 'ZZ Plant', price: 26.25, category: 'Easy care', selected: false,
        description: 'Waxy leaves and an easygoing nature. A sturdy bit of green for your desk or side table.',
        image: plantImage('#e5eadf', '#d4c7b1', '<path d="M296 289 Q272 169 235 110 M302 289 Q322 140 333 88 M309 289 Q362 221 382 157" fill="none" stroke="#5d744a" stroke-width="8"/><g fill="#577749"><ellipse cx="237" cy="129" rx="20" ry="34" transform="rotate(-45 237 129)"/><ellipse cx="276" cy="160" rx="19" ry="32" transform="rotate(25 276 160)"/><ellipse cx="249" cy="199" rx="20" ry="33" transform="rotate(-50 249 199)"/><ellipse cx="332" cy="108" rx="18" ry="32"/><ellipse cx="301" cy="152" rx="18" ry="30" transform="rotate(-40 301 152)"/><ellipse cx="341" cy="177" rx="18" ry="31" transform="rotate(30 341 177)"/><ellipse cx="305" cy="222" rx="18" ry="30" transform="rotate(-40 305 222)"/><ellipse cx="384" cy="174" rx="18" ry="30" transform="rotate(25 384 174)"/><ellipse cx="363" cy="229" rx="18" ry="30" transform="rotate(45 363 229)"/></g>')
    },
    {
        id: 'philodendron', name: 'Heartleaf Philodendron', price: 21.50, category: 'Trailing', selected: false,
        description: 'Soft, heart-shaped foliage on winding stems. Made for a shelf that needs a little softness.',
        image: plantImage('#ede5dc', '#b88868', '<path d="M300 286 Q235 102 219 171 Q177 247 218 366 M306 284 Q353 129 380 194 Q409 248 384 349" fill="none" stroke="#567344" stroke-width="7"/><path d="M290 262 C213 221 222 173 251 181 C269 161 313 187 290 262Z M305 230 C278 160 308 126 332 148 C380 129 375 191 305 230Z M219 209 C158 168 159 221 176 228 C163 268 205 271 219 209Z M210 311 C155 270 154 318 173 331 C154 368 214 372 210 311Z M375 217 C377 155 419 172 416 196 C459 208 417 257 375 217Z M394 295 C405 236 439 263 428 285 C465 317 418 339 394 295Z" fill="#50734b"/>')
    }
];

let cart = [];
const productList = document.querySelector('#products');
const categoryFilter = document.querySelector('#category-filter');
const sortOrder = document.querySelector('#sort-order');
const addSelectedButton = document.querySelector('#add-selected');
const status = document.querySelector('#status');

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
    image.alt = 'Illustration of ' + product.name + ' in a decorative pot';
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
    renderCatalog();
    renderCart();
    const noun = selected.length === 1 ? 'plant' : 'plants';
    status.textContent = selected.length + ' ' + noun + ' added to your cart. Selection cleared.';
});

categoryFilter.addEventListener('change', function () { renderCatalog(); });
sortOrder.addEventListener('change', function () { renderCatalog(); });
renderCatalog();
renderCart();
