const detailsContainer =
    document.getElementById("product-details");

const params =
    new URLSearchParams(window.location.search);

const productId =
    params.get("id");


// FETCH PRODUCT DETAILS

async function fetchProduct(){

    try{

        const response = await fetch(
            `http://localhost:5000/api/products/${productId}`
        );

        const product = await response.json();

        displayProduct(product);

    }catch(error){

        console.log(
            "Error fetching product:",
            error
        );
    }

}


// DISPLAY PRODUCT

function displayProduct(product){

    detailsContainer.innerHTML = `

        <div class="details-card">

            <img 
                src="${product.image}"
                alt="${product.name}"
            >

            <div class="details-content">

                <h2>${product.name}</h2>

                <h3>₹${product.price}</h3>

                <p class="description">
                    ${product.description}
                </p>

                <button onclick="addToCart(${product.id})">
                    Add to Cart
                </button>

            </div>

        </div>

    `;
}


// CART

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// ADD TO CART

async function addToCart(id){

    try{

        const response = await fetch(
            `https://fullstack-ecommerce-website-pxbw.onrender.com/api/products/${id}`
        );

        const product = await response.json();

        const existingProduct =
            cart.find((item) => item.id === id);

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

        alert(product.name + " added to cart");

    }catch(error){

        console.log(
            "Cart Error:",
            error
        );
    }

}


// LOAD PRODUCT

fetchProduct();