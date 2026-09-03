const API_URL = "/api/tasks";

// Load tasks when page opens
window.onload = function () {
    loadTasks();
};


// Get all tasks
function loadTasks() {

    fetch(API_URL)
        .then(response => response.json())
        .then(tasks => {

            const taskList = document.getElementById("taskList");

            taskList.innerHTML = "";

            tasks.forEach(task => {

                const taskCard = document.createElement("div");

                taskCard.className = "task-card";

                taskCard.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>${task.description || ""}</p>
                    <p><strong>Due:</strong> ${task.dueDate}</p>
                    <p><strong>Priority:</strong> ${task.priority}</p>
                `;

                taskList.appendChild(taskCard);
            });
        })
        .catch(error => {
            console.error("Error loading tasks:", error);
        });
}


// Add a new task
function addTask() {

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("dueDate").value;
    const priority = document.getElementById("priority").value;

    if (!title || !dueDate || !priority) {
        alert("Please fill in title, due date and priority.");
        return;
    }

    const task = {
        title: title,
        description: description,
        dueDate: dueDate,
        priority: priority
    };

    fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    })
        .then(response => response.json())
        .then(() => {

            alert("Task added successfully!");

            document.getElementById("title").value = "";
            document.getElementById("description").value = "";
            document.getElementById("dueDate").value = "";
            document.getElementById("priority").value = "";

            loadTasks();
        })
        .catch(error => {
            console.error("Error adding task:", error);
            alert("Could not add task.");
        });
}