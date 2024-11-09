// For opening menu Bar
function openMenu()
{
    const menuBar = document.querySelector(".menu-bar");
    menuBar.style.width = "225px";
}

// For closing menu Bar
function closeMenu()
{
    const menuBar = document.querySelector(".menu-bar");
    menuBar.style.width = "0px";
}

// For Getting to do list item
function getHomeListItem(obj)
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
    const listItems = document.querySelector(".list-items");
    const p =document.createElement("p");
    p.className = "remind";
    p.innerHTML = `You don't have any to do lists.Add <a href="add.html">Here.</a>`;

    listItems.append(p);
}

// For Getting item for total lists page
function getListItem(obj)
{
    // Create a div with item class name
    const item = document.createElement("div");
    item.className = "item";

    // Creae importance div
    const importance = document.createElement("div");
    importance.className = "importance";

    // Add stars to importance div
    for (let i = 0; i < obj.importance; i++)
    {
        importance.innerHTML += `
            <span class="material-symbols-outlined">
                grade
            </span>
        `;
    }

    item.append(importance);

    item.innerHTML += `
        <h3 class="item-title">${obj.title}</h3>
            <div class="date-list">
                <h4 class="added-date">Added Date: <span>${obj.addedDate}</span></h4>
                <h4 class="due-date">Due Date: <span>${obj.dueDate}</span></h4>
            </div>
        <span class="${obj.status} status">${obj.status}</span>
    `;

    return item;
}
// Exporting
export { openMenu, closeMenu, getHomeListItem, showNoListsMessage, getListItem };