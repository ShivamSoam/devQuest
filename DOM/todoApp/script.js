let inputBox  = document.querySelector(".input-box");
let todoList = document.querySelector(".todoList");
let count = 0;
let addTodoBtn = document.querySelector(".addTodoBtn");
addTodoBtn.addEventListener("click",function(e)
{
    
    let todoText = inputBox.value;
    console.log(todoText);
    if(todoText)
    {
        count++;
        let todoDiv = document.createElement("div");
        todoDiv.classList.add("todoDiv");
        let todoLi = document.createElement("li");
        todoLi.classList.add("todo");
        todoLi.classList.add(`${count}`);
        todoLi.innerText = todoText;
        let deleteTodoBtn = document.createElement("button");
        deleteTodoBtn.addEventListener("click",function(e){
            e.target.parentNode.remove();
        })
        deleteTodoBtn.innerText = "Delete Todo"
        deleteTodoBtn.classList.add("deleteTodoBtn");
        todoDiv.append(todoLi);
        todoDiv.append(deleteTodoBtn);
        todoList.append(todoDiv);
        inputBox.value = "";
    }
    
})


