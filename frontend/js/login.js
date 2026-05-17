const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const email =
        document.getElementById("login-email").value;

    const password =
        document.getElementById("login-password").value;

    try{

        const response = await fetch(
            "https://fullstack-ecommerce-website-pxbw.onrender.com/api/auth/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        const data = await response.json();

        if(response.ok){

            alert(data.message);

            localStorage.setItem(
                "loggedInUser",
                JSON.stringify(data.user)
            );

            window.location.href = "index.html";

        }else{

            alert(data.message);
        }

    }catch(error){

        console.log("Login Error:", error);

        alert("Something went wrong");
    }

});