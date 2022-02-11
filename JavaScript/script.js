var tasksToDoEl = document.querySelector("#tasks-to-do");
var formEl = document.querySelector("#task-form");
var taskIdCounter = 0;
var pageContEl = document.querySelector('#page-content');
var tasksInProgressEl = document.querySelector('#tasks-in-progress');
var tasksCompletedEl = document.querySelector('#tasks-completed');

function deleteTask(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();

};
function editTask(taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    var taskType = taskSelected.querySelector("h3.task-type").textContent;
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";

    formEl.setAttribute("data-task-id", taskId);
}
function completeEditTask(taskName, taskType, taskId){
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;
    alert("Task Updated Successfully");
    formEl.setAttribute("data-task-id", taskId);
    document.querySelector("#save-task").textContent = "Add Task";
}

function taskFormHandler(event) {
    event.preventDefault();
    
    var newTask = document.querySelector("input[name='task-name']").value;
    var newtType = document.querySelector("select[name = 'task-type']").value;

    if(!newTask || !newtType) {
        alert("You must fill out the form");
        return false;
    }
    formEl.reset();

    var isEdit = formEl.hasAttribute("data-task-id");
        if(isEdit){
            var taskId = formEl.getAttribute("data-task-id");
            completeEditTask(newTask, newtType, taskId);
        }
        else {
            var taskDataObj = {
                name: newTask,
                type: newtType
            };
        }    

    createTaskEl(taskDataObj);
    
};


function createTaskEl(taskDataObj){
    
    var listItemEl = document.createElement('li');
    listItemEl.className = "task-item";

    listItemEl.setAttribute("data-task-id",taskIdCounter)

    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActsEl = createTaskActs(taskIdCounter);
    listItemEl.appendChild(taskActsEl);
    tasksToDoEl.appendChild(listItemEl);
    
    taskIdCounter++;
    
};

function createTaskActs(taskId){
    var actionContEl = document.createElement('div');
    actionContEl.className = "task-actions";

    var editButtonEl = document.createElement('button');
    editButtonEl.textContent = 'Edit';
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute('data-task-id', taskId);

    actionContEl.appendChild(editButtonEl);  

    var deleteButtonEl = document.createElement('button');
    deleteButtonEl.textContent = 'Delete';
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute('data-task-id', taskId);

    actionContEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement('select');
    statusSelectEl.setAttribute('name', 'status-change');
    statusSelectEl.setAttribute('data-task-id', taskId);
    statusSelectEl.className = 'select-status';
    
    actionContEl.appendChild(statusSelectEl);

    var statusChoices = ['To Do', 'In Progress', 'Completed'];

    for(var i=0; i < statusChoices.length; i++){
        var statusOptionEl = document.createElement("option");
        statusOptionEl.setAttribute('value', statusChoices[i]);
        statusOptionEl.textContent = statusChoices[i];
        
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContEl;
}

function taskStatusChangeHandler(event){
    var taskId = event.target.getAttribute('data-task-id');
    var statusValue = event.target.value.toLowerCase();
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']")

    if(statusValue === 'to do'){
        tasksToDoEl.appendChild(taskSelected);
    }
    else if(statusValue  === 'in progress'){
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if(statusValue === 'completed'){
        tasksCompletedEl.appendChild(taskSelected);
    }
};



function taskButtonHandler(event){
    var targetEl = event.target;

    
    if(targetEl.matches('edit.btn')){
        var taskId = event.target.getAttribute('data-task-id');
        editTask(taskId);
    }    
    else if(targetEl.matches('delete.btn')){
        var taskId = event.target.getAttribute('data-task-id');
        deleteTask(taskId);
    }
    
};

formEl.addEventListener('submit', taskFormHandler);
pageContEl.addEventListener('click', taskButtonHandler);
pageContEl.addEventListener("change", taskStatusChangeHandler)


