let addbtn = document.getElementById("btn");
let inputTask = document.getElementById("input");
let tasklist = document.getElementById("tasklist");
let delBtn = document.querySelector(".del");
let totalTask = document.getElementById("totaltask");
let completedTask = document.getElementById("completed");
let pendingTask = document.getElementById("pending");


// function to update task count
function updateTaskCount() {
    let total = tasklist.children.length;
    totalTask.textContent = "Total Tasks: " + total;
}

function updateCompletedCount() {
    let completed = tasklist.querySelectorAll(".checkTask:checked").length;
    completedTask.textContent = "Completed: " + completed;
}

function updatePendingCount() {
    let total = tasklist.children.length;
    let completed = tasklist.querySelectorAll(".checkTask:checked").length;
    let pending = total - completed;
    pendingTask.textContent = "Pending: " + pending;
}


// Function to add task
function addTask() {

    let taskText = inputTask.value.trim();

    if (taskText === "") {
        alert("Please Enter the task first...");
        return;
    }

    let row = document.createElement("tr");

    row.innerHTML = `
        <td>
            <input type="checkbox" class="checkTask">
        </td>

        <td class="taskText">
            ${taskText}
        </td>
        
        <td class="priority">
            <select>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
        </td>

        <td class="dateTime">
            ${new Date().toLocaleDateString()} <br>
            ${new Date().toLocaleTimeString()}
        </td>

        <td>
            <button class="edit">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
        </td>

        <td>
            <button class="delete">
                <i class="fa-solid fa-trash"></i>
            </button>
        </td>
    `;

    tasklist.appendChild(row);
    
    

    let checkBox = row.querySelector(".checkTask");
    let taskCell = row.querySelector(".taskText");
    let deleteBtn = row.querySelector(".delete");
    let editBtn = row.querySelector(".edit");
    let priorityCell = row.querySelector(".priority");
    let dateTimeCell = row.querySelector(".dateTime");
    let prioritySelect = row.querySelector("select");

    prioritySelect.style.backgroundColor = "rgb(15, 235, 15)";
    prioritySelect.style.color = "white";

    updateTaskCount();
     inputTask.value = "";

    // Complete Task
    checkBox.addEventListener("change", function () {
        
        taskCell.classList.toggle("completed");
        dateTimeCell.classList.toggle("completed");
        prioritySelect.classList.toggle("completed");
        
        updateCompletedCount();
        updatePendingCount();
    });

    // priority change event
    prioritySelect.addEventListener("change", function () {

    if (prioritySelect.value === "low") {
        prioritySelect.style.backgroundColor = "rgb(15, 235, 15)";
        prioritySelect.style.color = "white";
    }

    else if (prioritySelect.value === "medium") {
        prioritySelect.style.backgroundColor = " rgb(235, 161, 22)";
        prioritySelect.style.color = "white";
    }

    else if (prioritySelect.value === "high") {
        prioritySelect.style.backgroundColor = " rgb(238, 14, 14)";
        prioritySelect.style.color = "white";
    }

});

    // Edit Task
    editBtn.addEventListener("click", function () {
        let newTaskText = prompt("Edit Task:", taskCell.textContent);
        if (newTaskText !== null && newTaskText.trim() !== "") {
            taskCell.textContent = newTaskText.trim();

        }
    });

    // Delete One Task
    deleteBtn.addEventListener("click", function () {
        if(confirm("Delete this task?")){
            row.remove();
        }
        updateTaskCount();
        updateCompletedCount();
        updatePendingCount();   
    });
    
    inputTask.focus();
}

// Add Button Click
addbtn.addEventListener("click", addTask);

// Press Enter to Add Task
inputTask.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addTask();
    }

});

// Delete All Tasks
delBtn.addEventListener("click", function () {

    if (tasklist.innerHTML === "") {
        alert("No Task Available");
        return;
    }

    tasklist.innerHTML = "";
    updateTaskCount();
    updateCompletedCount();
    updatePendingCount();

});



