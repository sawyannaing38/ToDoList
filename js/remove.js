
import { openMenu, closeMenu, showNoListsMessage, getListItem } from "./common.js";

const openMenuBtn = document.querySelector(".menu");
const closeMenuBtn = document.querySelector(".menu-close");
const successList = document.querySelector(".remove-list");
const listItems = document.querySelector(".list-items")

openMenuBtn.addEventListener("click", openMenu);
closeMenuBtn.addEventListener("click", closeMenu);

document.addEventListener("DOMContentLoaded", () => {
    // Get the total lists
    const todoLists = JSON.parse(localStorage.getItem("todolists"));

    if (todoLists)
    {
        // Get the list for success
        const successLists = todoLists.filter((todoList) => {
            return todoList.status == "removed";
        })

        const successCount = successLists.length;

        successList.textContent = `${successCount} items`;

        if (successCount != 0)
        {
            // loop the list and show
            for (const successList of successLists)
            {
                const item = getListItem(successList);

                listItems.append(item);
            }
        }

        else 
        {
            // Create a p
            const p = document.createElement("p");
            p.className = "remind";

            p.textContent = "No Removed list yet";
            listItems.append(p);
        }
    }

    else 
    {
        // Show no todolists
        showNoListsMessage();
    }
})