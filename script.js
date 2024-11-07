let count = 0;

document
    .getElementById("button-clicker")
    .addEventListener("click", () => {
       count++;
       document.getElementById("counter").innerHTML = count;
})