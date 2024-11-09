
import { openMenu, closeMenu, showNoListsMessage, getListItem } from "./common.js";

const openMenuBtn = document.querySelector(".menu");
const closeMenuBtn = document.querySelector(".menu-close");
const totalList = document.querySelector(".total-list");
const listItems = document.querySelector(".list-items")

openMenuBtn.addEventListener("click", openMenu);
closeMenuBtn.addEventListener("click", closeMenu);

document.addEventListener("DOMContentLoaded", () => {
    // Get the total lists
    const todoLists = JSON.parse(localStorage.getItem("todolists"));

    if (todoLists)
    {
        // Get the total lists
        const totalLists = todoLists.length;

        // show total lists
        totalList.textContent = `${totalLists} items`;

        // Loop it
        for (const todoList of todoLists)
        {
            // Getting item
            const item = getTotalListItem(todoList);

            listItems.append(item);
        }
    }

    else 
    {
        // Show no todolists
        showNoListsMessage();
    }
})