"use strict";

// Selecting Dom
const openMenuBtn = document.querySelector(".menu");
const closeMenu = document.querySelector(".menu-close");
const menuBar = document.querySelector(".menu-bar");
const moreBtns = document.querySelectorAll(".more-btn");
const controlBtns = document.querySelectorAll(".control-buttons")

// Event Listener
// for opening menu bar
openMenuBtn.addEventListener("click", () => {
    // show menu bar
    menuBar.style.width = "225px";
})

// for closing menu bar
closeMenu.addEventListener("click", () => {
    // close menu bar 
    menuBar.style.width = "0";
})

// for opening control btns
moreBtns.forEach((moreBtn) => {
    moreBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        // show nextSibling Element
        moreBtn.nextElementSibling.style.width = "auto";
    })
})

// for closing control buttons
document.addEventListener("click", () => {
    controlBtns.forEach((controlBtn) => {
        controlBtn.style.width = "0";
    })
})