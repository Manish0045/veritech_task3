document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const pendingList = document.getElementById("pendingList");
    const completedList = document.getElementById("completedList");
    const clearTaskBtn = document.getElementById('clearList');

    // Load tasks from local storage on page load
    loadTasks();

    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const li = document.createElement("li");
            li.innerText = taskText;
            const deleteIcon = document.createElement("i");
            deleteIcon.className = "fas fa-trash-alt";
            deleteIcon.addEventListener("click", function () {
                li.remove();
                saveTasks();
            });
            li.appendChild(deleteIcon);
            pendingList.appendChild(li);
            taskInput.value = "";
            saveTasks();
        }
    });

    pendingList.addEventListener("click", function (event) {
        if (event.target.tagName === "LI") {
            const task = event.target;
            task.remove();
            const completedTask = document.createElement("li");
            completedTask.innerText = task.innerText;
            const deleteIcon = document.createElement("i");
            deleteIcon.className = "fas fa-trash-alt";
            deleteIcon.addEventListener("click", function () {
                completedTask.remove();
                saveTasks();
            });
            completedTask.appendChild(deleteIcon);
            completedList.appendChild(completedTask);
            // Save only the last five completed tasks
            if (completedList.children.length > 5) {
                completedList.removeChild(completedList.firstElementChild);
            }
            saveTasks();
        }
    });

    function loadTasks() {
        const pendingTasks = JSON.parse(localStorage.getItem("pendingTasks")) || [];
        const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

        // Load pending tasks
        pendingTasks.forEach(function (taskText) {
            const li = document.createElement("li");
            li.innerText = taskText;
            const deleteIcon = document.createElement("i");
            deleteIcon.className = "fas fa-trash-alt";
            deleteIcon.addEventListener("click", function () {
                li.remove();
                saveTasks();
            });
            li.appendChild(deleteIcon);
            pendingList.appendChild(li);
        });

        // Load completed tasks
        completedTasks.forEach(function (taskText) {
            const li = document.createElement("li");
            li.innerText = taskText;
            const deleteIcon = document.createElement("i");
            deleteIcon.className = "fas fa-trash-alt";
            deleteIcon.addEventListener("click", function () {
                li.remove();
                saveTasks();
            });
            li.appendChild(deleteIcon);
            completedList.appendChild(li);
        });
    }

    function saveTasks() {
        const pendingTasks = [];
        const pendingTaskElements = pendingList.querySelectorAll("li");
        pendingTaskElements.forEach(function (task) {
            pendingTasks.push(task.innerText);
        });
        localStorage.setItem("pendingTasks", JSON.stringify(pendingTasks));

        const completedTasks = [];
        const completedTaskElements = completedList.querySelectorAll("li");
        completedTaskElements.forEach(function (task) {
            completedTasks.push(task.innerText);
        });
        localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }


});
