// For opening menu Bar
function openMenu()
{
    const menuBar = document.querySelector(".menu-bar");
    menuBar.style.width = "225px";
}

// For closing menu Bar
function closeMenu()
{
    const menuBar = document.querySelector(".menu-bar");
    menuBar.style.width = "0px";
}

// Exporting
export { openMenu, closeMenu };