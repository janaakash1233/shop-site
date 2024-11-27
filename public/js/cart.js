const payBtn = document.querySelector(".checkout-btn");

payBtn.addEventListener("click", () => {
    // Get cart data from localStorage
    const cart = JSON.parse(localStorage.getItem('cart'));

    // Ensure cart is not empty before sending request
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items to your cart before proceeding.");
        return;
    }

    fetch("/stripe-checkout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            items: cart
        }),
    })
    .then((res) => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then((data) => {
        // Check if a URL is returned from the server
        if (data.url) {
            window.location.href = data.url;
        } else {
            console.error("Invalid URL received from the server:", data.url);
            alert("There was a problem with the payment process. Please try again.");
        }
    })
    .catch((err) => {
        console.error(err);
        alert("An error occurred during the payment process. Please try again later.");
    });
});
