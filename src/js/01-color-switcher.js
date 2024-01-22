const start = document.querySelector("button[data-start]");
const stop = document.querySelector("button[data-stop]");

start.addEventListener('click', onClickStart);
stop.addEventListener('click', onClickStop);

let id = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }


function onClickStart() {
    id = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    },1000)

    start.disabled = true;
    stop.disabled = false;
}

function onClickStop() {
   clearInterval(id)
   start.disabled = false;
   stop.disabled = true;
}