// 
let modal = document.getElementById("myModal");

// abre la ventana
let btn = document.getElementById("myBtn");

// cierra la ventana
let span = document.getElementsByClassName("close")[0];

// cuando hacemos click abre la ventana
btn.onclick = function() {
  modal.style.display = "block";
}

// cuando tocamos la X cierra la ventana
span.onclick = function() {
  modal.style.display = "none";
}

// mantiene la ventana cerrada 
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}