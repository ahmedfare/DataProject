const button = document.querySelector(".icon-upload"); 
const container = document.getElementById("container");
const input = document.querySelector("input");
const undoBtn = document.getElementById("undoBtn");
//A7la ta7ya ya Boshmahandes 

let queue = [];
let stack = [];


container.addEventListener("click", (eo) => {


  if (eo.target.classList.contains("icon-trash")) {
    const taskElement = eo.target.closest(".task");

    stack.push(taskElement);   
    queue.shift();             

    taskElement.remove();
  }


  else if (eo.target.classList.contains("icon-angry2")) {
    eo.target.classList.add("dn");
    eo.target.parentElement.insertAdjacentHTML("beforeend",
      `<span class="icon-heart"></span>`
    );
  }


  else if (eo.target.classList.contains("icon-heart")) {
    eo.target.classList.add("dn");
    eo.target.parentElement.insertAdjacentHTML("beforeend",
      `<span class="icon-angry2 icon"></span>`
    );
  }

  
  else if (eo.target.classList.contains("icon-star") && !eo.target.classList.contains("orange")) {
    eo.target.classList.add("orange");
    container.prepend(eo.target.closest(".task"));
  }

  
  else if (eo.target.classList.contains("icon-star") && eo.target.classList.contains("orange")) {
    eo.target.classList.remove("orange");
    container.append(eo.target.closest(".task"));
  }

});


button.addEventListener("click", (eo) => {
  eo.preventDefault();

  if (input.value.trim() === "") return;

  const newTask = {
    text: input.value
  };

  queue.push(newTask); 

  const task = `
  <div class="task">
    <span class="icon-star icon"></span>
    <p lang="ar">${input.value}</p>
    <div>
      <span class="icon-trash icon"></span>
      <span class="icon-angry2 icon"></span>
    </div>
  </div>
  `;

  container.insertAdjacentHTML("beforeend", task);

  input.value = "";
});


undoBtn.addEventListener("click", () => {
  if (stack.length > 0) {
    const lastDeleted = stack.pop(); // LIFO
    container.append(lastDeleted);

    queue.push({ text: lastDeleted.innerText });
  }
});
