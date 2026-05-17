const cartItemsContainer =
    document.getElementById("cart-items");

let cart =
    JSON.parse(localStorage.getItem("cart")) || [];


// DISPLAY CART

function displayCart(){

    cartItemsContainer.innerHTML = "";

    let total = 0;

    if(cart.length === 0){

        cartItemsContainer.innerHTML =
            "<h3>Your cart is empty</h3>";

        document.getElementById("total-price").innerText =
            "Total: ₹0";

        return;
    }

    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        cartItemsContainer.innerHTML += `

            <div class="cart-item">

                <img src="${item.image}" alt="${item.name}">

                <div>

                    <h3>${item.name}</h3>

                    <p>Price: ₹${item.price}</p>

                    <p>Quantity: ${item.quantity}</p>

                    <p>
                        Total:
                        ₹${item.price * item.quantity}
                    </p>

                    <button onclick="increaseQty(${index})">
                        +
                    </button>

                    <button onclick="decreaseQty(${index})">
                        -
                    </button>

                    <button onclick="removeItem(${index})">
                        Remove
                    </button>

                </div>

            </div>

        `;
    });

    document.getElementById("total-price").innerText =
        "Total: ₹" + total;
}


// INCREASE QUANTITY

function increaseQty(index){

    cart[index].quantity += 1;

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}


// DECREASE QUANTITY

function decreaseQty(index){

    if(cart[index].quantity > 1){

        cart[index].quantity -= 1;

    }else{

        cart.splice(index, 1);
    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}


// REMOVE ITEM

function removeItem(index){

    cart.splice(index, 1);

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    displayCart();
}


// CHECKOUT

async function checkout(){

    if(cart.length === 0){

        alert("Cart is empty");

        return;
    }

    const loggedInUser =
        JSON.parse(localStorage.getItem("loggedInUser"));

    const orderData = {

        id: Date.now(),

        user: loggedInUser.email,

        items: cart,

        date: new Date().toLocaleString()
    };

    try{

        const response = await fetch(
            "http://localhost:5000/api/orders",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(orderData)
            }
        );

        const data = await response.json();

        alert(data.message);

        localStorage.removeItem("cart");

        window.location.href = "orders.html";

    }catch(error){

        console.log("Checkout Error:", error);

        alert("Something went wrong");
    }

}


// INITIAL DISPLAY

displayCart();