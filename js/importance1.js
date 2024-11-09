
import { openMenu, closeMenu, showNoListsMessage, getListItem } from "./common.js";

const openMenuBtn = document.querySelector(".menu");
const closeMenuBtn = document.querySelector(".menu-close");
const important1List = document.querySelector(".important1-list");
const listItems = document.querySelector(".list-items")

openMenuBtn.addEventListener("click", openMenu);
closeMenuBtn.addEventListener("click", closeMenu);

document.addEventListener("DOMContentLoaded", () => {
    // Get the total lists
    const todoLists = JSON.parse(localStorage.getItem("todolists"));

    if (todoLists)
    {
        // Get the list for success
        const important1Lists = todoLists.filter((todoList) => {
            return todoList.importance == 1;
        })

        const important1ListCount = important1Lists.length;

        important1List.textContent = `${important1ListCount} items`;

        if (important1ListCount != 0)
        {
            // loop the list and show
            for (const important1List of important1Lists)
            {
                const item = getListItem(important1List);

                listItems.append(item);
            }
        }

        else 
        {
            // Create a p
            const p = document.createElement("p");
            p.className = "remind";

            p.textContent = "No Important-1 list yet";
            listItems.append(p);
        }
    }

    else 
    {
        // Show no todolists
        showNoListsMessage();
    }
})