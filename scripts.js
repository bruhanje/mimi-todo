
let tasks = []; // {title: "dddddd", done: false}

function renderEditor() {
    let inputEl = document.querySelector("#default-todo-panel .todo-editor > input");

    //inputEl.onchange = (e) => {
    //    console.log("text, ", e.target.value);
    //    // console.log("input change: " , e);
    // };

    let addTask = () => {
        if (inputEl.value.length === 0) {
            return;
        }

        let newTask = {
            title: inputEl.value,
            done: false,
        };

        inputEl.value = "";

        tasks.push(newTask);

        console.log("tasks: ", tasks);

        renderTaskItems();
    };

    inputEl.onkeypress = (e) => {

        if (e.key === "Enter") {
            addTask();
        }
    };

    let addEl = document.querySelector("#default-todo-panel .todo-editor > button");
    addEl.onclick = (e) => {
        addTask();
    };
}

function renderTaskItems() {
    console.log("render items");
    let itemsEl = document.querySelector("#default-todo-panel .todo-items");

    itemsEl.querySelectorAll("div").forEach((node) => node.remove());

    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let itemEl = document.createElement("div");
        itemEl.className = "task";

        let doneEl = document.createElement("input");
        doneEl.type = "checkbox";
        doneEl.checked = task.done;
        if (task.done) {
            itemEl.classList.add("done");
        } else {
            itemEl.classList.remove("done");
        }

        doneEl.onchange = (e) => {
            task.done = e.target.checked;
            if (task.done) {
                itemEl.classList.add("done");
            } else {
                itemEl.classList.remove("done");
            }
        }
        itemEl.append(doneEl);

        let titleEl = document.createElement("label");
        titleEl.innerText = task.title;
        itemEl.append(titleEl);

        let ctrlbarEl = renderTaskCtrlBar(tasks, i);
        
        itemEl.append(ctrlbarEl);

        itemsEl.append(itemEl);
    }
}


function renderTaskCtrlBar(tasks, taskIdx) {
    let ctrlbarEl = document.createElement("div");
    ctrlbarEl.className = "ctrlbar";

    let upEl = document.createElement("button");
    if (taskIdx === 0) {
        upEl.disabled = true;
    }
    upEl.innerText = "↑";
    upEl.onclick = (e) => {
		let curObj = tasks[taskIdx];//当前位置对象
		let preObj = tasks[taskIdx+1];//上一个位置对象
		tasks.splice(taskIdx,1,preObj);//上一个节点移动到当前节点
		tasks.splice(taskIdx+1,1,curObj);//当前节点往上移动
	}
    ctrlbarEl.append(upEl);

    let downEl = document.createElement("button");
    downEl.innerText = "↓";
    downEl.onclick = () => {
        let curObj = tasks[taskIdx];//当前位置对象
		let downObj = tasks[taskIdx-1];//下一个位置对象
		tasks.splice(taskIdx,1,downObj);//下一个节点移动到当前节点
		tasks.splice(taskIdx-1,1,curObj);//当前节点往下移动
    };
    ctrlbarEl.append(downEl);


    let cancelEl = document.createElement("button");
    cancelEl.innerText = "x";
    cancelEl.onclick = () => {
        tasks.splice(taskIdx, 1);
        renderTaskItems();
    };

    ctrlbarEl.append(cancelEl);
    
    return ctrlbarEl;
}

renderEditor();
renderTaskItems();