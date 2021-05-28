// Constants and Variables
const addBtn = document.querySelector('.add-btn');
const clearBtn = document.querySelector('.clear-btn');
const inputText = document.querySelector('.input');
var todoList = document.querySelector('.todo-list');

let todos = [];
let text;

// Functions
function updateTodo(){
    if(localStorage.getItem('list') === null){
        todos = [];
    }else{
        todos = (localStorage.getItem('list')).split(",");
    }
    displayTodo(todos);
}

function addTodo(e){
    e.preventDefault()
    if(inputText.value === ""){
        return
    }
    text = inputText.value;
    todos.push(text);
    updateLocalStorage(todos);
    displayTodo(todos);
}

function displayTodo(list){
    todoList.innerHTML = "";
    list.forEach(item => {
        if(item === "") return;
        todoList.innerHTML +=
        `<div class="todos">
        <p class="items">${item}</p>
        <div style="display: flex;">
        <i class="fas fa-check check-icon"></i>
        <i class="fas fa-trash dustbin-icon"></i>
        </div>
        </div>`;
    });
    inputText.value = "";
    var deleteIcons = document.querySelectorAll('.dustbin-icon');
    var checkIcons = document.querySelectorAll('.check-icon');

    deleteIcons.forEach((element,index) =>{
        element.addEventListener('click', ()=>{
            deleteElement(index)
        });
    });
    checkIcons.forEach(checks =>{
        checks.addEventListener('click',()=>{
            checkItems(checks);
        })
    });
}

function updateLocalStorage(tasks){
    localStorage.setItem('list' , tasks);
}

function deleteElement(i){
    todos.splice(i,1);
    updateLocalStorage(todos);
    updateTodo();
}

function checkItems(check){
    var c = check.parentElement;
    c.previousElementSibling.style.textDecoration = "line-through";
    c.parentElement.style.backgroundColor = "rgba(255,255,255,0.6)";
    c.parentElement.style.transform = "scale(0.9)";
}

// Events 

addBtn.addEventListener('click',(e)=>{
    addTodo(e)
});

clearBtn.addEventListener('click',()=>{
    localStorage.clear()
    updateTodo();
})

window.addEventListener('load', updateTodo);
