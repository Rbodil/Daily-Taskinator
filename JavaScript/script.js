var tasksToDoEl = document.querySelector("#tasks-to-do");
var formEl = document.querySelector("#task-form");


function taskFormHandler(event) {
    event.preventDefault();
    
    var newTask = document.querySelector("input[name='task-name']").value;
    var newtType = document.querySelector("select[name = 'task-type']").value;

    if(!newTask || !newtType) {
        alert("You must fill out the form");
        return false;
    }
    formEl.reset();

    var taskDataObj = {
        name: newTask,
        type: newtType
    };

    createTaskEl(taskDataObj);
    
};


function createTaskEl(taskDataObj){
    
    var listItemEl = document.createElement('li');
    listItemEl.className = "task-item";

    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    

    tasksToDoEl.appendChild(listItemEl);
    listItemEl.appendChild(taskInfoEl);
    
};



formEl.addEventListener('submit', taskFormHandler);