
import { openMenu, closeMenu, showNoListsMessage, getListItem } from "./common.js";

const openMenuBtn = document.querySelector(".menu");
const closeMenuBtn = document.querySelector(".menu-close");
const RemoveList = document.querySelector(".remove-list");
const listItems = document.querySelector(".list-items")

openMenuBtn.addEventListener("click", openMenu);
closeMenuBtn.addEventListener("click", closeMenu);

document.addEventListener("DOMContentLoaded", () => {
    // Get the total lists
    const todoLists = JSON.parse(localStorage.getItem("todolists"));

    if (todoLists)
    {
        // Get the list for success
        const RemoveLists = todoLists.filter((todoList) => {
            return todoList.status == "removed";
        })

        const RemoveListCount = RemoveLists.length;

        RemoveList.textContent = `${RemoveListCount} items`;

        if (RemoveListCount != 0)
        {
            // loop the list and show
            for (const removeList of RemoveLists)
            {
                const item = getListItem(removeList);

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