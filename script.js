

let tasks = [];
let newTask = document.getElementById("newTask");
let btnAddTask = document.getElementById("btnAddTask");



btnAddTask.addEventListener("click", () => {
    if (newTask.value.length > 0) {
        addTasks();
        newTask.value = null;
    } else {
        alert("[ERRO!] O campo 'Insira uma tarefa' está vazio")
    }
})

newTask.addEventListener("keypress", (e) => {
    if (e.which == 13) {
        addTasks();
        newTask.value = null;
    }
})

window.onload = function () {
    tasks = JSON.parse(localStorage.getItem("toDoList")) || [];
    updateScreen();
}

function addTasks() {
    let values = {
        nome: newTask.value,
        id: gerarId(),
        done: false,
    }
    tasks.push(values);
    updateScreen();
}

function gerarId() {
    let id = Date.now();
    return id;
}

function updateScreen() {
    let list = document.getElementById("list");
    list.innerHTML = "";

    tasks.forEach((values => {
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(values.nome));
        li.setAttribute("item", values.id);
        list.appendChild(li);



        li.addEventListener("click", () => {
            checked(values.id);
        })
        

        let btnDel = document.createElement("button");
        btnDel.innerHTML = '<i class="fa fa-trash"></i>';
        btnDel.setAttribute("id", values.id);
        btnDel.classList.add("btnDel");
        li.appendChild(btnDel);

        btnDel.addEventListener("click", () => {
            let confirma = confirm("Deseja excluir essa tarefa?");
            if (confirma) {
                deleteItem(values.id);
            }

        })
        if(values.done == true){
            li.classList.add("done")
        } 
    }))
    localStorage.setItem("toDoList", JSON.stringify(tasks));
}



function deleteItem(id) {
    tasks = tasks.filter(values => values.id != id);
    updateScreen();
    setTimeout(() => alert("A tarefa foi excluída com sucesso!"), 500);
}

function checked(id) {
    tasks = tasks.filter(values => {
        if (values.id == id) {
            values.done = !values.done
        }
        return values;
    })
    updateScreen();
}


