"use strict";

import { openMenu, closeMenu } from "./common.js";

// DOM Selecting
const openMenuBtn = document.querySelector(".menu");
const closeMenuBtn = document.querySelector(".menu-close");
const titleInput = document.querySelector("#title");
const dueDateInput = document.querySelector("#dueDate");
const importanceInput = document.querySelector("#importance");
const addBtn = document.querySelector(".addBtn");
const warningMessage = document.querySelector(".warning");

// Event Listener
openMenuBtn.addEventListener("click", openMenu);
closeMenuBtn.addEventListener("click", closeMenu);

// For saving user input local storage
addBtn.addEventListener("click", () => {
    // Get 3 user input
    const title = titleInput.value;
    const dueDate = dueDateInput.value;
    const importance = importanceInput.value;

    // warn the user if at least one is empty

    // For empty title
    if (!title.trim())
    {
        warningMessage.textContent = "Missing Title or Empty Title";
        return;
    }

    // For empty date
    if (!dueDate.trim())
    {
        warningMessage.textContent = "Missing Date or Empty Date";
        return;
    }

    // If the date is in the past 
    const today = new Date();

    const todayYear = today.getFullYear();
    const todayMonth = today.getMonth() + 1;
    const todayDay = today.getDate();

    let [userInputYear, userInputMonth, userInputDay] = dueDate.split("-", 3);
    [userInputYear, userInputMonth, userInputDay] = [Number(userInputYear), Number(userInputMonth), Number(userInputDay)];

    if (userInputYear < todayYear)
    {
        warningMessage.textContent = "Already too late";
        return;
    }

    if (userInputMonth < todayMonth)
    {
        warningMessage.textContent = "Already too late";
        return;
    }
    
    if (userInputDay < todayDay)
    {
        warningMessage.textContent = "Already too late";
        return;
    }

    // For empty importance level, out of range importance and invalid importance
    if (!importance)
    {
        warningMessage.textContent = "Empty Importance Level";
        return;
    }

    if (!Number(importance))
    {
        warningMessage.textContent = "Invalid Importance Level";
        return;
    }

    if (Number(importance) < 1 || Number(importance) > 3)
    {
        warningMessage.textContent = "Importance Level out of range";
        return;
    }

    // Clearning warning message
    warningMessage.textContent = "";

    // Store three values inside the localStorage
    const todoLists = JSON.parse(localStorage.getItem("todolists")) || [];

    // Adding
    todoLists.push({
        "addedDate" : today.toLocaleDateString(),
        "title" : title,
        "dueDate" : dueDate,
        "importance" : importance,
        "status" : "unfinished"
    })

    // Storing back to local Storage
    localStorage.setItem("todolists", JSON.stringify(todoLists));

    // clearing the user input
    titleInput.value = "";
    dueDateInput.value = "";
    importanceInput.value = "";

    // Back to home page
    window.location.href = "index.html";
})