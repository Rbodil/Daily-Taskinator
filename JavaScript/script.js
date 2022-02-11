var tasksToDoEl = document.querySelector("#tasks-to-do");
var formEl = document.querySelector("#task-form")


function createTaskHandler(event) {
    event.preventDefault();
    
    var newTask = document.querySelector("input[name='task-name']").value;
    var newtType = document.querySelector("select[name = 'task-type']").value;
    console.dir(newtType)

    var listItemEl = document.createElement('li');
    listItemEl.className = "task-item";

    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + newTask + "</h3><span class='task-type'>" + newtType + "</span>";
    

    tasksToDoEl.appendChild(listItemEl);
    listItemEl.appendChild(taskInfoEl);
}
formEl.addEventListener('submit', createTaskHandler);