let menu = document.querySelector(".navbar");
let menuIcon = document.querySelector("#menu-icon");

// Ensure the menuIcon exists before adding the event listener
if (menuIcon) {
    menuIcon.onclick = () => {
        // Toggle the class 'active' on the menu
        menu.classList.toggle("active");
    };
}
