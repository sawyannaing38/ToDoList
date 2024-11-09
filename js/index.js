"use strict";

// Importing
import { openMenu, closeMenu } from "./common.js";

// Selecting Dom
const openMenuBtn = document.querySelector(".menu");
const closeMenuBtn = document.querySelector(".menu-close");
const headerDate = document.querySelector(".header-date");
const listItems = document.querySelector(".list-items");
const important1 = document.querySelector(".level-1");
const important2 = document.querySelector(".level-2");
const important3 = document.querySelector(".level-3");

// Getting today date
const today = new Date();

// ToDay string to match data format in local Storage
const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, 0)}-${String(today.getDate()).padStart(2, 0)}`;

// Event Listener
// for opening menu bar
openMenuBtn.addEventListener("click", openMenu);

// for closing menu bar
closeMenuBtn.addEventListener("click", closeMenu);
    

// for closing control buttons
document.addEventListener("click", () => {
    const controlBtns = document.querySelectorAll(".control-buttons")
    controlBtns.forEach((controlBtn) => {
        controlBtn.style.width = "0";
    })
})

document.addEventListener("DOMContentLoaded", () => {

    // Showing today date
    headerDate.textContent = today.toDateString();

    // Getting user to do lists
    const todoLists = JSON.parse(localStorage.getItem("todolists")) || null;

    // if todoLists exists in localStorage
    if (todoLists)
    {
        // Get to do lists for today date
        const todayLists = todoLists.filter((todoList) => {
            return todayString == todoList.dueDate;
        })

        // Show the user to do lists if exists
        if (todayLists.length > 0)
        {
            // Loop that lists and show
            for (const todayList of todayLists)
            {   
                if (todayList.status == "removed")
                {
                    return;
                }
                // Create an item
                const item = getListItem(todayList);
                listItems.append(item);

                // Adding event listener on more Btn
                const moreBtn = item.querySelector(".more-btn");

                if (moreBtn)
                {
                    moreBtn.addEventListener("click", (event) => {
                        event.stopPropagation();
                        moreBtn.nextElementSibling.style.width = "auto";
                    })

                    // Selecting success and remove 
                    const success = item.querySelector(".success");
                    const remove = item.querySelector(".remove");

                    // for success
                    success.addEventListener("click", () => successProgress(item))

                    remove.addEventListener("click", () => removeProgress(item))
                    }
    
            }
        }

        else 
        {   
            // Show there is no to do lists for today
            showNoListsMessage();
        }
    }

    // if todolists does not exists in localStorage
    else 
    {
        showNoListsMessage();
    }
})

// For Getting to do list item
function getListItem(obj)
{
    // Create a div with item class
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `<span class="hidden">${obj.importance}</span>`
    // Create another div with details class name
    const detailDiv = document.createElement("div");
    detailDiv.className = "details";

    // Create another div with importance class name
    const importanceDiv = document.createElement("div");
    importanceDiv.className = "importance";

    // Loop the important of obj
    for (let i = 0; i < obj.importance; i++)
    {
        importanceDiv.innerHTML += `
            <span class="material-symbols-outlined">
                grade
            </span>
        `;
    }

    // Appedning divTwo to item div
    detailDiv.append(importanceDiv);

    detailDiv.innerHTML += `
        <h2 class="item-title">${obj.title}</h2>
        <span class="status-${obj.status}">${obj.status}</span>
    `;

    div.append(detailDiv);

    if (obj.status == "unfinished")
    {
        div.innerHTML += `
        <div class="control">
            <span class="material-symbols-outlined more-btn">
                more_vert
            </span>
            <ul class="control-buttons">
                <li class="success">Success</li>
                <li class="remove">Remove</li>
            </ul>
        </div>
    `;
    }

    return div;

}

// For showing no to do lists
function showNoListsMessage()
{
    const p =document.createElement("p");
    p.className = "remind";
    p.innerHTML = `You don't have any to do lists.Add <a href="add.html">Here.</a>`;

    listItems.append(p);
}

// For Success Progress
function successProgress(obj)
{
    // Change the status to success
    const span = obj.querySelector(".status-unfinished");
    span.className = "status-success";
    span.textContent = "success";

    // Remove control div
    const control = obj.querySelector(".control");
    control.remove();

    // Getting title, importance level, due date
    const title = obj.querySelector(".item-title").textContent;
    const importance = obj.querySelector(".hidden").textContent;

    // Getting todolists from localStorage
    const todoLists = JSON.parse(localStorage.getItem("todolists"));

    // Chaning status of corresponding obj
    todoLists.forEach((todoList) => {

        if ((todoList.title) == title && (todoList.importance) == importance && (todoList.dueDate == todayString))
        {
            todoList.status = "success";
        }
    })

    // Store back to local Storage
    localStorage.setItem("todolists", JSON.stringify(todoLists));
}

// For Remove Progress
function removeProgress(obj)
{
    // Chage the status of obj to removed in local Storage
    // Getting title, importance level, due date
    const title = obj.querySelector(".item-title").textContent;
    const importance = obj.querySelector(".hidden").textContent;

    // Getting todolists from localStorage
    const todoLists = JSON.parse(localStorage.getItem("todolists"));

    // Chaning status of corresponding obj
    todoLists.forEach((todoList) => {

        if ((todoList.title) == title && (todoList.importance) == importance && (todoList.dueDate == todayString))
        {
            todoList.status = "removed";
        }
    })

    // Store back to local Storage
    localStorage.setItem("todolists", JSON.stringify(todoLists));

    // Remove the obj
    obj.remove();
}

// For important 1
important1.addEventListener("click", () => showImportant(1, important1));
important2.addEventListener("click", () => showImportant(2, important2));
important3.addEventListener("click", () => showImportant(3, important3));

// For showing list item based on important level
function showImportant(importance, btn)
{
    const buttons = document.querySelectorAll(".level");
    buttons.forEach((button) => {
        if (button == btn)
        {
            button.classList.add("active");
        }

        else 
        {
            button.classList.remove("active");
        }
    })
    const listItems = document.querySelectorAll(".item");

    listItems.forEach((listItem) => {
        if (listItem.querySelector(".hidden").textContent == importance)
        {
            listItem.style.display = "flex";
        }

        else 
        {
            listItem.style.display = "none";
        }
    })
}