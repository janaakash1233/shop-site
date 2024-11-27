let header= document.querySelector("header");

window.addEventListener("scroll",()=>{
    header.classList.toggle("shadow",window.scrollY >0);
})


const products=[
{
    id:1,
    title:"Autumn Hoodie",
    price:5,
    image:
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1HU0FYGQa7NKySBDIYF6h2AoniGaNa61oVQ&s"
},
{
    id: 2,
    title: "Fusion Hoddie",
    price: 8,
    image: 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2zfcOSRfTlMiGg4-u2JbK4R9yqFacqD1e3Q&s"
},

{
    id: 3,
    title: "chestnut Hoddie",
    price: 2,
    image: 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpLOkYfhqHzIfEfthwVt_OPVU8vdMD-F3egg&s"
},

{
    id: 4,
    title: "Nike Hoddie",
    price: 3,
    image:
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbsi1lcrS-d6JRqGFX3NLrhGO8DpYK1QDeew&s"
},

{

    id: 5,
    title: "Foodie Hoddie",
    price: 2,
    image: 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4gfnSTLbZYRTuGQH8ccO4fPAOSYrYmG9bQQ&s"
},

{
    id: 6,
    title: "Anime T-shirt",
    price: 6,
    image: 
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDV_8ytoeopBSy5ZsfGjaNepM9EjZUjUXuCA&s"
},

{
    id: 7,
    title: "Denim",
    price: 5,
    image:
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmQDxMzGiOOeTmUn6xBoCSni7WXr_Ej5LQRQ&s"
},

{
 id: 8,
    title: "chestnut Hoddie",
    price: 8,
    image:
     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROszNVfH-aEOysDoDDq77LMykY-tGiYgR2Xg&s"
},

{
    id: 9,
       title: "peach silk",
       price: 2,
       image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHmWjxaLNdHIn8bDlTaal-VKAEXT3ktAdWcA&s"
   },
   

   {
    id: 10,
       title: "Cycle",
       price: 40,
       image:
       "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAZeA4sIfKbL2sAmUPQKV5tyE6i9-s32sAxw&s"
   },

   {
    id: 11,
       title: "School Bag",
       price: 80,
       image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRENX-Rmb_2NrBy-Up1wUze5Zd7UA2C7aBL0w&s"
   },

   {
    id: 12,
       title: "Trolley Bag",
       price: 8,
       image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaGvNzpLFkUBz-Yx_IwYDrWr5qIFZFNnRa7g&s"
   },

 ];
 let cart = JSON.parse(localStorage.getItem('cart')) || [];

 // Function to render products on the page
 function renderProducts() {
     document.getElementById("productList").innerHTML = products
         .map((product) => `
             <div class="product-card">
                 <img src="${product.image}" alt="${product.title}" class="product-img"/>
                 <div class="product-info">
                     <h2 class="product-title">${product.title}</h2>
                     <p class="product-price">₹${product.price.toFixed(2)}</p>
                     <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                 </div>
             </div>
         `)
         .join("");
 
     // Add event listeners to "Add to Cart" buttons
     const addToCartButtons = document.getElementsByClassName('add-to-cart');
     for (let i = 0; i < addToCartButtons.length; i++) {
         addToCartButtons[i].addEventListener('click', addToCart);
     }
 }
 
 // Function to handle adding items to the cart
 function addToCart(event) {
     const productID = parseInt(event.target.dataset.id);
     const product = products.find((product) => product.id === productID);
 
     if (product) {
         const existingItem = cart.find((item) => item.id === productID);
 
         if (existingItem) {
             existingItem.quantity++;
         } else {
             const cartItem = {
                 id: product.id,
                 title: product.title,
                 price: product.price,
                 image: product.image,
                 quantity: 1,
             };
             cart.push(cartItem);
         }
         event.target.textContent = "Added";
         event.target.classList.add('added');
         updateCartIcon();
         saveToLocalStorage();
         renderCartItems();
         calculateCartTotal();
     }
 }
 
 // Function to handle removing items from the cart
 function removeFromCart(event) {
     const productID = parseInt(event.target.dataset.id);
     cart = cart.filter((item) => item.id !== productID);
 
     saveToLocalStorage();
     renderCartItems();
     calculateCartTotal();
     updateCartIcon();

 }
 
 // Function to handle quantity change
 function changeQuantity(event) {
     const productID = parseInt(event.target.dataset.id);
     const quantity = parseInt(event.target.value);
 
     if (quantity > 0) {
         const cartItem = cart.find((item) => item.id === productID);
         if (cartItem) {
             cartItem.quantity = quantity;
             saveToLocalStorage();
             calculateCartTotal();
             updateCartIcon();
         }
     }
 }
 
 // Function to save cart to localStorage
 function saveToLocalStorage() {
     localStorage.setItem('cart', JSON.stringify(cart));
 }
 
 // Function to render cart items
 function renderCartItems() {
     if (cart.length === 0) {
         document.getElementById("cartItems").innerHTML = "<p>Your cart is empty!</p>";
         document.getElementById("cartTotal").textContent = "Total: ₹0.00";
     } else {
         document.getElementById("cartItems").innerHTML = cart
             .map((item) => `
                 <div class="cart-item">
                     <img src="${item.image}" alt="${item.title}"/>
                     <div class="cart-item-info">
                         <h2 class="cart-item-title">${item.title}</h2>
                         <input  
                             class="cart-item-quantity" 
                             type="number"
                             min="1" 
                             value="${item.quantity}"
                             data-id="${item.id}"
                         />
                     </div>
                     <h2 class="cart-item-price">₹${(item.price * item.quantity).toFixed(2)}</h2>
                     <button class="remove-from-cart" data-id="${item.id}">Remove</button>
                 </div>
             `)
             .join("");
 
         // Add event listeners for removing items
         const removeButtons = document.getElementsByClassName('remove-from-cart');
         for (let i = 0; i < removeButtons.length; i++) {
             removeButtons[i].addEventListener('click', removeFromCart);
         }
 
         // Add event listeners for quantity change
         const quantityInputs = document.getElementsByClassName('cart-item-quantity');
         for (let i = 0; i < quantityInputs.length; i++) {
             quantityInputs[i].addEventListener('change', changeQuantity);
         }
     }
 }
 
 // Function to calculate and display cart total
 function calculateCartTotal() {
     const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
     document.getElementById('cartTotal').textContent = `Total: ₹${total.toFixed(2)}`;
 }
 
 // Function to update the cart icon quantity
 function updateCartIcon() {
     const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
     const cartIcon = document.getElementById('cart-icon');
     if (cartIcon) {
         cartIcon.setAttribute("data-quantity", totalQuantity);
     }
 }
 
 // Function to clear the cart (e.g., after checkout)
 function clearCart() {
     cart = [];
     saveToLocalStorage();
     updateCartIcon();
     renderCartItems();
     calculateCartTotal();
 }
 
 // Initialize the page based on the current URL
 document.addEventListener('DOMContentLoaded', () => {
     if (window.location.pathname.includes("cart.html")) {
         renderCartItems();
         calculateCartTotal();
     } else if (window.location.pathname.includes("success.html")) {
         clearCart();
     } else {
         renderProducts();
         updateCartIcon();
     }
 
     // Update cart icon on storage change
     function updateCartIconOnCartChange() {
         updateCartIcon();
     }
     window.addEventListener('storage', updateCartIconOnCartChange);
 });