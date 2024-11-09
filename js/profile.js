import { openMenu, closeMenu, showNoListsMessage, getDiv } from "./common.js";

const openMenuBtn = document.querySelector(".menu");
const closeMenuBtn = document.querySelector(".menu-close");
const listItems = document.querySelector(".list-items")

openMenuBtn.addEventListener("click", openMenu);
closeMenuBtn.addEventListener("click", closeMenu);

document.addEventListener("DOMContentLoaded", () => {
    // Getting to do lists from local storage
    const todoLists = JSON.parse(localStorage.getItem("todolists")) || null;

    if (todoLists)
    {
        // Getting total
        const total = todoLists.length;
        const totalDiv = getDiv("total", total);
        listItems.append(totalDiv);

        // Event
        totalDiv.addEventListener("click", () => {
            window.location.href = "total.html";
        })

        // Getting Success
        const successLists = todoLists.filter((todoList) => {
            return todoList.status == "success";
        })
        const successDiv = getDiv("success", successLists.length);
        listItems.append(successDiv);

        successDiv.addEventListener("click", () => {
            window.location.href = "success.html";
        })

        // Getting Remove
        const removeLists = todoLists.filter((todoList) => {
            return todoList.status == "removed";
        })
        const removeDiv = getDiv("remove", removeLists.length);
        listItems.append(removeDiv);

        removeDiv.addEventListener("click", () => {
            window.location.href = "remove.html";
        })

        // Getting importance-1 div
        const importance1Lists = todoLists.filter((todoList) => {
            return todoList.importance == 1;
        })
        const importance1Div = getDiv("important-1", importance1Lists.length);
        listItems.append(importance1Div);
        
        importance1Div.addEventListener("click", () => {
            window.location.href = "importance1.html";
        })

        // Getting importance-2 div
        const importance2Lists = todoLists.filter((todoList) => {
            return todoList.importance == 2;
        })
        const importance2Div = getDiv("important-2", importance2Lists.length);
        listItems.append(importance2Div);
        importance2Div.addEventListener("click", () => {
            window.location.href = "importance2.html";
        })

        // Getting importance-1 div
        const importance3Lists = todoLists.filter((todoList) => {
            return todoList.importance == 3;
        })
        const importance3Div = getDiv("important-3", importance3Lists.length);
        listItems.append(importance3Div);

        importance3Div.addEventListener("click", () => {
            window.location.href = "importance3.html";
        })

    }

    else 
    {
        showNoListsMessage();
    }
})