import { openMenu, closeMenu, showNoListsMessage, getListItem } from "./common.js";

// Selecting Dom
const openMenuBtn = document.querySelector(".menu");
const closeMenuBtn = document.querySelector(".menu-close");
const rightBtn = document.querySelector(".right");
const leftBtn = document.querySelector(".left");
const date = document.querySelector(".date");
const listItems = document.querySelector(".list-items");
// Getting today
const today = new Date();
const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, 0)}-${today.getDate()}`;

// Getting to do lists from local storage
const todoLists = JSON.parse(localStorage.getItem("todolists")) || null;

// State variables
let index;
let dateArr;

openMenuBtn.addEventListener("click", openMenu);
closeMenuBtn.addEventListener("click", closeMenu);

document.addEventListener("DOMContentLoaded", () => {

    // Check to do lists exists
    if (todoLists)
    {   
        dateArr = new Array();

        todoLists.forEach((todoList) => {
            dateArr.push(todoList.dueDate);
        })

        // Convert dateArr to only contains uniquie due date
        dateArr = [...new Set(dateArr)];
        dateArr.sort();

        // Get the index of todayString
        index = dateArr.indexOf(todayString);

        // Display correct arrow 
        displayNavigation(index, leftBtn, rightBtn, dateArr);

        // Change date text Content
        date.textContent = "Today";
        
        if (index == -1)
        {
            // Show no to do lists for today
            showNoListsMessage();
            return;
        }

        // Show to do lists for the index of day
        showToDoLists(dateArr[index]);

    }

    // if no exists
    else 
    {
        leftBtn.style.display = "none";
        rightBtn.style.display = "none";

        // Show there is no to do lists
        showNoListsMessage();
    }
})

// For display correct arrow
function displayNavigation(index, left, right, dateArr)
{   
    if ((index < 0))
    {
        if (dateArr.length == 0)
        {
            left.style.visibility = "hidden";
            right.style.visibility = "hidden";
        }

        else 
        {
            right.style.visibility = "visible";
        }
    }

    else if (index == 0)
    {
        if (dateArr.length - 1 == index)
        {
            left.style.visibility = "hidden";
            right.style.visibility = "hidden";
        }

        else 
        {
            left.style.visibility = "hidden";
            right.style.visibility = "visible";
        }
    }

    else 
    {
        if (dateArr.length - 1 == index)
        {
            right.style.visibility = "hidden";
            left.style.visibility = "visible";
        }

        else 
        {
            right.style.visibility = "visible";
            left.style.visibility = "visible";
        }
    }
}

// Showing to do lists for a specific due date
function showToDoLists(dueDate)
{
    // Getting to do lists for dueDate
    const lists = todoLists.filter((todoList) => {
        return todoList.dueDate == dueDate;
    })

    for (const list of lists)
    {

        const item = getListItem(list);
        listItems.append(item);
    }
}

// Adding Event listener on left
leftBtn.addEventListener("click", () => {
    
    // Reduce index by 1
    index -= 1;

    displayNavigation(index, leftBtn, rightBtn, dateArr);

    // Remove all list items
    const listItemChildrens = listItems.children;

    for (const listItemChildren of listItemChildrens)
    {
        listItemChildren.remove();
    }

    if (dateArr[index] == todayString)
    {
        date.textContent = "Today";
    }

    else 
    {
        // Change text Content of date
        date.textContent = dateArr[index];
    }

    // Get to do lists for that day
    showToDoLists(dateArr[index]);
    
})

// Adding Event listener on left
rightBtn.addEventListener("click", () => {
    
    // Reduce index by 1
    index += 1;

    displayNavigation(index, leftBtn, rightBtn, dateArr);
    
    // Remove all list items
    const listItemChildrens = listItems.children;

    for (const listItemChildren of listItemChildrens)
    {
        listItemChildren.remove();
    }

    if (dateArr[index] == todayString)
    {
        date.textContent = "Today";
    }

    else 
    {
        // Change text Content of date
        date.textContent = dateArr[index];
    }

    // Get to do lists for that day
    showToDoLists(dateArr[index]);
    
})