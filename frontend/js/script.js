const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));

if(!loggedInUser){

    window.location.href = "login.html";
}

let products = [];

const productsContainer =
    document.getElementById("products");


// FETCH PRODUCTS

async function fetchProducts(){

    try{

        const response = await fetch(
            "http://localhost:5000/api/products"
        );

        products = await response.json();

        displayProducts();

    }catch(error){

        console.log("Error fetching products:", error);
    }

}


// DISPLAY PRODUCTS

function displayProducts(){

    productsContainer.innerHTML = "";

    products.forEach((product) => {

        productsContainer.innerHTML += `

            <div class="product-card">

                <a href="product-details.html?id=${product.id}">
                    <img src="${product.image}" alt="${product.name}">
                </a>

                <h3>
                    <a href="product-details.html?id=${product.id}">
                        ${product.name}
                    </a>
                </h3>

                <p class="price">₹${product.price}</p>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>

        `;
    });

}


// LOAD PRODUCTS

fetchProducts();


// CART

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// ADD TO CART

function addToCart(id){

    const product = products.find(
        (item) => item.id === id
    );

    if(!product){

        alert("Product not found");

        return;
    }

    const existingProduct = cart.find(
        (item) => item.id === id
    );

    if(existingProduct){

        existingProduct.quantity += 1;

    }else{

        cart.push({
            ...product,
            quantity: 1
        });
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(product.name + " added to cart");
}


// UPDATE CART COUNT

function updateCartCount(){

    document.getElementById("cart-count").innerText =
        cart.reduce(
            (total, item) => total + item.quantity,
            0
        );
}


// LOGOUT

function logout(){

    localStorage.removeItem("loggedInUser");

    alert("Logged out successfully");

    window.location.href = "login.html";
}


// INITIALIZE

updateCartCount();