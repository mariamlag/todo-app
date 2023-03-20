const input = document.getElementById('input-todo');
const form = document.querySelector('form1');
const ul = document.querySelector('ul');
const clear = document.querySelector('#clear');


input.addEventListener("keypress", function(event) {
    
  if (event.key === "Enter") {
     event.preventDefault();

    //tu carieli ar aris mnishvneloba daabrunos 'trim' mushaobs amistvis, aseve ashorebs sicarieles tavidan da bolodan
     if (input.value.trim()){
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        const span = document.createElement('span');
        
        const li = document.createElement('li');
       
        //daematos lis x ghilaki
        li.classList.add('li-background');
        
        //checkbox daklikebit vcvlit da vusvamt xazs tu monishnulia, tu ar aris vashorebt
        checkbox.addEventListener('change', (event) => {
            const spanFromParen = event.target.parentNode.querySelector('span');

            if (event.target.checked) {
                spanFromParen.classList.add('line');
                
                
            } else {
                spanFromParen.classList.remove('line');
            }

        });

        span.textContent = input.value;


        li.appendChild(checkbox);
        li.appendChild(span);
        ul.appendChild(li);

        // when dark mode is on new li elements add new li class style
        const isDarkModeOn = document.body.classList.contains("dark-body");
        if (isDarkModeOn) {
          li.classList.add("li-dark");
        }

        //axali teqstis sheyvanis shemdeg gasuftavdes da dafokusdes
        input.value = ' ';
        input.focus();
     } 
  }

  clear.addEventListener("click", () => {
    // abrunebs im yvela elements romelic monishnulia checked
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');

    checkboxes.forEach((checkbox) => {
      const li = checkbox.parentNode;
      li.remove();
    });
  });

  



  ul.addEventListener('click', (event) => {
    if (event.target.classList.contains('li-background')) {
      event.target.remove();
    }
  });

 
});




//dark mode style change
const darkMode = document.getElementById('icons');

darkMode.addEventListener("click", () => {
    const element = document.body;
    element.classList.toggle("dark-body");

    const container = document.querySelector("input");
    container.classList.toggle("input-dark");


    const clearDark = document.getElementById("clearr");
    clearDark.classList.toggle("Clear-dark");

    const allActive = document.getElementById("all-active");
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








