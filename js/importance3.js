
import { openMenu, closeMenu, showNoListsMessage, getListItem } from "./common.js";

const openMenuBtn = document.querySelector(".menu");
const closeMenuBtn = document.querySelector(".menu-close");
const important3List = document.querySelector(".important3-list");
const listItems = document.querySelector(".list-items")

openMenuBtn.addEventListener("click", openMenu);
closeMenuBtn.addEventListener("click", closeMenu);

document.addEventListener("DOMContentLoaded", () => {
    // Get the total lists
    const todoLists = JSON.parse(localStorage.getItem("todolists"));

    if (todoLists)
    {
        // Get the list for success
        const important3Lists = todoLists.filter((todoList) => {
            return todoList.importance == 3;
        })

        const important3ListCount = important3Lists.length;

        important3List.textContent = `${important3ListCount} items`;

        if (important3ListCount != 0)
        {
            // loop the list and show
            for (const important3List of important3Lists)
            {
                const item = getListItem(important3List);

                listItems.append(item);
            }
        }

        else 
        {
            // Create a p
            const p = document.createElement("p");
            p.className = "remind";

            p.textContent = "No Important-3 list yet";
            listItems.append(p);
        }
    }

    else 
    {
        // Show no todolists
        showNoListsMessage();
    }
})