const productForm =
    document.getElementById("product-form");

productForm.addEventListener(
    "submit",
    async function(e){

        e.preventDefault();

        const name =
            document.getElementById("name").value;

        const price =
            document.getElementById("price").value;

        const image =
            document.getElementById("image").value;

        const productData = {

            id: Date.now(),

            name,

            price: Number(price),

            image
        };

        try{

            const response = await fetch(
                "http://localhost:5000/api/products",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(productData)
                }
            );

            const data = await response.json();

            alert(data.message);

            window.location.href = "index.html";

        }catch(error){

            console.log("Add Product Error:", error);

            alert("Failed to add product");
        }

    }
);