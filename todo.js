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
          console.log(todo);
          console.log(tasks);
           addTodo(todo);
           sum.textContent = tasks.length+" items left";
        } 

  }
 
});

function addTodo(todo){
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  const span = document.createElement('span');
  var li = document.createElement('li');
  var image = document.createElement('img');
  image.src='./images/icon-cross.svg';
  // const image = document.createElement("image")
  console.log("mariam");
  //daematos lis x ghilaki
  image.classList.add('image-style');
  
  //checkbox daklikebit vcvlit da vusvamt xazs tu monishnulia, tu ar aris vashorebt
  checkbox.addEventListener('change', (event) => {
      const spanFromParen = event.target.parentNode.querySelector('span');
      if (event.target.checked) {
          spanFromParen.classList.add('line');  
      } else {
          spanFromParen.classList.remove('line');
      }
      todo.completed = !todo.completed; 

      console.log(tasks);
  });

  span.textContent = todo.todo;


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

  clear.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    // abrunebs im yvela elements romelic monishnulia checked
    checkboxes.forEach((checkbox) => {
      const li = checkbox.parentNode;
      li.remove();
    });
  });


//this is completed button, for to show completed todo list

  complet.addEventListener("click", () => {
    const completed = tasks.filter(task => task.completed === true);
    while(ul.firstChild){
      ul.removeChild(ul.firstChild);
    };
    completed.forEach(addTodo);
    console.log(completed);

    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(button => {
      button.addEventListener("change", () => {
        localStorage.setItem("radioButtonState", button.checked);
      });
    });
    const storedRadioButtonState = localStorage.getItem("radioButtonState");
    if (storedRadioButtonState === "true") {
      checkboxes.forEach(button => {
        button.checked = JSON.parse(storedRadioButtonState);
      });
    };

    sum.textContent = tasks.length-completed.length + " items left";
  });

  //active button, this show active todo list not completed
  active.addEventListener("click", () => {
    const actives = tasks.filter(task => task.completed === false);
    while(ul.firstChild){
      ul.removeChild(ul.firstChild);
    };
    actives.forEach(addTodo);
    sum.textContent = tasks.length-(tasks.length-actives.length)+ " items left";
    console.log(actives);
  });


  allTodo.addEventListener("click", () => {
    const allDo = tasks.filter(task => task.completed === false || task.completed === true);
    while(ul.firstChild){
      ul.removeChild(ul.firstChild);
    };
    allDo.forEach(addTodo);

    // const checkboxes = document.querySelectorAll("input[type='checkbox']");
    // checkboxes.forEach(button => {
    //   button.addEventListener("change", () => {
    //     localStorage.setItem("radioButtonState", button.checked);
    //   });
    // });
    // const storedRadioButtonState = localStorage.getItem("radioButtonState");
    // if (storedRadioButtonState === "true") {
    //   checkboxes.forEach(button => {
    //     button.checked = JSON.parse(storedRadioButtonState);
    //   });
    // }

    sum.textContent = tasks.length+ " items left";
  });


  image.addEventListener("click", () => {
      image.parentNode.remove();
  });
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

