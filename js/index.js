"use strict";

// Importing
import { openMenu, closeMenu } from "./common.js";

// Selecting Dom
const openMenuBtn = document.querySelector(".menu");
const closeMenuBtn = document.querySelector(".menu-close");
const moreBtns = document.querySelectorAll(".more-btn");
const controlBtns = document.querySelectorAll(".control-buttons")

// Event Listener
// for opening menu bar
openMenuBtn.addEventListener("click", openMenu);

// for closing menu bar
closeMenuBtn.addEventListener("click", closeMenu);
    

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