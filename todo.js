const input = document.getElementById('input-todo');
const form = document.querySelector('form1');
const ul = document.querySelector('ul');
const clear = document.querySelector('#clear');
const element = document.body;
const container = document.querySelector("input");
const clearDark = document.getElementById("clearr");
const allActive = document.getElementById("all-active");;
const imageDark = document.getElementById("moon");
const imageSun = document.getElementById("sun");
const darkMode = document.getElementById('icons');
const sum = document.getElementById("sum");
const complet = document.getElementById("complet");
const active = document.getElementById("Active");
const allTodo = document.getElementById("All");
let dragedItem = null;
let todo;
let tasks = [];

input.addEventListener("keypress", function(event) {
    
  if (event.key === "Enter") {
      event.preventDefault();
        //tu carieli ar aris mnishvneloba daabrunos 'trim' mushaobs amistvis, aseve ashorebs sicarieles tavidan da bolodan
        if (input.value.trim()){
          todo = {
            todo: input.value,
            completed: false,
          }
          tasks.push(todo);
          localStorage.setItem("tasks", JSON.stringify(tasks));
           addTodo(todo);
           sum.textContent = tasks.length+" items left";
        } 
  }
});

function addTodo(todo){
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;

  const span = document.createElement('span');
  span.textContent = todo.todo;
  var li = document.createElement('li');
  li.draggable = true;
  var image = document.createElement('img');
  image.src='./images/icon-cross.svg';
  // const image = document.createElement("image")
  //daematos lis x ghilaki
  image.classList.add('image-style');
  
  
  li.addEventListener("dragstart", (event) => {
    dragedItem = event.currentTarget;
  });
  li.addEventListener("dragend", () =>{
    dragedItem = null;
  });

  //checkbox daklikebit vcvlit da vusvamt xazs tu monishnulia, tu ar aris vashorebt
  checkbox.addEventListener('change', () => {
    todo.completed = !todo.completed; 
      if (todo.completed) {
          span.classList.add('line');  
      } else {
          span.classList.remove('line');
      }
      localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  if(todo.completed) {
      span.classList.add('line');  
    } else {
      span.classList.remove('line');
    };

  // span.textContent = todo.todo;
  li.appendChild(checkbox);
  li.appendChild(span);
  ul.appendChild(li);
  li.appendChild(image);

  // when dark mode is on new li elements add new li class style
  const isDarkModeOn = document.body.classList.contains("dark-body");
  if (isDarkModeOn) {
    li.classList.add("li-dark");
  }

  //axali teqstis sheyvanis shemdeg gasuftavdes da dafokusdes
  input.value = ' ';
  input.focus();

  //buttons 

  clear.addEventListener("click", () => {
    tasks = tasks.filter(task => task.completed === false);
    removeListElement();
    tasks.forEach(addTodo);
    sum.textContent = tasks.length + " items left";
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  complet.addEventListener("click", () => {
    const completed = tasks.filter(task => task.completed === true);
    removeListElement();
    completed.forEach(addTodo);
    sum.textContent = tasks.length-completed.length + " items left";
  });

  active.addEventListener("click", () => {
    const actives = tasks.filter(task => task.completed === false);
    removeListElement();
    actives.forEach(addTodo);
    sum.textContent = actives.length+ " items left";
  });

  allTodo.addEventListener("click", () => {
    const allDo = tasks.filter(task => task.completed === false || task.completed === true);
    removeListElement();
    allDo.forEach(addTodo);
    sum.textContent = tasks.length+ " items left";
  });

  function removeListElement (){
    while(ul.firstChild){
      ul.removeChild(ul.firstChild);
    };
  };

  image.addEventListener("click", () => {
      image.parentNode.remove();
      let index = tasks.indexOf(todo);
      tasks.splice(index, 1);
      sum.textContent = tasks.length + " items left";
      localStorage.setItem("tasks", JSON.stringify(tasks));
  });


};

  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    tasks.forEach(addTodo);
    sum.textContent = tasks.length + " items left";
  }

//dark mode style chang

darkMode.addEventListener("click", () => {
    element.classList.toggle("dark-body");
    container.classList.toggle("input-dark");
    clearDark.classList.toggle("Clear-dark");
    allActive.classList.toggle("all-active-dark");
    const liStyles = document.querySelectorAll("li");
    liStyles.forEach(li => li.classList.toggle("li-dark"));

    //sun and moon changer

    if(darkMode){
        const imageDark = document.getElementById("moon");
        imageDark.classList.toggle("moon-dark");
        
        const imageSun = document.getElementById("sun");
        imageSun.classList.toggle("sun-light");
        
    };
});

ul.addEventListener("dragover", (event) =>{
  event.preventDefault();
  localStorage.setItem("tasks", JSON.stringify(tasks));
});

ul.addEventListener("drop", (event) =>{
  event.preventDefault();
  if(dragedItem === null) {
    return;
  };
  const target = event.target.closest("li");
  if (!target) {
    ul.appendChild(dragedItem);
  } else {
    target.parentNode.insertBefore(dragedItem, target);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
});
