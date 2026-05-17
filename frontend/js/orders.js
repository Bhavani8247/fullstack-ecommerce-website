const ordersList =
    document.getElementById("orders-list");

const loggedInUser =
    JSON.parse(localStorage.getItem("loggedInUser"));


async function loadOrders(){

    try{

        const response = await fetch(
            "https://fullstack-ecommerce-website-pxbw.onrender.com/api/orders"
        );

        const orders = await response.json();

        console.log(orders);

        const userOrders = orders.filter(
            (order) =>
                order.user === loggedInUser.email
        );

        if(userOrders.length === 0){

            ordersList.innerHTML =
                "<h3>No orders found</h3>";

            return;
        }

        ordersList.innerHTML = "";

        userOrders.forEach((order) => {

            order.items.forEach((item) => {

                ordersList.innerHTML += `

                    <div class="order-card">

                    <img 
                    src="${item.image.startsWith('http')
                        ? item.image
                        : './' + item.image}"
                    alt="${item.name}"
                >

                        <div>

                            <h3>${item.name}</h3>

                            <p>Price: ₹${item.price}</p>

                            <p>Quantity: ${item.quantity}</p>

                            <p>Date: ${order.date}</p>

                        </div>

                    </div>

                `;
            });

        });

    }catch(error){

        console.log("Orders Error:", error);

        ordersList.innerHTML =
            "<h3>Failed to load orders</h3>";
    }

}


loadOrders();