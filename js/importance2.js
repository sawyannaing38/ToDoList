
import { openMenu, closeMenu, showNoListsMessage, getListItem } from "./common.js";

const openMenuBtn = document.querySelector(".menu");
const closeMenuBtn = document.querySelector(".menu-close");
const important2List = document.querySelector(".important2-list");
const listItems = document.querySelector(".list-items")

openMenuBtn.addEventListener("click", openMenu);
closeMenuBtn.addEventListener("click", closeMenu);

document.addEventListener("DOMContentLoaded", () => {
    // Get the total lists
    const todoLists = JSON.parse(localStorage.getItem("todolists"));

    if (todoLists)
    {
        // Get the list for success
        const important2Lists = todoLists.filter((todoList) => {
            return todoList.importance == 2;
        })

        const important2ListCount = important2Lists.length;

        important2List.textContent = `${important2ListCount} items`;

        if (important2ListCount != 0)
        {
            // loop the list and show
            for (const important2List of important2Lists)
            {
                const item = getListItem(important2List);

                listItems.append(item);
            }
        }

        else 
        {
            // Create a p
            const p = document.createElement("p");
            p.className = "remind";

            p.textContent = "No Important-2 list yet";
            listItems.append(p);
        }
    }

    else 
    {
        // Show no todolists
        showNoListsMessage();
    }
})